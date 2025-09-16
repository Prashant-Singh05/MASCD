import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Organization from './Organization.js';

class User extends Model {}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('manufacturer', 'distributor', 'pharmacy', 'customer', 'admin'),
      allowNull: false
    }
  },
  { sequelize, modelName: 'user', tableName: 'users' }
);

Organization.hasMany(User, { foreignKey: { name: 'organization_id', allowNull: true } });
User.belongsTo(Organization, { foreignKey: { name: 'organization_id', allowNull: true } });

export default User;
