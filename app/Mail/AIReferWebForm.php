<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AIReferWebForm extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The customer's first name.
     */
    public $fname;

    /**
     * Create a new message instance.
     */
    public function __construct($fname = '')
    {
        $this->fname = $fname;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Curtis International Ltd. Web Form Link', // Update subject if needed
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            // Use 'view:' instead of 'markdown:' for raw HTML, and remove '.blade'
            view: 'emails.ai_refer_webform',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
