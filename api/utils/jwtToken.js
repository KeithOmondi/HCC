// create token and saving that in cookies
const sendToken = (client, statusCode, res) => {
  const token = client.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    client,
    token,
  });
};

module.exports = sendToken;
