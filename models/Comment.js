const { Model, DataTypes } = require("sequelize");
const connection = require("../lib/db");

class Comment extends Model {}

Comment.init(
  {
    authorId: {
        type: DataTypes.STRING,
        allowNull: false },
    content: { 
        type: DataTypes.STRING,
        allowNull: false },
    articleId: { type: DataTypes.STRING},
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false },
    uptadedAt: {
      type: DataTypes.DATE,
      },
    deletedAt: {
      type: DataTypes.DATE, 
    }
  }
  ,{
    sequelize: connection,
    modelName: "Comment",
    paranoid: true
  }
);

connection.sync().then(() => {
  console.log("Database synced");
});

module.exports = Comment;