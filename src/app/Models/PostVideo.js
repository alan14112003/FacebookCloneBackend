import mongoose from 'mongoose'

const postVideoSchema = new mongoose.Schema({
  src: {
    type: String,
    require,
  },
  post_id: {
    type: 'ObjectId',
    ref: 'Post',
  },
})

export default mongoose.model('PostVideo', postVideoSchema, 'post_videos')
