// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST, // e.g. smtp.gmail.com
//   port: Number(process.env.SMTP_PORT),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// transporter.verify((err) => {
//     if (err) {
//       console.error("❌ SMTP ERROR:", err);
//     } else {
//       console.log("✅ SMTP READY");
//     }
//   });

// export const sendEmail = async ({ to, subject, html }) => {
//   await transporter.sendMail({
//     from: `"SkyRight" <${process.env.SMTP_USER}>`,
//     to,
//     subject,
//     html,
//   });
// };


import nodemailer from "nodemailer";

console.log("SMTP ENV CHECK:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
});

const transporter = nodemailer.createTransport({
  service: "gmail",              // 🔥 FORCE GMAIL (no host fallback)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true,          // ✅ VERY IMPORTANT
  maxConnections: 1,   // ✅ avoid 421 error
  maxMessages: 5,
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error("❌ SMTP ERROR:", err);
  } else {
    console.log("✅ SMTP READY");
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"SkyRight" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};

