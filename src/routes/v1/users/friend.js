import express from 'express'
import friendController from '../../../app/Http/Controllers/Users/FriendController'
import { validateParam } from '../../../app/Http/Middleware/ValidateRouteMiddleware'
import idSchema from '../../../app/Http/Validators/param/IdValidator'

// lấy ra bộ định tuyến
const router = express.Router()

router.route('/').get(friendController.allFriend)
router.route('/add_friend/:id').post(validateParam(idSchema, 'id'), friendController.addFriend)
router.route('/accept_friend/:id').post(validateParam(idSchema, 'id'), friendController.acceptFriend)

export default router