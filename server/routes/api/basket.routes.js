const router = require("express").Router();
const { Basket, Sneaker, OrderLine, Order } = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");

//verifyAccessToken

router.get("/", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;

    if (user && !user.isAdmin) {
      const order = await Order.findOne({
        where: { basketId: user.basketId, statusId: 1 },
        include: {
          model: OrderLine,
          include: { model: Sneaker },
        },
      });
      res.status(200).json({ message: "success", order });
      return;
    }
    res.status(400).json({ message: "что-то пошло не так" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

//СОЗДАНИЕ OrderLine
//verifyAccessToken
router.post("/", verifyAccessToken,  async (req, res) => {
  try {
    const { user } = res.locals; // засунуть в юзера баскетИд
    const {  sneakerId } = req.body;
    let order;
    let basketinDb;

    basketinDb = await Basket.findOne({ where: { id: user.basketId } });

    if (!basketinDb) {
      basketinDb = await Basket.create({ where: { userId: 3 } }); //изменить на user.id
      res.locals.user.basketId = basketinDb.id;
    }
    order = await Order.findOne({
      where: { basketId: basketinDb.id, statusId: 1 },
    });

    if (!order) {
      order = await Order.create({
        where: { basketId: basketinDb.id, statusId: 1 },
      }); //Тотал прайс проверить
    }

    const sneaker = await Sneaker.findOne({ where: { id: sneakerId } });

    let orderLine = await OrderLine.findOne({
      where: { orderId: order.id, sneakerId },
    });

    if (!orderLine) {
      orderLine = await Order.create({ orderId: order.id, sneakerId });
    } else {
      orderLine.update({
        priceLine: orderLine.priceLine + sneaker.price,
        count: orderLine.count + 1,
      });
    }

    order.update({
      totalPrice: order.totalPrice + orderLine.priceLine,
    });

    order = await Order.findOne({
      where: { id: order.id },
      include: OrderLine,
    });

    //  заказ со всеми кросовками
    res.status(200).json({ message: "success", order });
    return;
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

//Удаление Order

router.delete("/orderLines/:orderLineId", async (req, res) => {
  try {
    const { user } = res.locals;
    const { orderLineId } = req.params;
    const orderLine = await OrderLine.findOne({ where: { id: orderLineId } });
    if (orderLine.count > 1) {
      orderLine.update({
        count: orderLine.count - 1,
      });

      res.status(200).json({ message: "success", orderLine });
      return;
    }

    orderLine.destroy();

    res.status(200).json({ message: "товар удален из заказа" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

module.exports = router;
