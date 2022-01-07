const { Model, DataTypes } = require("sequelize");
const connection = require("../lib/db");

class Article extends Model {}

Article.init(
  {
    id: { type: DataTypes.INTEGER(11), allowNull: false, 
                autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    tags: { type: DataTypes.STRING,allowNull: false },
    authorId:{
      type: DataTypes.INTEGER, allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deletedAt: { type: DataTypes.STRING }
  },
  {
    sequelize: connection,
    modelName: "Article",
    paranoid: true
  }
);

module.exports = Article;