import http from "http";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

console.log("process.cwd():", process.cwd()); // confirma de onde o processo está rodando

const server = http.createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT} (env=${process.env.NODE_ENV || "development"})`);
});

// Graceful shutdown
const shutdown = (signal: string) => {
  // eslint-disable-next-line no-console
  console.log(`Received ${signal}. Closing server...`);
  server.close((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error("Error while closing server:", err);
      process.exit(1);
    }
    // eslint-disable-next-line no-console
    console.log("Server closed. Exiting process.");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
