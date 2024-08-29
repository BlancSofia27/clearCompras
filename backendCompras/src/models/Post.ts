// src/models/Post.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PostAttributes {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  imageUrl1: string;
  imageUrl2: string;
  size: string;
  category: string;
  brand: string;
  color: string;
  userId: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: string;
  public title!: string;
  public price!: number;
  public imageUrl!: string;
  public imageUrl1!: string;
  public imageUrl2!: string;
  public size!: string;
  public category!: string;
  public brand!: string;
  public color!: string;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    imageUrl1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl2: {
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
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Post',
  }
);

export default Post;
