import mongoose from 'mongoose'

const feelingSchema = new mongoose.Schema({
  name: {
    type: String,
    require,
  },
  src: String,
})

export default mongoose.model('Feeling', feelingSchema)
