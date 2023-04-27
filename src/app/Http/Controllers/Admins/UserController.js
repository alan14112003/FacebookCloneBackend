import User from '../../../Models/User'

const index = async (req, res, next) => {
  try {
    const users = await User.find()

    res.status(200).json({ status: true, body: users, message: 'thành công' });
  } catch (error) {
    next(error)
  }
}

export default {
  index
}