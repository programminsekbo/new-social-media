import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import {
  DATABASE,
  MAX_JSON_SIZE,
  PORT,
  REQUEST_NUMBER,
  REQUEST_TIME,
  URL_ENCODE,
  WEB_CACHE,
} from "./app/config/config.js";
import router from "./routes/api.js";
import cookieParser from "cookie-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
let __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);

const app = express();

// App Use Default Middleware
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());
app.use(cookieParser());

// App Use Limiter
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
app.use(limiter);

// Cache
app.set("etag", WEB_CACHE);

// Database Connect
mongoose
  .connect(DATABASE, { autoIndex: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("MongoDB disconnected");
  });

app.use("/api", router);

app.use(express.static("client/dist"));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
