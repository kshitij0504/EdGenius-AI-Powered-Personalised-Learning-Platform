const { app } = require('./server');
const { logger } = require('./config/logger');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚀 Edgenius backend running at http://localhost:${PORT}`);
});
