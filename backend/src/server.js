import dotenv from 'dotenv';
import app from './index.js';
import sequelize from './config/db.js';

dotenv.config();

const port = process.env.PORT || 3000;

async function start() {
  const skipDb = process.env.SKIP_DB === '1';
  try {
    if (!skipDb) {
      await sequelize.authenticate();
      console.log('Database connected');
    } else {
      console.log('SKIP_DB=1: starting server without DB connection');
    }
    app.listen(port, () => console.log(`Backend listening on :${port}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
