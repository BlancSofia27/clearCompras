import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Post from './Post';

class User extends Model {
  public id!: number;
  public email!: string;
  public businessName!: string;
  public whatsapp!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

// Definir la relación
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

export default User;
