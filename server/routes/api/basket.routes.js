const router = require("express").Router();
const { Basket, Sneaker, OrderLine, Order } = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");

//verifyAccessToken
router.get("/", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;

    if (user && !user.isAdmin) {
      const basketSneakers = await Basket.findOne({
        where: { userId: user.id },
        include: {
          model: Order,
          include: { model: OrderLine, include: { model: Sneaker } },
        },
      });
      res.status(200).json({ message: "success", basketSneakers });
      return;
    }
    res.status(400).json({ message: "что-то пошло не так" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

//СОЗДАНИЕ OrderLine
//verifyAccessToken
router.post("/", async (req, res) => {
  try {
    const { user } = res.locals;
    const { basketId, statusId, orderId, sneakerId, count, priceLine } =
      req.body;
    const basketinDb = await Basket.findOne({ where: { basketId: id } });
    if (!basketinDb) {
      const newBasket = await Basket.create({ where: { userId: 3 } }); //изменить на user.id
      let order;
      order = await Order.findOne({ where: { basketId: newBasket.id } });
      if (!order) {
        order = await Order.create({
          where: { basketId: newBasket.id, statusId: 1, totalPrice: 0 },
        }); //Тотал прайс проверить
      }
      let orderLine = await OrderLine.findOne({ where: { orderId: order.id } });
      if (!orderLine) {
        const sneaker = await Sneaker.findOne({ where: { sneakerId: id } });
        orderLine = await OrderLine.create({
          where: {
            orderId: order.id,
            sneakerId: sneaker.id,
            count: 1,
            priceLine: sneaker.price, // Спросить count же по умолчанию 1?
          },
        });
      }
      order = await Order.update({
        basketId: newBasket.id,
        statusId: 1,
        totalPrice: orderLine.priceLine,
      });
      // изменить на user.id
      const basket = await Basket.findOne({
        where: { userId: 3 },
        include: {
          model: Order,
          include: { model: OrderLine, include: { model: Sneaker } },
        },
      });
      res.status(201).json({ message: "success", basket });
      return;
    }
    res.status(400).json("Корзина уже создана");
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

//Удаление Order

router.delete("/orders/:orderId", async (req, res) => {
  try {
    const { user } = res.locals;
    const { orderId } = req.params;

    const basket = await Basket.findOne({ where: { userId: 3 } }); //  изменить на user.id
    const order = await Order.findOne({
      where: { orderId: id, basketId: basket.id },
    });
    if (basket && order) {
      const result = await Order.destroy({where: {}})
    }
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

module.exports = router;
