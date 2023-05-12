import FriendStatusEnum from "../../../Enums/Friends/FriendStatusEnum";
import Friend from "../../../Models/Friend";
import User from "../../../Models/User";

const allFriend = async(req, res, next) => {
  const user = await User.findOne(req.user)
  const friends = await Friend.find({ user_from_id: "6432a1a07a8d4eb9e1dd637e"}).populate('user_to_id')

  return res.json({ status: true, body: friends, message: null})
}

const addFriend = async(req, res, next) => {
  const auth = req.user
  const userId = req.params.id
  
  const friendDb = await Friend.findOne({user_from_id: auth._id, user_to_id: userId})
  if (friendDb) {
    return res.json({ status: false, body: null, message: "Bạn đã kết bạn với người này rồi"})
  }

  const addFriend = new Friend({
    user_from_id: auth._id,
    user_to_id: userId,
    status: FriendStatusEnum.REQUEST
  })

  await addFriend.save()

  return res.json({ status: true, body: null, message: "Thành công"})
}

const acceptFriend = async(req, res, next) => {
  const auth = req.user
  const userId = req.params.id
  
  const friendDb = await Friend.findOne({user_from_id: userId, user_to_id: auth._id})
  if (!friendDb) {
    return res.json({ status: false, body: null, message: "Không có lời mời kết bạn nào từ người này"})
  }

  if (friendDb.status !== FriendStatusEnum.REQUEST) {
    return res.json({ status: false, body: null, message: "Không có lời mời kết bạn nào từ người này"})
  }

  friendDb.status = FriendStatusEnum.CONNECT

  const newFriendAccept = new Friend({
    user_from_id: auth.id,
    user_to_id: userId,
    status: FriendStatusEnum.CONNECT,
  })

  await friendDb.save()
  await newFriendAccept.save()
  
  return res.json({ status: true, body: null, message: "Thành công"})
}

export default {
  allFriend,
  addFriend,
  acceptFriend,
}