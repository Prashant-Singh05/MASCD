import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { Op } from 'sequelize';
import Batch from '../models/Batch.js';
import Medicine from '../models/Medicine.js';

const router = express.Router();

router.get('/expired', authenticate, authorize(['admin']), async (_req, res, next) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const batches = await Batch.findAll({
      where: {
        expiry_date: { [Op.lt]: today },
        status: { [Op.ne]: 'sold' }
      },
      include: [Medicine]
    });
    res.json(batches);
  } catch (e) {
    next(e);
  }
});

export default router;
