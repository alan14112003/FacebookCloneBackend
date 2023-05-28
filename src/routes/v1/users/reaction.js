import express from 'express'
import reactionController from '../../../app/Http/Controllers/Users/ReactionController'

// lấy ra bộ định tuyến
const router = express.Router()

router.route('/').get(reactionController.all)

export default router