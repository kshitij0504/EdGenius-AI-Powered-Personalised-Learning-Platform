const { app } = require('./server');
const { logger } = require('./config/logger');

const PORT = process.env.PORT || 6000;
console.log(PORT);

app.listen(PORT, () => {
  logger.info(`🚀 Edgenius backend running at http://localhost:${PORT}`);
});
