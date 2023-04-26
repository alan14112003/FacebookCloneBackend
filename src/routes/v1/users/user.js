import express from 'express'
import userController from '../../../app/Http/Controllers/Users/UserController'

// lấy ra bộ định tuyến
const router = express.Router()

router.route('/emails').get(userController.emailUsers)

export default router