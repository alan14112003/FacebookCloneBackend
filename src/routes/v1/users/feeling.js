import express from 'express'
import feelingController from '../../../app/Http/Controllers/Users/FeelingController'

// lấy ra bộ định tuyến
const router = express.Router()

router.route('/').get(feelingController.all).post(feelingController.create)

export default router
