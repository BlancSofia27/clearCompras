// src/models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Post from './Post';

interface UserAttributes {
  userId: string;
  email: string;
  businessName: string;
  whatsapp: string;
  instagram: string;
  logo: string;
  header: string;
}

//interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes> implements UserAttributes {
  public userId!: string;
  public email!: string;
  public businessName!: string;
  public whatsapp!: string;
  public instagram!:string;
  public logo!: string;
  public header!: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    header: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

// Relación con Post
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

export default User;
