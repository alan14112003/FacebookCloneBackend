import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require,
    },
    post_id: {
      type: 'ObjectId',
      ref: 'Post',
    },
    user_id: {
      type: 'ObjectId',
      ref: 'User',
    },
    re_comment_id: {
      type: 'ObjectId',
      ref: 'Comment',
      default: null,
    },
    reactions: [
      {
        type: 'ObjectId',
        ref: 'CommentReaction',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

export default mongoose.model('Comment', commentSchema)
