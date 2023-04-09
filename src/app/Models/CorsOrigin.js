import mongoose from 'mongoose'

const corsOriginSchema = new mongoose.Schema({
  domain: String,
})

export default mongoose.model('CorsOrigin', corsOriginSchema)
