import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Batch from './Batch.js';
import Organization from './Organization.js';
import User from './User.js';

class SupplyTransaction extends Model {}

SupplyTransaction.init(
  {
    to_customer_id: { type: DataTypes.INTEGER, allowNull: true },
    note: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  },
  { sequelize, modelName: 'supply_transaction', tableName: 'supply_transactions', updatedAt: false }
);

Batch.hasMany(SupplyTransaction, { foreignKey: { name: 'batch_id', allowNull: false } });
SupplyTransaction.belongsTo(Batch, { foreignKey: { name: 'batch_id', allowNull: false } });

Organization.hasMany(SupplyTransaction, { foreignKey: { name: 'from_org_id', allowNull: true } });
SupplyTransaction.belongsTo(Organization, { as: 'from_org', foreignKey: { name: 'from_org_id', allowNull: true } });

Organization.hasMany(SupplyTransaction, { foreignKey: { name: 'to_org_id', allowNull: true } });
SupplyTransaction.belongsTo(Organization, { as: 'to_org', foreignKey: { name: 'to_org_id', allowNull: true } });

User.hasMany(SupplyTransaction, { foreignKey: { name: 'initiated_by', allowNull: true } });
SupplyTransaction.belongsTo(User, { as: 'initiator', foreignKey: { name: 'initiated_by', allowNull: true } });

export default SupplyTransaction;
