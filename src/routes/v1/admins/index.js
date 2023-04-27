import express from 'express'
import userRoutes from './user'

// lấy ra bộ định tuyến
const router = express.Router()

router.use('/users', userRoutes)

export default router