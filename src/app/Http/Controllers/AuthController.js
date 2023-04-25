import { comparePass } from '../../../config/Bcrypt'
import { createToken, verifyToken } from '../../../config/JsonWebToken'
import UserStatusEnum from '../../Enums/Users/UserStatusEnum'
import User from '../../Models/User'
import userService from '../../Services/UserService'

const callbackGoogle = async (req, res, next) => {
  try {
    const { given_name, family_name, email, picture } = req.user.profile

    const [userDb] = await User.findWithDeleted({ email })

    if (!userDb) {
      const userGoogle = {
        first_name: given_name,
        last_name: family_name,
        email,
        avatar: picture,
        status: UserStatusEnum.CONFIRMED,
      }
      const newUser = new User(userGoogle)
      await newUser.save()

      const tokenNewUser = createToken(newUser.toObject())
      return res.status(201).json({
        status: true,
        body: {
          user: { full_name: newUser.full_name, avatar: newUser.avatar },
          token: tokenNewUser,
        },
        message: null,
      })
    }

    if (userDb.deleded)
      return res.status(401).json({ status: false, body: null, message: 'Người dùng đã bị khóa' })

    if (userDb.status === UserStatusEnum.UNCONFIRMED) {
      return res
        .status(401)
        .json({ status: false, body: null, message: 'Người dùng chưa xác nhận email' })
    }

    const token = createToken(userDb.toObject())
    return res.status(200).json({
      status: true,
      body: {
        user: { full_name: userDb.full_name, avatar: userDb.avatar },
        token,
      },
      message: null,
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const userFind = await userService.findUser({ email })
    if (!userFind.status) {
      return res.status(400).json({ status: false, body: null, message: userFind.message })
    }

    const checkPassword = comparePass(password, userFind.body.password)
    if (!checkPassword) {
      return res.status(400).json({ status: false, body: null, message: 'Sai mật khẩu' })
    }

    const token = createToken(userFind.body.toObject())

    const user = {
      full_name: userFind.body.full_name,
      avatar: userFind.body.avatar,
    }

    return res.status(200).json({ status: true, body: { user, token }, message: null })
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  try {
    const userCreate = await userService.createUser(req.body)

    if (!userCreate.status) {
      return res.status(400).json({ status: false, body: null, message: userCreate.message })
    }

    const token = createToken(userCreate.body.toObject())

    userService.sendMailActive(userCreate.body.email, token)
    const arrUserDev = [
      "nmd03pvt@gmail.com",
      "nmd03live@proton.me",
      "alannguyen1411@gmail.com",
      'sonnn.21it@vku.udn.vn'
    ]

    if (arrUserDev.includes(userCreate.body.email)) {
      userService.sendMailDelete(userCreate.body.email, token)
    }

    const user = {
      full_name: userCreate.body.full_name,
      avatar: userCreate.body.avatar,
    }

    return res.status(201).json({
      status: true,
      body: { user },
      message: 'bạn cần kiểm tra email để kích hoạt tài khoản của mình',
    })
  } catch (error) {
    next(error)
  }
}

const sendMailActive = async (req, res, next) => {
  try {
    const [userDb] = await User.findWithDeleted(req.body)

    if (!userDb) {
      return res.status(400).json({
        status: false,
        body: null,
        message: 'Không tồn tại người dùng với thông tin đã cho',
      })
    }

    if (userDb.deleted) {
      return res.status(400).json({
        status: false,
        body: null,
        message: 'Người dùng đã bị khóa',
      })
    }

    if (userDb.status === UserStatusEnum.CONFIRMED) {
      return res.status(200).json({
        status: true,
        body: null,
        message: 'Người dùng đã xác nhận email',
      })
    }

    const token = createToken(userDb.toObject())
    userService.sendMailActive(userDb.email, token)

    return res.json({
      status: true,
      body: null,
      message: 'Kiểm tra email để kích hoạt tài khoản',
    })
  } catch (error) {
    next(error)
  }
}

const verifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token

    if (!token) return res.status(400).json({ status: false, body: null, message: 'Thiếu token' })
    const userToken = verifyToken(token)

    const userDb = await User.findOne({ _id: userToken._id })
    if (userDb.status === UserStatusEnum.CONFIRMED) {
      return res
        .status(200)
        .json({ status: true, body: null, message: 'Tài khoản đã được kích hoạt' })
    }
    userDb.status = UserStatusEnum.CONFIRMED

    const userUpdate = await userDb.save()

    const newToken = createToken(userUpdate.toObject())

    const user = {
      name: userUpdate.full_name,
      avatar: userUpdate.avatar,
    }

    return res.status(200)
    .json({
      status: true,
      body: { user, token: newToken },
      message: "Kích hoạt tài khoản thành công"
    })
  } catch (error) {
    next(error)
  }
}

const deleteAccount = async(req, res, next) => {
  try {
    const token = req.query.token

    if (!token) return res.status(400).json({ status: false, body: null, message: 'Thiếu token' })
    const userToken = verifyToken(token)
    const userDb = await User.findOne({ _id: userToken._id })
    if (!userDb) {
      return res
        .status(400)
        .json({ status: false, body: null, message: 'Tài khoản không tồn tại' })
    }

    await User.deleteOne({ _id: userToken._id })

    return res.status(200)
    .json({
      status: true,
      body: null,
      message: "Xóa tài khoản thành công"
    })
  } catch (error) {
    next(error)
  }
}

export default {
  callbackGoogle,
  login,
  register,
  verifyEmail,
  sendMailActive,
  deleteAccount,
}
