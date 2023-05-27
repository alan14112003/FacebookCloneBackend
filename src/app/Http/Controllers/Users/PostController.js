import mongoose from 'mongoose'
import Post from '../../../Models/Post'
import PostImage from '../../../Models/PostImage'
import PostVideo from '../../../Models/PostVideo'

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
    await session.abortTransaction();
    next(error)
  } finally {
    // Kết thúc phiên giao dịch và giải phóng session
    await session.endSession()
  }
}

export default {
  create,
}
