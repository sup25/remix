interface props {
  userEmail: string;
  userName: string;
}

export const emailTemplate = ({ userEmail, userName }: props) => {
  return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4F46E5;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            background-color: #ffffff;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666666;
            background-color: #f9fafb;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4F46E5;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
        }
        .order-details {
            background-color: #f9fafb;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Confirmation</h1>
        </div>
        
        <div class="content">
            <h2>Thank you for your order!</h2>
            <p>Hi ${userName},</p>
            <p>We're excited to confirm that your order has been received and is being processed.</p>

            <p>If you have any questions about your order, please don't hesitate to contact our customer service team.</p>
            
            <p>Best regards,<br>Remix Store</p>
        </div>
        
        <div class="footer">
            <p>This email was sent to ${userEmail}</p>
            <p>© 2025 Remix Store. All rights reserved.</p>         
        </div>
    </div>
</body>
</html>
    `;
};
