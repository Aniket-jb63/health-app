import app from "./app";
import { config } from "./config/index.config";
import{ connectDb } from "./config/db.config";

const HOST = "0.0.0.0";
const server = app.listen(config.port, HOST, () => {
  console.log(`server running on port ${config.port}`);
})

try {
  connectDb();
} catch (err) {
  console.error(err);
  process.exit(1);
}

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});