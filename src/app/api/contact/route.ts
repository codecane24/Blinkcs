import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, company, mobile, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Company: ${company}
Mobile: ${mobile}
Email: ${email}
Message: ${message}
      `,
    });

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error sending email." }, { status: 500 });
  }
}
