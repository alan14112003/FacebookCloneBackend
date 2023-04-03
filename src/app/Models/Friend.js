import mongoose from 'mongoose'
import FriendStatusEnum from '../Enums/Friends/FriendStatusEnum'

const friendSchema = new mongoose.Schema({
  user_from_id: {
    type: 'ObjectId',
    ref: 'User',
  },
  user_to_id: {
    type: 'ObjectId',
    ref: 'User',
  },
  status: {
    type: Number,
    enum: Object.keys(FriendStatusEnum.allName()).map((k) => Number(k)),
    default: FriendStatusEnum.REQUEST,
  },
})

export default mongoose.model('Friend', friendSchema)
