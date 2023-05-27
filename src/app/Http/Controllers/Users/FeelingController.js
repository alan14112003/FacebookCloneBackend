import Feeling from "../../../Models/Feeling"

const all = async (req, res, next) => {
  try {
    const feelings = await Feeling.find();

    return res.status(200).json({ status: true, body: feelings, message: 'thành công' });
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const feeling = new Feeling(req.body)

    await feeling.save()
    return res.status(201).json({ status: true, body: feeling, message: 'thành công' });
  } catch (error) {
    next(error)
  }
}

export default {
  all,
  create,
}