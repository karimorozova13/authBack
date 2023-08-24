const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});
const { User, schemas } = require(`${basedir}/models/user`);

const sendOTP = async (req, res, next) => {
  const { error } = schemas.register.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  const { phone, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ message: `${email} is already exist` });
  }
  try {
    const otpRes = await client.verify.v2
      .services(verifySid)
      .verifications.create({
        to: phone,
        channel: "sms",
      });

    return res
      .status(200)
      .send(`OTP send successfully!: ${JSON.stringify(otpRes)}`);
  } catch (error) {
    res
      .status(error?.status || 404)
      .send(error?.message || "Something went wrong(");
  }
};

module.exports = sendOTP;
