import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    // FIX: Use the 'headers' property which is more broadly compatible with older @types versions.
    // This achieves the same goal as standardHeaders: true and legacyHeaders: false.
    headers: true,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});