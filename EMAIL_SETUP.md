# Email Configuration for Contact Form

To enable the contact form email functionality, add the following environment variables to your `.env.local` file:

## Gmail Setup (Recommended)

```env
# Email Service (use "gmail" for Gmail or your email service provider)
EMAIL_SERVICE=gmail

# Gmail email address (your Gmail email)
EMAIL_USER=your-email@gmail.com

# Gmail App Password (not your regular password)
# 1. Go to myaccount.google.com/apppasswords
# 2. Select Mail and Windows Computer
# 3. Copy the 16-character app password
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx

# Optional: Send confirmation email to users
SEND_CONFIRMATION_EMAIL=true
```

## Other Email Services

For services like SendGrid, Mailgun, or Resend, you can modify the API route accordingly:

- **SendGrid**: Use `service: "SendGrid"` with `auth: { user: 'apikey', pass: YOUR_SENDGRID_KEY }`
- **Resend**: Replace the transporter with Resend's API
- **Custom SMTP**: Provide `host`, `port`, `secure`, and `auth` details

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords for Gmail, not your actual password
- Keep credentials secure and rotate them regularly
- Consider rate limiting for production deployments

## Testing the Form

Once configured:
1. Navigate to the "Get in Touch" section on your portfolio homepage
2. Fill in the form and submit
3. Check your email for the submission
