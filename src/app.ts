import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';

import { authRoutes } from '@/api/auth/auth.routes';
import { interviewRoutes } from '@/api/interview/interview.routes';
import { userRoutes } from '@/api/user/user.routes';
import { env } from '@/config/env';
import { logger } from '@/config/logger';
import { setupSwagger } from '@/config/swagger';
import { authMiddleware } from '@/core/middleware/auth.middleware';
import { errorHandler } from '@/core/middleware/error-handler.middleware';
import { apiLimiter } from '@/core/middleware/rate-limit.middleware';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use(apiLimiter);

const sanitizedPrefix = env.API_PREFIX.replace(/^\/|\/$/g, '');
const v1BasePath = `/${sanitizedPrefix}/v1`;

app.use(`${v1BasePath}/auth`, authRoutes);

setupSwagger(app);

app.use(authMiddleware);

app.use(`${v1BasePath}/interviews`, interviewRoutes);
app.use(`${v1BasePath}/users`, userRoutes);

app.get('/health', (req, res) => res.status(200).send('OK'));

app.use(errorHandler);

export default app;