"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Basket, Status, OrderLine }) {
      this.belongsTo(Basket, {
        foreignKey: "basketId",
      });
      this.belongsTo(Status, {
        foreignKey: "statusId",
      });
      this.hasMany(OrderLine, {
        foreignKey: "orderId",
      });
    }
  }
  Order.init(
    {
      totalPrice: DataTypes.INTEGER,
      basketId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
