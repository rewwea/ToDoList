module.exports.errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Неизвестная ошибка";
  res.status(statusCode).json({ error: message });
};
