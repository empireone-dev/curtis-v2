<!DOCTYPE html>
<html>

<head>
    <style>
        .wrapper {
            background-color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        .card {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: #2563eb;
            padding: 30px;
            text-align: center;
            color: white;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 40px;
            line-height: 1.6;
            color: #334155;
        }

        .claim-details {
            background-color: #f1f5f9;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #2563eb;
        }

        .claim-details ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        .claim-details li {
            margin-bottom: 8px;
        }

        .button-container {
            color: white;
            text-align: center;
            margin-top: 30px;
            margin-bottom: 10px;
        }

        .btn-primary {
            background-color: #2563eb;
            color: white;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            display: inline-block;
        }

        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #94a3b8;
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="card">
            <div class="header">
                <h1>Parts Request Received ⚙️</h1>
            </div>
            <div class="content">
                <p>Hi <strong>{{ $ticket->fname??'' }}</strong>,</p>
                <p>Thank you for reaching out to <strong>Curtis International Ltd.</strong> We have successfully received your Parts Request.</p>

                <p>Our support team is currently reviewing your submitted details and the documents you provided (Bill of Sale, Model/Serial Number, and Photo or video of the issue). We typically validate and respond to requests within<strong> 24–48 business hours</strong>.</p>

                <div class="claim-details">
                    <p style="margin-top: 0;"><strong>Your Request Summary:</strong></p>
                    <ul>
                        <li><strong>Case File:</strong> {{ $ticket->ticket_id??'' }}</li>
                        <li><strong>Model Number:</strong> {{ $ticket->item_number??'' }}</li>
                        <li><strong>Serial Number:</strong> {{ $ticket->serial_number??'' }}</li>
                        <li><strong>Date Submitted:</strong> {{ \Carbon\Carbon::parse($ticket->created_at??'')->format('M d, Y') }}</li>
                    </ul>
                </div>

                <p>If we require any additional information, or if we need clearer photos of the requested part, we will reply directly to this email. Otherwise, keep an eye on your inbox for updates regarding parts availability and shipment.</p>

                <div class="button-container">
                    <a href="{{ $ticket->url }}" class="btn-primary" style="color:white">Track Request Status</a>
                </div>
            </div>

            <div class="footer">
                Sent with ❤️ from Curtis International Ltd.<br>
            </div>
        </div>
    </div>
</body>

</html>