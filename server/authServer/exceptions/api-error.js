class ApiError extends Error {
  //eslint-disable-line
  status;
  //eslint-disable-line
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static BadRegistrationLink() {
    return new ApiError(404, 'Неккоректная ссылка');
  }
  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}

module.exports = ApiError;
