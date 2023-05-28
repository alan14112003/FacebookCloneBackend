import Reaction from '../../../Models/Reaction'

const all = async (req, res, next) => {
  try {
    const reactions = await Reaction.find().exec()
    
    return res.status(200).json({ status: true, body: reactions, message: 'thành công' });
  } catch (error) {
    next(error)
  }
}

export default {
  all
}