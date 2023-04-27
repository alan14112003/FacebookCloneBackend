import express from 'express'
import authRouter from './auth'
import userRouter from './users'
import adminRouter from './admins'
import CorsOrigin from '../../app/Models/CorsOrigin'
import cors from 'cors'
import corsOptions from '../../config/Cors'
// lấy ra bộ định tuyến
const router = express.Router()

router.route('/cors').post(async (req, res) => {
  const cors = new CorsOrigin({ domain: req.body.domain })
  await cors.save()
  res.status(201).json('Create success')
})

router.use("/admin", adminRouter)
router.use('/', userRouter)
// router.use(cors(corsOptions))
router.use('/auth', authRouter)

export default router
