const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const httpLogger = require('./config/morgan');
// const authRoutes = require('./routes/auth.routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(httpLogger);

// app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => {
  res.send('Welcome to Edgenius API 🚀');
});

module.exports = { app };
