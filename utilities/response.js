export const successAction = (data, message = "OK", type = "SUCCESS") => {
  return { status: 200, data, message, type };
};

export const failAction = (
  message = "Fail",
  statusCode = 400,
  type = "ERROR"
) => {
  return { status: statusCode, data: null, message, type };
};
