"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var _process$env = process.env,
  SEND_MAIL_USER = _process$env.SEND_MAIL_USER,
  SEND_MAIL_PASS = _process$env.SEND_MAIL_PASS;
var sendMail = function sendMail(mailTo, subject, html) {
  var transporter = _nodemailer["default"].createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: SEND_MAIL_USER,
      pass: SEND_MAIL_PASS
    }
  });
  transporter.sendMail({
    from: 'FaceBook Alan <facebookalan@gmail.com>',
    to: mailTo,
    subject: subject,
    html: html
  });
};
var _default = sendMail;
exports["default"] = _default;