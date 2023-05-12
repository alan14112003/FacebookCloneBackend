import { createToken } from '../../../../config/JsonWebToken'
import User from '../../../Models/User'

const emailUsers = async (req, res, next) => {
  try {
    const users = await User.findWithDeleted()

    const body = []
    for (const user of users) {
      body.push(user.email)
    }

    res.status(200).json({ status: true, body: body, message: 'thành công' });
  } catch (error) {
    next(error)
  }
}

export default {
  emailUsers,
}