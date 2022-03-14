import { Pool } from "pg";

const { DB_HOST, DB_NAME, DB_USER,DB_TEST_NAME, DB_PASSWORD, ENV } = process.env;

let client: Pool | undefined;

if (ENV === "test") {
  client = new Pool({
    host: DB_HOST,
    database: DB_TEST_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  });
}

if (ENV === "dev") {
  client = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  });
}


export default client;