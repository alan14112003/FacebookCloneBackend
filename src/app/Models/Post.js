import mongoose from 'mongoose'

import SoftDelete from '../../config/SoftDelete'
import PostStatusEnum from '../Enums/Posts/PostStatusEnum'

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require,
    },
    user_id: {
      type: 'ObjectId',
      ref: 'User',
    },
    feeling_id: {
      type: 'ObjectId',
      ref: 'Feeling',
      default: null,
    },
    videos: [
      {
        type: 'ObjectId',
        ref: 'PostVideo',
      },
    ],
    images: [
      {
        type: 'ObjectId',
        ref: 'PostImage',
      },
    ],
    reactions: [
      {
        type: 'ObjectId',
        ref: 'PostReaction',
      },
    ],
    comments: [
      {
        type: 'ObjectId',
        ref: 'Comment',
      },
    ],
    status: {
      type: Number,
      enum: Object.keys(PostStatusEnum.allName()).map((k) => Number(k)),
      default: PostStatusEnum.PUBLIC,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

postSchema.plugin(SoftDelete, {
  overrideMethods: 'all',
  deleted_by: true,
  deleted_at: true,
})

export default mongoose.model('Post', postSchema)
