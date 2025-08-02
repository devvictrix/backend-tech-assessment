import app from './app';
import { prisma } from './config';
import { env } from './config/env';
import { logger } from './config/logger';

const server = app.listen(env.PORT, () => {
    logger.info(`Server is running on ${env.APP_URL}`);
});

const gracefulShutdown = (signal: string) => {
    process.on(signal, async () => {
        logger.info(`${signal} signal received: closing HTTP server.`);
        server.close(async () => {
            logger.info('HTTP server closed.');
            await prisma.$disconnect();
            logger.info('Prisma client disconnected.');
            process.exit(0);
        });
    });
};

gracefulShutdown('SIGTERM');
gracefulShutdown('SIGINT');

process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    logger.fatal(reason, 'Unhandled Rejection at Promise');
    throw reason;
});

process.on('uncaughtException', (error: Error) => {
    logger.fatal(error, 'Uncaught Exception thrown');
    process.exit(1);
});