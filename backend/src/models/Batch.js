import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Medicine from './Medicine.js';
import Organization from './Organization.js';

class Batch extends Model {}

Batch.init(
  {
    batch_code: { type: DataTypes.STRING, allowNull: false, unique: true },
    manufacture_date: { type: DataTypes.DATEONLY, allowNull: false },
    expiry_date: { type: DataTypes.DATEONLY, allowNull: false },
    quantity_produced: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    status: {
      type: DataTypes.ENUM('in_production', 'in_transit', 'with_distributor', 'with_pharmacy', 'sold', 'flagged'),
      allowNull: false,
      defaultValue: 'in_production'
    }
  },
  { sequelize, modelName: 'batch', tableName: 'batches' }
);

Medicine.hasMany(Batch, { foreignKey: { name: 'medicine_id', allowNull: false } });
Batch.belongsTo(Medicine, { foreignKey: { name: 'medicine_id', allowNull: false } });

Organization.hasMany(Batch, { foreignKey: { name: 'current_owner_id', allowNull: true } });
Batch.belongsTo(Organization, { foreignKey: { name: 'current_owner_id', allowNull: true } });

export default Batch;
