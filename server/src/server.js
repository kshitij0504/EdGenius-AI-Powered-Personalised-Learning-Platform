const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const httpLogger = require('./config/morgan');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require("cookie-parser");


dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "https://edgenius-frontend.com", credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(httpLogger);
app.use(cookieParser());
app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => {
  res.send('Welcome to Edgenius API 🚀');
});

module.exports = { app };
