"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Sneaker }) {
      this.belongsTo(Order, {
        foreignKey: "orderId",
      });
      this.belongsTo(Sneaker, {
        foreignKey: "sneakerId",
      });
    }
  }
  OrderLine.init(
    {
      count: DataTypes.INTEGER,
      priceLine: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      sneakerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderLine",
    }
  );
  return OrderLine;
};
