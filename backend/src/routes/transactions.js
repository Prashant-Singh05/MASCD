import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import sequelize from '../config/db.js';
import Batch from '../models/Batch.js';
import SupplyTransaction from '../models/SupplyTransaction.js';

const router = express.Router();

router.post(
  '/transfer',
  authenticate,
  body('batch_code').isString().notEmpty(),
  body('to_org_id').optional({ nullable: true }).isInt(),
  body('to_customer_id').optional({ nullable: true }).isInt(),
  body('note').optional().isString(),
  validate,
  async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { batch_code, to_org_id, to_customer_id, note, location } = req.body;
      if (!to_org_id && !to_customer_id) {
        const err = new Error('to_org_id or to_customer_id is required');
        err.status = 400;
        throw err;
      }
      const batch = await Batch.findOne({ where: { batch_code } });
      if (!batch) {
        const err = new Error('Batch not found');
        err.status = 404;
        throw err;
      }
      const from_org_id = batch.current_owner_id || null;
      let newStatus = batch.status;
      if (to_org_id) {
        newStatus = 'in_transit';
      } else if (to_customer_id) {
        newStatus = 'sold';
      }

      await Batch.update(
        { current_owner_id: to_org_id || batch.current_owner_id, status: newStatus },
        { where: { id: batch.id }, transaction: t }
      );

      const tx = await SupplyTransaction.create(
        {
          batch_id: batch.id,
          from_org_id,
          to_org_id: to_org_id || null,
          to_customer_id: to_customer_id || null,
          note: note || null,
          location: location || null,
          initiated_by: req.user.id
        },
        { transaction: t }
      );

      await t.commit();
      res.status(201).json({ message: 'Transfer recorded', transaction: tx });
    } catch (e) {
      await t.rollback();
      next(e);
    }
  }
);

export default router;
