const { Pool } = require("pg");
const dotenv = require("dotenv")

// dotenv
dotenv.config();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const dbConfig = {
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  port: Number(PGPORT),
  password: PGPASSWORD,
  ssl: true,
};

const pool = new Pool(dbConfig);
module.exports = pool;