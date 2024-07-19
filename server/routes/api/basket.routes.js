const router = require("express").Router();
const { Op } = require("sequelize");
const {
  Basket,
  Sneaker,
  OrderLine,
  Order,
  Image,
  Sex,
  Size,
  Color,
  Brand,
  Status,
} = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");
const { log } = require("console");

//verifyAccessToken

router.get("/", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    // console.log( 'USER_________',user.basketId);
    // let a = true;
    //user && !user.isAdmin
    console.log(user);

    if (user && !user.isAdmin) {
      const order = await Order.findOne({
        where: { basketId: user.basketId, statusId: 1 }, //user.basketId
        include: {
          model: OrderLine,
          include: {
            model: Sneaker,
            include: [
              { model: Sex },
              { model: Size },
              { model: Color },
              { model: Brand },
              { model: Image },
            ],
          },
        },
      });
      console.log("========", order);
      // a = false;
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

router.post("/", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { sneakerId } = req.body;

    let order;
    let basketinDb;

    basketinDb = await Basket.findOne({ where: { userId: user.id } }); //user.basketId

    if (!basketinDb) {
      basketinDb = await Basket.create({ userId: user.id }); //изменить на user.id
      res.locals.user.basketId = basketinDb.id;
    }
    order = await Order.findOne({
      where: { basketId: basketinDb.id, statusId: 1 },
    });

    if (!order) {
      order = await Order.create({ basketId: basketinDb.id, statusId: 1 }); //Тотал прайс проверить
    }

    const sneaker = await Sneaker.findOne({ where: { id: sneakerId } });
    let orderLine = await OrderLine.findOne({
      where: { orderId: order.id, sneakerId },
    });

    if (!orderLine) {
      orderLine = await OrderLine.create({
        orderId: order.id,
        sneakerId: sneaker.id,
      });
    }

    if (orderLine) {
      let newPriceLine = orderLine.priceLine + sneaker.price;
      let newOrderCount = orderLine.count + 1;

      await orderLine.update({
        priceLine: newPriceLine,
        count: newOrderCount,
      });
      console.log(orderLine, "orderline");
    }

    let newTotalPrice = order.totalPrice + orderLine.priceLine;
    await order.update({
      totalPrice: newTotalPrice,
    });

    order = await Order.findOne({
      where: { id: order.id },
      include: {
        model: OrderLine,
        include: {
          model: Sneaker,
          include: [
            { model: Sex },
            { model: Size },
            { model: Color },
            { model: Brand },
            { model: Image },
          ],
        },
      },
    });

    console.log("OREDE FINISH", order);

    //  заказ со всеми кросcовками
    res.status(200).json({ message: "success", order });
    return;
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

//Удаление Order

router.delete(
  "/orderLines/:orderLineId",
  verifyAccessToken,
  async (req, res) => {
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

      orderLine.destroy({ where: { orderLineId: id } });

      res.status(200).json({ message: "товар удален из заказа" });
    } catch ({ message }) {
      res.status(500).json({ error: message });
    }
  }
);

//verifyAccessToken
router.put("/orders/:orderId", verifyAccessToken, async (req, res) => {
  try {
    let order;
    const { orderId } = req.params;
    const { user } = res.locals;

    order = await Order.findOne({ where: { id: orderId } });
    // для  админ панели
    if (user.isAdmin) {
      if (order.statusId === 2) {
        await order.update({
          statusId: 3,
        });
      } else if (order.statusId === 3) {
        await order.update({
          statusId: 4,
        });
      }

      order = await Order.findOne({
        where: { id: order.id },
        include: {
          model: OrderLine,
          include: {
            model: Sneaker,
            include: [
              { model: Sex },
              { model: Size },
              { model: Color },
              { model: Brand },
              { model: Image },
            ],
          },
        },
      });
      res.status(200).json({ message: "success", order });
      return;
    }
    if (user && !user.isAdmin) {
      const result = await Order.update(
        { statusId: 2 },
        { where: { id: orderId } }
      );
      if (result[0] > 0) {
        res.status(200).json({ message: "success" }); // order
        return;
      }
      res.status(400).json("Не получилось");
      return;
    }
    res.status(400).json("Вы не админ");
    return;
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

//verifyAccessToken
router.get("/adminOrders", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    // user && user.isAdmin
    // let a = true;
    if (user && user.isAdmin) {
      const orders = await Order.findAll({
        where: { statusId: { [Op.gt]: 1 } },
        include:[ { model: Status },
                  {model: OrderLine , include: {model: Sneaker}},
                  
               ]
      });
      res.status(200).json({ message: "success", orders });
      // a = false;
      return;
    }
    console.log(12121);
    res.status(400).json("Вы не админ");
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.get("/userOrders", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    // user && user.isAdmin
    // let a = true;

    if (user && !user.isAdmin) {
      const orders = await Order.findOne({
        where: { statusId: 1, basketId: user.basketId },
        include: {
          model: OrderLine,
          include: {
            model: Sneaker,
            include: [
              { model: Sex },
              { model: Size },
              { model: Color },
              { model: Brand },
              { model: Image },
            ],
          },
        },
      });
      console.log('UUUSEEEEEERRRR+++++++++++',orders);
      res.status(200).json({ message: "success", orders });
      // a = false;
      return;
    }
    res.status(400).json("Вы не админ");
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

module.exports = router;
