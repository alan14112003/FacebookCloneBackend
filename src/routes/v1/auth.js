import express from 'express'
import { validateBody } from '~/app/Http/Middleware/ValidateRouteMiddleware'
import { validateUser } from '../../app/Http/Middleware/ValidateUserMiddleware'
import registerValidator from '../../app/Http/Validators/body/RegisterValidator'
import sendMailActiveValidator from '../../app/Http/Validators/body/SendMailActiveValidator'
import loginValidator from '../../app/Http/Validators/body/LoginValidator'
import authController from '../../app/Http/Controllers/AuthController'

// import passport from 'passport'
import passport from '../../config/PassportStrategy'

// lấy ra bộ định tuyến
const router = express.Router(validateBody())

router.route('/token').get(validateUser, (req, res) => {
  res.send(req.user)
})

router
  .route('/send-mail-active')
  .post(validateBody(sendMailActiveValidator), authController.sendMailActive)

router.route('/callback/google').get(
  passport.authenticate('google', {
    session: false,
  }),
  authController.callbackGoogle
)

router.route('/login').post(validateBody(loginValidator), authController.login)

router.route('/register').post(validateBody(registerValidator), authController.register)

router
  .route('/redirect/google')
  .get(passport.authenticate('google', { scope: ['email', 'profile'] }))

router.route('/verify-email').get(authController.verifyEmail)

export default router
