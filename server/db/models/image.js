"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Sneaker }) {
      this.belongsTo(Sneaker, {
        foreignKey: "sneakerId",
      });
    }
  }
  Image.init(
    {
      link: DataTypes.STRING,
      sneakerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
