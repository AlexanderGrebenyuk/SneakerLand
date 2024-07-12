"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sneaker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Like, Color, Sex, Image, Size, Brand, Comment }) {
      this.hasMany(Like, {
        foreignKey: "sneakerId",
      });
      this.belongsTo(Color, {
        foreignKey: "colorId",
      });
      this.belongsTo(Sex, {
        foreignKey: "sexId",
      });
      this.belongsTo(Size, {
        foreignKey: "sizeId",
      });
      this.belongsTo(Brand, {
        foreignKey: "brandId",
      });
      this.hasMany(Image, {
        foreignKey: "sneakerId",
      });
      this.hasMany(Comment, {
        foreignKey: "sneakerId",
      });

    }
  }
  Sneaker.init(
    {
      model: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      sexId: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
      colorId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Sneaker",
    }
  );
  return Sneaker;
};
