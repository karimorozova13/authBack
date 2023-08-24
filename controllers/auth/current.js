const current = async (req, res) => {
  try {
    res.json({
      status: "success",
      code: 200,
      data: {
        phone: req.user.phone,
        email: req.user.email,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = current;
