const all = async (req, res, next) => {
  try {
    
    return res.status(200).json({ status: true, body: body, message: 'thành công' });
  } catch (error) {
    next(error)
  }
}

export default {
  all
}