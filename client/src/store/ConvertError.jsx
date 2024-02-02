const ConvertError = (func) => {
  return Promise.resolve(func()).catch((err) => {
    throw new Error(err.response.data.message || "An error occurred");
  });
};

export default ConvertError;
