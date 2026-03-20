import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type RSVPRequest = {
  firstName?: string
  lastName?: string
  email?: string
  attendance?: "yes" | "no"
  guests?: string | null
  meal?: string | null
  dietary?: string
  message?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RSVPRequest

    const firstName = body.firstName?.trim() ?? ""
    const lastName = body.lastName?.trim() ?? ""
    const email = body.email?.trim() ?? ""
    const attendance = body.attendance
    const guests = body.guests?.trim() ?? ""
    const meal = body.meal?.trim() ?? ""
    const dietary = body.dietary?.trim() ?? ""
    const message = body.message?.trim() ?? ""

    if (!firstName || !lastName || !email || !attendance) {
      return NextResponse.json({ error: "Missing required RSVP fields." }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }

    if (attendance === "yes" && (!guests || !meal)) {
      return NextResponse.json({ error: "Please provide guest count and meal preference." }, { status: 400 })
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT ?? "587")
    const smtpSecure = process.env.SMTP_SECURE === "true"
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpFrom = process.env.SMTP_FROM ?? smtpUser
    const rsvpToEmail = process.env.RSVP_TO_EMAIL ?? "zamiadrielwedding@gmail.com"

    const missingEnv = [
      ["SMTP_HOST", smtpHost],
      ["SMTP_USER", smtpUser],
      ["SMTP_PASS", smtpPass],
      ["SMTP_FROM", smtpFrom],
    ].filter(([, value]) => !value).map(([key]) => key)

    if (missingEnv.length > 0) {
      return NextResponse.json(
        {
          error: `Email service is not configured. Missing: ${missingEnv.join(", ")}. Update .env.local and restart the server.`,
        },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const fullName = `${firstName} ${lastName}`
    const attendanceText = attendance === "yes" ? "Joyfully Accepts" : "Regretfully Declines"

    const lines = [
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Attendance: ${attendanceText}`,
      attendance === "yes" ? `Guests: ${guests}` : null,
      attendance === "yes" ? `Meal: ${meal}` : null,
      attendance === "yes" ? `Dietary: ${dietary || "None"}` : null,
      `Message: ${message || "None"}`,
    ].filter(Boolean)

    await transporter.sendMail({
      from: smtpFrom,
      to: rsvpToEmail,
      replyTo: email,
      subject: `New RSVP: ${fullName} (${attendanceText})`,
      text: lines.join("\n"),
      html: `
        <h2>New RSVP Received</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Attendance:</strong> ${attendanceText}</p>
        ${attendance === "yes" ? `<p><strong>Guests:</strong> ${guests}</p>` : ""}
        ${attendance === "yes" ? `<p><strong>Meal:</strong> ${meal}</p>` : ""}
        ${attendance === "yes" ? `<p><strong>Dietary:</strong> ${dietary || "None"}</p>` : ""}
        <p><strong>Message:</strong> ${message || "None"}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("RSVP email send failed:", error)
    return NextResponse.json({ error: "Failed to send RSVP email. Please try again." }, { status: 500 })
  }
}
