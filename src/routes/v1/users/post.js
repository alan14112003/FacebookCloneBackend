import express from 'express'
import postController from '../../../app/Http/Controllers/Users/PostController'

// lấy ra bộ định tuyến
const router = express.Router()

router.route('/').post(postController.create)
.get(postController.all)

export default router