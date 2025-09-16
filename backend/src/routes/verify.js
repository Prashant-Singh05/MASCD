import express from 'express';
import { body, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { verifyLimiter } from '../middleware/rateLimit.js';
import Batch from '../models/Batch.js';
import Medicine from '../models/Medicine.js';
import SupplyTransaction from '../models/SupplyTransaction.js';
import Verification from '../models/Verification.js';

const router = express.Router();

async function getBatchAndHistory(batch_code) {
  const batch = await Batch.findOne({ where: { batch_code }, include: [Medicine] });
  if (!batch) return { result: 'not_found' };
  const history = await SupplyTransaction.findAll({ where: { batch_id: batch.id }, order: [['timestamp', 'ASC']], limit: 5 });
  return { result: 'authentic', batch, history_preview: history };
}

router.post(
  '/',
  verifyLimiter,
  body('batch_code').isString().notEmpty(),
  validate,
  async (req, res, next) => {
    try {
      const { batch_code } = req.body;
      if (process.env.SKIP_DB === '1') {
        return res.json({ result: 'not_found' });
      }
      const info = await getBatchAndHistory(batch_code);
      await Verification.create({
        batch_id: info.batch?.id || null,
        checked_by: req.ip,
        result: info.result
      });
      res.json(info);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/',
  verifyLimiter,
  query('batch_code').isString().notEmpty(),
  validate,
  async (req, res, next) => {
    try {
      const { batch_code } = req.query;
      if (process.env.SKIP_DB === '1') {
        return res.json({ result: 'not_found' });
      }
      const info = await getBatchAndHistory(batch_code);
      await Verification.create({
        batch_id: info.batch?.id || null,
        checked_by: req.ip,
        result: info.result
      });
      res.json(info);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
