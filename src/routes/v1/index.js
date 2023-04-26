import express from 'express'
import authRoute from './auth'
import usersRoute from './users/index'
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

router.use('/', usersRoute)
// router.use(cors(corsOptions))
router.use('/auth', authRoute)

export default router
