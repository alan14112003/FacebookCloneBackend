import mongoose from 'mongoose'

const reactionSchema = new mongoose.Schema({
  name: {
    type: String,
    require,
  },
  src: String,
})

export default mongoose.model('Reaction', reactionSchema)
