export const extractError = (errData) => {
  if (errData.response) {
    return errData.response.data.message;
  } else {
    return errData.message
  }
};