import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Organization extends Model {}

Organization.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    type: {
      type: DataTypes.ENUM('manufacturer', 'distributor', 'pharmacy'),
      allowNull: false
    },
    address: { type: DataTypes.STRING },
    contact: { type: DataTypes.STRING }
  },
  { sequelize, modelName: 'organization', tableName: 'organizations' }
);

export default Organization;
