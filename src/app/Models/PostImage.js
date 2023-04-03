import mongoose from 'mongoose'

const postImageSchema = new mongoose.Schema({
  src: {
    type: String,
    require,
  },
  post_id: {
    type: 'ObjectId',
    ref: 'Post',
  },
})

export default mongoose.model('PostImage', postImageSchema, 'post_images')
