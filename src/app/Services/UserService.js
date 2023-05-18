import dotenv from 'dotenv'
import { hashPass } from '../../config/Bcrypt'
import UserStatusEnum from '../Enums/Users/UserStatusEnum'
import User from '../Models/User'
import sendMail from '../../config/SendMail'
import RedirectUrlEnum from '../Enums/RedirectUrl/RedirectUrlEnum'

dotenv.config()

const checkUserExist = (user) => {
  if (!user) {
    return {
      status: false,
      body: null,
      message: 'Không tồn tại người dùng với thông tin đã cho',
    }
  }
  return {
    status: true,
    body: null,
    message: null,
  }
}

const checkUserNotExist = (user, message = 'người dùng đã tồn tại') => {
  if (user) {
    return {
      status: false,
      body: null,
      message: message,
    }
  }
  return {
    status: true,
    body: null,
    message: null,
  }
}

const checkUserNotDeleted = (user) => {
  if (user.deleted) {
    return {
      status: false,
      body: null,
      message: 'Người dùng đã bị khóa',
    }
  }
  return {
    status: true,
    body: null,
    message: null,
  }
}

const checkUserConfirm = (user) => {
  if (user.status === UserStatusEnum.UNCONFIRMED) {
    return {
      status: false,
      body: null,
      message: 'Người dùng chưa xác nhận email',
    }
  }
  return {
    status: true,
    body: null,
    message: null,
  }
}

const checkUserUnConfirm = (user) => {
  if (user.status === UserStatusEnum.CONFIRMED) {
    return {
      status: false,
      body: null,
      message: 'Người dùng đã xác nhận email',
    }
  }
  return {
    status: true,
    body: null,
    message: null,
  }
}

const createUser = async (userField = {}) => {
  try {
    const [userDb] = await User.findWithDeleted({ email: userField.email })
    if (checkUserNotExist(userDb).status) {
      userField.password = hashPass(userField.password)

      const user = new User(userField)
      await user.save()

      return {
        status: true,
        body: user,
        message: null,
      }
    }

    if (!checkUserNotDeleted(userDb).status) {
      return checkUserNotDeleted(userDb)
    }

    return checkUserNotExist(userDb, 'Email đã tồn tại')
  } catch (error) {
    throw new Error(error)
  }
}

const findUser = async (userField = {}) => {
  try {
    const [user] = await User.findWithDeleted(userField)

    if (!checkUserExist(user).status) {
      return checkUserExist(user)
    }

    if (!checkUserNotDeleted(user).status) {
      return checkUserNotDeleted(user)
    }

    if (!checkUserConfirm(user).status) {
      return checkUserConfirm(user)
    }

    return {
      status: true,
      body: user,
      message: null,
    }
  } catch (error) {
    throw new Error(error)
  }
}

const sendMailActive = (email, token) => {
  const html = `
      <div class="container" style="background-color: #fff;
            border-radius: 5px;
            padding: 20px;
            margin: 50px auto;
            max-width: 500px;
            text-align: center;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);">
        <h1 style="
                color: #333;
                margin-top: 0;">Kích hoạt tài khoản của bạn</h1>
        <p>Vui lòng bấm vào nút bên dưới để kích hoạt tài khoản của mình:</p>

        <style>
          a:hover {
            background-color: #166fe5;
          }
        </style>
        <a style="background-color: #1877f2;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none"
          href="${RedirectUrlEnum.VERYFY_EMAIL}?token=${token}"
        >
          Kích hoạt tài khoản
        </a>
      </div>
    `
  sendMail(email, 'Kích hoạt tài khoản', html)
}

const sendMailChangePassword = (email, token) => {
  const html = `
      <div class="container" style="background-color: #fff;
            border-radius: 5px;
            padding: 20px;
            margin: 50px auto;
            max-width: 500px;
            text-align: center;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);">
        <h1 style="
                color: #333;
                margin-top: 0;">Lấy lại mật khẩu</h1>
        <p>Vui lòng bấm vào nút bên dưới để lấy lại mật khẩu của mình:</p>

        <style>
          a:hover {
            background-color: #166fe5;
          }
        </style>
        <a style="background-color: #1877f2;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none"
          href="${RedirectUrlEnum.CHANGE_PASSWORD}?token=${token}"
        >
          Lấy lại mật khẩu
        </a>
      </div>
    `
  sendMail(email, 'Lấy lại mật khẩu', html)
}

const sendMailDelete = (email, token) => {
  const html = `
      <div class="container" style="background-color: #fff;
            border-radius: 5px;
            padding: 20px;
            margin: 50px auto;
            max-width: 500px;
            text-align: center;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);">
        <h1 style="
                color: #333;
                margin-top: 0;">Xóa tài khoản của bạn</h1>
        <p>Vui lòng bấm vào nút bên dưới để xóa tài khoản của mình:</p>

        <style>
          a:hover {
            background-color: #166fe5;
          }
        </style>
        <a style="background-color: #0ff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none"
          href="${process.env.URL}/v1/auth/delete-account?token=${token}"
        >
          Xóa tài khoản
        </a>
      </div>
    `
  sendMail(email, 'Xóa tài khoản', html)
}

export default {
  checkUserExist,
  checkUserNotDeleted,
  checkUserUnConfirm,
  createUser,
  findUser,
  sendMailActive,
  sendMailDelete,
  sendMailChangePassword,
}
