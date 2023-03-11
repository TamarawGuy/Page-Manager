const getLogin = (req, res) => {
  if (req.cookies.password) {
    return res.redirect("admin");
  }
  res.render("login");
};

const postLogin = (req, res) => {
  const { pass } = req.body;
  if (pass === process.env.PASSWORD) {
    res.cookie("password", pass);
    return res.redirect("admin");
  } else {
    return res.status(400).json({ error: "Invalid password" });
  }
};

module.exports = {
  getLogin,
  postLogin,
};
