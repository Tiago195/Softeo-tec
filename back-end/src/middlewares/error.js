module.exports = (err, req, res, next) => {
  if (err.httpStatus) return res.status(err.httpStatus).json({ message: err.message });

  res.status(500).json(err.message);
};