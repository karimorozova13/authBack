const bcrypt = require("bcryptjs");
const { basedir } = global;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});
const { User, schemas } = require(`${basedir}/models/user`);

const loginSendOTP = async (req, res, next) => {
  const { error } = schemas.login.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: `${email} doesn't exist` });
  }
  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!comparedPassword) {
    return res.status(401).json({ message: `Password isn't correct` });
  }

  try {
    await client.verify.v2.services(verifySid).verifications.create({
      to: user.phone,
      channel: "sms",
    });

    return res.json({ phone: user.phone });
  } catch (error) {
    res
      .status(error?.status || 404)
      .send(error?.message || "Something went wrong(");
  }
};

module.exports = loginSendOTP;
