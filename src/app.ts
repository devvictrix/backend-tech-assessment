import express from 'express';
import { apiLimiter } from './core/middleware/rateLimit.middleware';
import { authRoutes } from './api/auth/auth.routes';
import { cardsRoutes } from './api/cards/cards.routes';
import { authMiddleware } from './core/middleware/auth.middleware';
import { setupSwagger } from './config/swagger'; // Import Swagger setup

const app = express();

// Apply the rate limiting middleware to all requests
app.use(apiLimiter);

// Parse JSON bodies
app.use(express.json());

// Setup Swagger Documentation
setupSwagger(app);

// --- Public Route ---
app.use('/api/auth', authRoutes);

// --- Protected Routes ---
app.use('/api/cards', authMiddleware, cardsRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

export default app;