import mongoose from 'mongoose'

const postReactionSchema = new mongoose.Schema({
  post_id: {
    type: 'ObjectId',
    ref: 'Post',
  },
  reaction_id: {
    type: 'ObjectId',
    ref: 'Reaction',
  },
  user_id: {
    type: 'ObjectId',
    ref: 'User',
  },
})

export default mongoose.model('PostReaction', postReactionSchema, 'post_reaction')
