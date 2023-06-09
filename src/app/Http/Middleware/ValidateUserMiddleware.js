import { verifyToken } from '../../../config/JsonWebToken'
import UserService from '../../Services/UserService'

const validateUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).json({status: false, body: null, message: 'Un Authorization'})

    const [scheme, token] = req.headers.authorization.split(' ')

    if (scheme !== 'Bearer') return res.status(401).json({status: false, body: null, message: 'Un Authorization'})
    if (!token) return res.status(401).json({status: false, body: null, message: 'Un Authorization'})

    const userVerified = verifyToken(token)
    const userFind = await UserService.findUser({ _id: userVerified._id })

    if (!userFind.status) {
      return res.status(401).json(userFind)
    }

    req.user = userFind.body
    next()
  } catch (error) {
    if (error.message == 'jwt expired') {
      return res.status(401).json({status: false, body: null, message: 'Token đã hết hạn'})
    }
    next(error)
  }
}

export { validateUser }
