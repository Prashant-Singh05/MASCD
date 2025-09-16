import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Batch from './Batch.js';

class Verification extends Model {}

Verification.init(
  {
    checked_by: { type: DataTypes.STRING },
    result: { type: DataTypes.ENUM('authentic', 'suspicious', 'not_found'), allowNull: false },
    checked_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  },
  { sequelize, modelName: 'verification', tableName: 'verifications', updatedAt: false }
);

Batch.hasMany(Verification, { foreignKey: { name: 'batch_id', allowNull: true } });
Verification.belongsTo(Batch, { foreignKey: { name: 'batch_id', allowNull: true } });

export default Verification;
