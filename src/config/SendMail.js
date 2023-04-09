import nodeMailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const { SEND_MAIL_USER, SEND_MAIL_PASS } = process.env

const sendMail = (mailTo, subject, html) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: SEND_MAIL_USER,
      pass: SEND_MAIL_PASS,
    },
  })

  transporter.sendMail({
    from: 'FaceBook Alan <facebookalan@gmail.com>',
    to: mailTo,
    subject: subject,
    html: html,
  })
}

export default sendMail
