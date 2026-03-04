import nodemailer from "nodemailer";
import { DATA } from "@/data/resume";

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    // Validation
    if (!email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and message are required",
        }),
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid email address",
        }),
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: DATA.contact.email,
      subject: `New Contact Form Submission from ${email}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>This is an automated email from your portfolio website.</small></p>
      `,
    });

    // Optional: Send confirmation email to user
    if (process.env.SEND_CONFIRMATION_EMAIL === "true") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Message Received - I'll Get Back to You Soon",
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi there,</p>
          <p>I received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>${DATA.name}</p>
        `,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to send message. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
