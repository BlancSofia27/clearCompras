import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Post extends Model {
  public id!: number;
  public title!: string;
  public price!: number;
  public imageUrl!: string;
  public size!: string;
  public category!: string;
  public brand!: string;
  public color!: string;
  public userId!: number; // Foreign key que relaciona el post con un usuario
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }, // Relación con la tabla User
    },
  },
  {
    sequelize,
    modelName: 'Post',
  }
);

export default Post;
