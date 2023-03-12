const Pool = require("pg").Pool;

require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

module.exports = {
  pool,
};
