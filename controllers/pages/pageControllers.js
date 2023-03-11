const { pool } = require("../../db");

const getPage = (req, res) => {
  const slug = req.params.url_slug;
  pool.query(
    "SELECT * FROM pages WHERE url_slug = $1",
    [slug],
    (err, results) => {
      if (err) {
        res.status(404).json({ error: "Page not found", err });
      } else {
        res.render("page", { page: results.rows[0] });
      }
    }
  );
};

module.exports = {
  getPage,
};
