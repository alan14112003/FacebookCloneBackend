import { comparePass } from '../../../config/Bcrypt'
import { createToken, verifyToken } from '../../../config/JsonWebToken'
import UserStatusEnum from '../../Enums/Users/UserStatusEnum'
import User from '../../Models/User'
import userService from '../../Services/UserService'

const callbackGoogle = async (req, res, next) => {
  try {
    // định nghĩa url để chuyển hướng.
    const redirectResponseUrl = 'https://fbcloneharukinguyen.netlify.app/google-login'

    // lấy ra dữ liệu được trả về từ đăng nhập bằng google
    const { given_name, family_name, email, picture } = req.user.profile

    const [userDb] = await User.findWithDeleted({ email })

    // nếu chưa có user nào thì tạo user
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
      return res.redirect(
        `${redirectResponseUrl}?res=${Buffer.from(
          JSON.stringify({
            status: true,
            body: {
              user: { full_name: newUser.full_name, avatar: newUser.avatar },
              token: tokenNewUser,
            },
            message: 'Đăng ký thành công',
          })
        ).toString('base64')}`
      )
    }

    // Nếu người dùng bị khóa thì trả về lỗi
    if (userDb.deleded) {
      return res.redirect(
        `${redirectResponseUrl}?res=${Buffer.from(
          JSON.stringify({ status: false, body: null, message: 'Người dùng đã bị khóa' })
        ).toString('base64')}`
      )
    }

    // Nếu người dùng chưa xác nhận email thì xác nhận cho họ
    if (userDb.status === UserStatusEnum.UNCONFIRMED) {
      userDb.status = UserStatusEnum.CONFIRMED
      await userDb.save()

      const tokenUser = createToken(userDb.toObject())
      return res.redirect(
        `${redirectResponseUrl}?res=${Buffer.from(
          JSON.stringify({
            status: true,
            body: {
              user: { full_name: userDb.full_name, avatar: userDb.avatar },
              token: tokenUser,
            },
            message: 'Đã xác thực email',
          })
        ).toString('base64')}`
      )
    }

    const token = createToken(userDb.toObject())
    return res.redirect(
      `${redirectResponseUrl}?res=${Buffer.from(
        JSON.stringify({
          status: true,
          body: {
            user: { full_name: userDb.full_name, avatar: userDb.avatar },
            token,
          },
          message: 'Đăng nhập thành công',
        })
      ).toString('base64')}`
    )
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
      email: userFind.body.email,
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
      'nmd03pvt@gmail.com',
      'nmd03live@proton.me',
      'alannguyen1411@gmail.com',
      'sonnn.21it@vku.udn.vn',
    ]

    if (arrUserDev.includes(userCreate.body.email)) {
      userService.sendMailDelete(userCreate.body.email, token)
    }

    const user = {
      email: userCreate.body.email,
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

    const newToken = createToken(userDb.toObject())

    const user = {
      email: userDb.email,
      full_name: userDb.full_name,
      avatar: userDb.avatar,
    }

    if (userDb.status === UserStatusEnum.CONFIRMED) {
      return res.status(200).json({
        status: true,
        body: { user, token },
        message: 'Tài khoản đã được kích hoạt',
      })
    }

    userDb.status = UserStatusEnum.CONFIRMED

    await userDb.save()

    return res.status(200).json({
      status: true,
      body: { user, token: newToken },
      message: 'Kích hoạt tài khoản thành công',
    })
  } catch (error) {
    next(error)
  }
}

const deleteAccount = async (req, res, next) => {
  try {
    const token = req.query.token

    if (!token) return res.status(400).json({ status: false, body: null, message: 'Thiếu token' })
    const userToken = verifyToken(token)
    const userDb = await User.findOne({ _id: userToken._id })
    if (!userDb) {
      return res.status(400).json({ status: false, body: null, message: 'Tài khoản không tồn tại' })
    }

    await User.deleteOne({ _id: userToken._id })

    return res.status(200).json({
      status: true,
      body: null,
      message: 'Xóa tài khoản thành công',
    })
  } catch (error) {
    next(error)
  }
}

const sendMailChangePassword = async (req, res, next) => {
  try {
    const { email } = req.body

    const userFind = await userService.findUser({ email })
    if (!userFind.status) {
      return res.status(400).json({ status: false, body: null, message: userFind.message })
    }

    const token = createToken(userFind.body.toObject(), '1h')
    userService.sendMailChangePassword(email, token)

    return res.json({
      status: true,
      body: null,
      message: 'Kiểm tra email để lấy lại mật khẩu',
    })
  } catch (error) {
    next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    const user = req.user
    const { password } = req.body
    const userFind = await userService.findUser({ _id: user._id })
    if (!userFind.status) {
      return res.status(400).json({ status: false, body: null, message: userFind.message })
    }

    userFind.body.password = password
    await userFind.body.save()

    return res.json({
      status: true,
      body: null,
      message: 'Đổi mật khẩu thành công',
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
  sendMailChangePassword,
  changePassword,
}
