import mongoose from 'mongoose'
import Post from '../../../Models/Post'
import PostImage from '../../../Models/PostImage'
import PostVideo from '../../../Models/PostVideo'
import Comment from '../../../Models/Comment'
import PostReaction from '../../../Models/PostReaction'
import PostStatusEnum from '../../../Enums/Posts/PostStatusEnum'
import Friend from '../../../Models/Friend'
import FriendStatusEnum from '../../../Enums/Friends/FriendStatusEnum'

const create = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { content, feeling_id, status, images, videos } = req.body

    const post = new Post({
      user_id: req.user._id,
      content,
      status,
    })

    if (feeling_id) post.feeling_id = feeling_id

    if (images && images.length > 0) {
      for (const imageSrc of images) {
        const image = new PostImage({
          src: imageSrc,
          post_id: post._id,
        })
        await image.save({ session: session })
        post.images.push(image._id)
      }
    }

    if (videos && videos.length > 0) {
      for (const videoSrc of videos) {
        const video = new PostVideo({
          src: videoSrc,
          post_id: post._id,
        })
        await video.save({ session: session })
        post.videos.push(video._id)
      }
    }

    await post.save({ session: session })

    // Nếu mọi thứ thành công, thực hiện commit
    await session.commitTransaction()

    return res.status(201).json({ status: true, body: post, message: 'thành công' })
  } catch (error) {
    // Xảy ra lỗi, thực hiện rollback
    await session.abortTransaction()
    next(error)
  } finally {
    // Kết thúc phiên giao dịch và giải phóng session
    await session.endSession()
  }
}

const all = async (req, res, next) => {
  try {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10

    const friends = await Friend.find({
      user_from_id: req.user._id,
      status: { $gt: FriendStatusEnum.FOLLOW },
    })
      .select('user_to_id')
      .exec()

    const friendIds = []
    for (const friend of friends) {
      friendIds.push(friend.user_to_id)
    }

    const posts = await Post.find({
      $or: [
        { status: PostStatusEnum.PUBLIC },
        {
          status: PostStatusEnum.FRIENDS,
          user_id: { $in: friendIds },
        },
        {
          user_id: req.user._id
        }
      ],
    })
      .populate('user_id', '_id first_name last_name avatar')
      .populate('feeling_id')
      .populate('videos')
      .populate('images')
      .populate('reactions')
      .populate('comments')
      .select('-deleted')
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec()

    const postCount = await Post.find({
      $or: [
        { status: PostStatusEnum.PUBLIC },
        {
          status: PostStatusEnum.FRIENDS,
          user_id: { $in: friendIds },
        },
      ],
    })
      .count()
      .exec()

    const data = []
    for (let post of posts) {
      post = post.toObject()

      if (!post.user_id) continue

      post.user = post.user_id
      delete post.user_id

      post.feeling = post.feeling_id
      delete post.feeling_id

      post.status_name = PostStatusEnum.getNameByValue(post.status)

      data.push(post)
    }

    const lastPage = Math.ceil(postCount / perPage)

    const result = {
      data,
      current_page: page,
      per_page: perPage,
      last_page: lastPage,
    }

    return res.status(200).json({ status: true, body: result, message: 'thành công' })
  } catch (error) {
    next(error)
  }
}

export default {
  create,
  all,
}
