import express from 'express';
import { body, param } from 'express-validator';
import crypto from 'crypto';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import Batch from '../models/Batch.js';
import Medicine from '../models/Medicine.js';
import SupplyTransaction from '../models/SupplyTransaction.js';
import { generateBatchQrDataUrl } from '../services/qrService.js';

const router = express.Router();

function generateBatchCode() {
  return crypto.randomBytes(8).toString('hex');
}

router.post(
  '/',
  authenticate,
  authorize(['manufacturer']),
  body('medicine_id').isInt(),
  body('manufacture_date').isISO8601(),
  body('expiry_date').isISO8601(),
  body('quantity_produced').isInt({ min: 1 }),
  validate,
  async (req, res, next) => {
    try {
      const { medicine_id, manufacture_date, expiry_date, quantity_produced } = req.body;
      const medicine = await Medicine.findByPk(medicine_id);
      if (!medicine) {
        const err = new Error('Medicine not found');
        err.status = 404;
        throw err;
      }
      const batch_code = generateBatchCode();
      const batch = await Batch.create({
        batch_code,
        medicine_id,
        manufacture_date,
        expiry_date,
        quantity_produced,
        current_owner_id: req.user.orgId,
        status: 'in_production'
      });
      const verificationUrl = `${process.env.VITE_API_BASE || 'http://localhost:3001'}/api/verify?batch_code=${encodeURIComponent(batch.batch_code)}`;
      const qr = await generateBatchQrDataUrl(verificationUrl);
      res.status(201).json({ batch_code: batch.batch_code, qr_data_url: qr, batch });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:batch_code',
  param('batch_code').isString().notEmpty(),
  validate,
  async (req, res, next) => {
    try {
      const { batch_code } = req.params;
      const batch = await Batch.findOne({
        where: { batch_code },
        include: [Medicine]
      });
      if (!batch) {
        return res.status(404).json({ error: { message: 'Batch not found' } });
      }
      res.json(batch);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:batch_code/history',
  param('batch_code').isString().notEmpty(),
  validate,
  async (req, res, next) => {
    try {
      const { batch_code } = req.params;
      const batch = await Batch.findOne({ where: { batch_code } });
      if (!batch) return res.status(404).json({ error: { message: 'Batch not found' } });
      const history = await SupplyTransaction.findAll({ where: { batch_id: batch.id }, order: [['timestamp', 'ASC']] });
      res.json(history);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
