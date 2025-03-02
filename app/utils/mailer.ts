export async function sendResetEmail(email: string, link: string) {
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: "your-email@gmail.com", pass: "your-password" },
  });

  await transporter.sendMail({
    from: "noreply@example.com",
    to: email,
    subject: "Reset Your Password",
    html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
  });
}
