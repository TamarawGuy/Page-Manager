const { pool } = require("../../db");

const getAllPages = (req, res) => {
  pool.query("SELECT * FROM pages", (err, results) => {
    if (err) {
      throw new Error("No pages found");
    }
    res.render("admin", { pages: results.rows });
  });
};

const createPage = (req, res) => {
  const { title, meta_desc, content, url_slug } = req.body;
  let emptyFields = [];

  if (!title) emptyFields.push("Title");
  if (!meta_desc) emptyFields.push("Meta Description");
  if (!content) emptyFields.push("Content");
  if (!url_slug) emptyFields.push("URL Slug");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  pool.query(
    "INSERT INTO pages(title, meta_desc, content, url_slug) VALUES($1,$2,$3,$4)",
    [title, meta_desc, content, url_slug],
    (err, results) => {
      if (err) {
        res.status(400).json({ error: "URL slug already in use" });
      } else {
        res.status(201).json({ title, meta_desc, content, url_slug });
      }
    }
  );
};

const deletePage = (req, res) => {
  const slug = req.params.url_slug;
  pool.query(
    "SELECT * FROM pages WHERE url_slug = $1",
    [slug],
    (err, results) => {
      if (!results.rows.length) {
        res.json({ msg: "Page not found" });
      } else {
        pool.query(
          "DELETE FROM pages WHERE url_slug = $1",
          [slug],
          (err, results) => {
            if (err) {
              throw err;
            }
            res.status(200).json({ msg: "Page removed" });
          }
        );
      }
    }
  );
};

module.exports = {
  getAllPages,
  createPage,
  deletePage,
};
