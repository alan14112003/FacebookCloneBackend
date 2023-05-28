import express from 'express'
import userRoutes from './user'
import friendRoutes from './friend'
import postRoutes from './post'
import feelingRoutes from './feeling'
import reactionRoutes from './reaction'
import { validateUser } from '../../../app/Http/Middleware/ValidateUserMiddleware'

// lấy ra bộ định tuyến
const router = express.Router()

// routes user
router.use('/users', userRoutes)

// routes friend
router.use('/friends', validateUser, friendRoutes)

// routes post
router.use('/posts', validateUser, postRoutes)

// routes feeling
router.use('/feelings', feelingRoutes)

// routes reaction
router.use('/reactions', reactionRoutes)

export default router