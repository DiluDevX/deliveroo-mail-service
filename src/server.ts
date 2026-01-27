import express from 'express';
import cors from 'cors';
import { config } from './config';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/error-handler.middleware';
import { requestLogger } from './middleware/request-logger.middleware';
import { setupSwagger } from './swagger';
import healthRoutes from './routes/health.routes';
import mailRoutes from './routes/mail.routes';

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// Routes
app.use('/api', healthRoutes);
app.use('/api/mail', mailRoutes);

// API Documentation
setupSwagger(app);

// Error handling (must be last)
app.use(errorHandler);

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
  logger.info(`API Docs available at http://localhost:${config.port}/api-docs`);
});

export { app };
