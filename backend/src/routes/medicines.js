import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import Medicine from '../models/Medicine.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  authorize(['manufacturer']),
  body('name').isString().notEmpty(),
  body('generic_name').optional().isString(),
  body('composition').optional().isString(),
  validate,
  async (req, res, next) => {
    try {
      if (process.env.SKIP_DB === '1') {
        return res.status(201).json({ id: 1, name: req.body.name, generic_name: req.body.generic_name || null, composition: req.body.composition || null, manufacturer_id: req.user.orgId || 1 });
      }
      const manufacturer_id = req.user.orgId;
      const { name, generic_name, composition } = req.body;
      const med = await Medicine.create({ name, generic_name, composition, manufacturer_id });
      res.status(201).json(med);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
