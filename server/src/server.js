const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const httpLogger = require("./config/morgan");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const courseRoutes = require("./routes/course.route");
const moduleRoutes = require("./routes/module.route")
const lessonRoutes = require("./routes/lesson.routes")
const paymentRoutes = require('./routes/enroll.route');
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(httpLogger);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/module", moduleRoutes)
app.use("/api/lesson", lessonRoutes)
app.use('/api/payment', paymentRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to Edgenius API 🚀");
});

module.exports = { app };
