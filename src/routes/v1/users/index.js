import express from 'express'
import userRoutes from './user'
import friendRoutes from './friend'
import { validateUser } from '../../../app/Http/Middleware/ValidateUserMiddleware'

// lấy ra bộ định tuyến
const router = express.Router()

// routes user
router.use('/users', userRoutes)

// routes friend
router.use('/friends', validateUser, friendRoutes)

export default router