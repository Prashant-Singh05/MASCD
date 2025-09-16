import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Organization from './Organization.js';

class Medicine extends Model {}

Medicine.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    generic_name: { type: DataTypes.STRING },
    composition: { type: DataTypes.STRING }
  },
  { sequelize, modelName: 'medicine', tableName: 'medicines' }
);

Organization.hasMany(Medicine, { foreignKey: { name: 'manufacturer_id', allowNull: false } });
Medicine.belongsTo(Organization, { foreignKey: { name: 'manufacturer_id', allowNull: false } });

export default Medicine;
