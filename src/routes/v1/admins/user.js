import express from 'express'
import userController from '../../../app/Http/Controllers/Admins/UserController'

// lấy ra bộ định tuyến
const router = express.Router()
router.route('/').get(userController.index)

export default router