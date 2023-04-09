import express from 'express'
import authRoute from './auth'
import CorsOrigin from '../../app/Models/CorsOrigin'
// lấy ra bộ định tuyến
const router = express.Router()

router.route('/cors').post(async (req, res) => {
  const cors = new CorsOrigin({ domain: req.body.domain })
  await cors.save()
  res.status(201).json('Create success')
})

router.use('/auth', authRoute)

export default router
