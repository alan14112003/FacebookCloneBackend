import mongoose from 'mongoose'

const CommentReactionSchema = new mongoose.Schema({
  comment_id: {
    type: 'ObjectId',
    ref: 'Comment',
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

export default mongoose.model('CommentReaction', CommentReactionSchema, 'comment_reaction')
