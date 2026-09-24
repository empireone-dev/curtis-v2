<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // Extract role_id safely from request parameters, fallback to 5
        $role_id = $request->query('role_id', $request->role_id ?? 5);

        $today = Carbon::today()->toDateString();
        $now = Carbon::now();
        $sub24Hours = $now->copy()->subHours(24);
        $sub48Hours = $now->copy()->subHours(48);

        // Reusable date filter for CasesLog and DirectEmailLog
        $applyDateFilter = function ($query) use ($request, $today) {
            if ($request->start && $request->end) {
                if ($request->start == $request->end) {
                    $query->whereDate('created_at', Carbon::parse($request->start)->toDateString());
                } else {
                    $query->whereBetween('created_at', [$request->start, $request->end]);
                }
            } else {
                $query->whereDate('created_at', $today);
            }
        };

        // Fetch Users and Eager Load all necessary data
        $users = User::whereIn('role_id', [1, 5])
            ->orderBy('agent_type', 'desc')
            ->with(['role'])
            ->when($role_id == 5, function ($query) use ($applyDateFilter) {
                $query->with([
                    'tickets' => function ($q) {
                        $q->whereNotNull('ticket_id')
                            ->where('cases_status', '<>', 'hidden')
                            ->where('is_reply', 'true')
                            ->where('ticket_id', '<>', '')
                            ->whereNotNull('email')
                            ->where('created_at', '>=', Carbon::parse('2025-06-01')->startOfDay());
                    },
                    'directEmails' => function ($q) {
                        $q->where('isHide', '<>', 'true')
                            ->whereIn('id', function ($subQuery) {
                                $subQuery->selectRaw('MAX(id)')
                                    ->from('direct_emails')
                                    ->groupBy('threadId');
                            });
                    },
                    'handledCasesLogs' => function ($q) use ($applyDateFilter) {
                        $q->with('ticket');
                        $applyDateFilter($q);
                    },
                    'handledDirectEmailsLogs' => function ($q) use ($applyDateFilter) {
                        $q->with('direct_email');
                        $applyDateFilter($q);
                    }
                ]);
            })
            ->get();

        if ($role_id == 5) {
            $users->each(function ($user) use ($sub24Hours, $sub48Hours) {

                // --- 1. TICKETS OBJECT ARRAYS ---
                $tickets = $user->tickets ?? collect();

                $user->web_form_list = $tickets->filter(function ($ticket) {
                    return $ticket->created_from === 'WEB FORM' &&
                        $ticket->created_at == $ticket->updated_at;
                })->values();

                $user->overdue_cases_list = $tickets->filter(function ($ticket) use ($sub48Hours) {
                    if (!$ticket->email_date) return false;
                    return Carbon::parse($ticket->email_date)->lte($sub48Hours);
                })->values();

                $user->cases_due_today_list = $tickets->filter(function ($ticket) use ($sub24Hours, $sub48Hours) {
                    if (!$ticket->email_date) return false;
                    $emailDate = Carbon::parse($ticket->email_date);
                    return $emailDate->lte($sub24Hours) && $emailDate->gt($sub48Hours);
                })->values();

                $user->upcoming_dues_list = $tickets->filter(function ($ticket) use ($sub24Hours) {
                    if (!$ticket->email_date) return false;
                    return Carbon::parse($ticket->email_date)->gt($sub24Hours);
                })->values();

                // --- 2. DIRECT EMAILS OBJECT ARRAYS ---
                $directEmails = $user->directEmails ?? collect();

                $user->overdue_direct_emails_list = $directEmails->filter(function ($email) use ($sub48Hours) {
                    if (!$email->email_date) return false;
                    return Carbon::parse($email->email_date)->lte($sub48Hours);
                })->values();

                $user->direct_emails_due_today_list = $directEmails->filter(function ($email) use ($sub24Hours, $sub48Hours) {
                    if (!$email->email_date) return false;
                    $emailDate = Carbon::parse($email->email_date);
                    return $emailDate->lte($sub24Hours) && $emailDate->gt($sub48Hours);
                })->values();

                $user->upcoming_dues_direct_emails_list = $directEmails->filter(function ($email) use ($sub24Hours) {
                    if (!$email->email_date) return false;
                    return Carbon::parse($email->email_date)->gt($sub24Hours);
                })->values();

                // --- 3. HANDLED LOGS OBJECT ARRAYS ---
                $handledCasesLogs = $user->handledCasesLogs ?? collect();

                $user->handled_cases_notes = $handledCasesLogs->filter(function ($log) {
                    return optional($log->ticket)->created_from === 'AGENT FORM';
                })->values();

                $user->handled_web_form_notes = $handledCasesLogs->filter(function ($log) {
                    return optional($log->ticket)->created_from === 'WEB FORM';
                })->values();

                $handledDirectEmailsLogs = $user->handledDirectEmailsLogs ?? collect();
                $user->handled_direct_emails_notes = $handledDirectEmailsLogs->values();

                // Clean up loaded relation keys from memory JSON payload
                $user->unsetRelation('tickets');
                $user->unsetRelation('directEmails');
                $user->unsetRelation('handledCasesLogs');
                $user->unsetRelation('handledDirectEmailsLogs');
            });
        }

        return response()->json($users, 200);
    }
}
