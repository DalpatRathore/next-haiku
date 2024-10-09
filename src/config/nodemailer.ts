import nodemailer from "nodemailer";

const AUTH_EMAIL = process.env.MAIL_AUTH_EMAIL;
const MAIL_EMAIL_AUTH_PASS = process.env.MAIL_EMAIL_AUTH_PASS;
const HOST = process.env.MAIL_HOST;

export const transporter = nodemailer.createTransport({
  host: HOST,
  port: 465,
  secure: true, // use TLS
  auth: {
    user: AUTH_EMAIL,
    pass: MAIL_EMAIL_AUTH_PASS,
  },
});





