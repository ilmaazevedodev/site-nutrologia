import { createConnection } from "mysql2";

export const db = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sistema",
  connectTimeout: 5000 // Timeout de 5 segundos
});
