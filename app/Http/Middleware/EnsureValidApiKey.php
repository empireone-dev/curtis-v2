<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\ApiKey;

class EnsureValidApiKey
{
    public function handle(Request $request, Closure $next): Response
    {
        $providedKey = $request->header('X-API-KEY');

        if (! $providedKey) {
            return response()->json(['message' => 'API Key is missing.'], 401);
        }

        // Check if the key exists in our database
        $isValid = ApiKey::where('key', $providedKey)->exists();

        if (! $isValid) {
            return response()->json(['message' => 'Unauthorized. Invalid API Key.'], 403);
        }

        return $next($request);
    }
}
