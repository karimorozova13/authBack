const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const verifyOTP = async (req, res, next) => {
  const { phone, code } = req.body;

  try {
    const otpRes = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phone, code: code });

    return res.status(200).send(JSON.stringify(otpRes.valid));
  } catch (error) {
    res
      .status(error?.status || 404)
      .send(error?.message || "Something went wrong(");
  }
};

module.exports = verifyOTP;
