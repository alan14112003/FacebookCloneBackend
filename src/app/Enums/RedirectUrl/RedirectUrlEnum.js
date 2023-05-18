import dotenv from 'dotenv'
dotenv.config()

class RedirectUrlEnum {
  static DOMAIN_REDIRECT = process.env.DOMAIN_REDIRECT
  static GOOGLE_LOGIN = `${this.DOMAIN_REDIRECT}/google-login`
  static VERYFY_EMAIL = `${this.DOMAIN_REDIRECT}/verify-email`
  static CHANGE_PASSWORD = `${this.DOMAIN_REDIRECT}/change-password`
}

export default RedirectUrlEnum