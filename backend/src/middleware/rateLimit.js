import rateLimit from 'express-rate-limit';

export const verifyLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: Number(process.env.VERIFY_RATE_LIMIT_PER_MIN || 30),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { message: 'Too many requests, please try again later.' } }
});
