const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expiresIn: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  res.cookie("token", token, options).status(statusCode).json({
    success: true,
    token,
    user,
  });
};

export default sendToken;
