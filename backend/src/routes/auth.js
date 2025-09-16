import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import User from '../models/User.js';
import Organization from '../models/Organization.js';

const router = express.Router();

const saltRounds = 10;

function signToken(user) {
  const payload = { id: user.id, role: user.role, orgId: user.organization_id, name: user.name };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
}

router.post(
  '/register',
  body('name').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['manufacturer', 'distributor', 'pharmacy', 'customer', 'admin']),
  body('organization_id').optional({ nullable: true }).isInt(),
  validate,
  async (req, res, next) => {
    try {
      const { name, email, password, role, organization_id } = req.body;
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        const err = new Error('Email already registered');
        err.status = 409;
        throw err;
      }
      if (organization_id) {
        const org = await Organization.findByPk(organization_id);
        if (!org) {
          const err = new Error('Organization not found');
          err.status = 400;
          throw err;
        }
      }
      const password_hash = await bcrypt.hash(password, saltRounds);
      const user = await User.create({ name, email, password_hash, role, organization_id: organization_id || null });
      const token = signToken(user);
      res.status(201).json({ token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  validate,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
      }
      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
      }
      const token = signToken(user);
      res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
