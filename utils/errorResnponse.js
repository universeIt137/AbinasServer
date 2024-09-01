function errorResponse(statusCode, status, message) {
  let respObj = {
    statusCode: statusCode,
    status: status,
    message: message,
  };
  return respObj;
}
module.exports = errorResponse;
