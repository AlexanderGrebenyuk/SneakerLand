const { Sneaker, Sex, Size, Color, Brand, Image } = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");
const router = require("express").Router();

//Вкладка Обувь
router.get("/", async (req, res) => {
  try {
    const sneakers = await Sneaker.findAll({
      include: [
        { model: Sex },
        { model: Size },
        { model: Color },
        { model: Brand },
        { model: Image },
      ],
    });
    res.status(200).json({ message: "success", sneakers });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

//для страницы 1 пары кроссовок

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sneaker = await Sneaker.findOne({
      where: { id },
      include: [
        { model: Sex },
        { model: Size },
        { model: Color },
        { model: Brand },
        { model: Image },
      ],
    });
    res.status(200).json({ message: "success", sneaker });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

// ТОЛЬКО ДЛЯ АДМИНА!!!! verifyAccessToken, ВЛАД ОБЪЯСНИТ ССЫЛКИ НА IMG upload
router.post("/", verifyAccessToken,  async (req, res) => {
  try {
    const { model, description, price, sexId, sizeId, colorId, brandId, link } =
      req.body;

    const { user } = res.locals;
    if (user.isAdmin) {
      if (
        model.trim() !== "" &&
        description.trim() !== "" &&
        price !== "" &&
        sexId !== "" &&
        sizeId !== "" &&
        colorId !== "" &&
        brandId !== "" &&
        link.trim() !== ""
      ) {
        const newSneaker = await Sneaker.create({
          model,
          description,
          price,
          sexId,
          sizeId,
          colorId,
          brandId,
        });
        if (newSneaker) {
          const img = await Image.create({ link, sneakerId: newSneaker.id });
          if (img) {
            const sneaker = await Sneaker.findOne({
              where: { id: newSneaker.id },
              include: [
                { model: Sex },
                { model: Size },
                { model: Color },
                { model: Brand },
                { model: Image },
              ],
            });
            res.status(201).json({ message: "success", sneaker });
            return;
          }
        }
        return;
      }
      res.status(400).json({ message: "Не должно быть пустых полей" });
      return;
    }
    res.status(400).json({ message: "Вы не админ" });
    return;
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

// verifyAccessToken
router.delete("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = res.locals;

    //user.isAdmin
    if (user.isAdmin) {
      const result = await Sneaker.destroy({ where: { id } });

      if (result > 0) {
        res.status(200).json({ message: "success" });
        return;
      }
    }
     res.status(400).json({ message: "Вы не админ" });
     return
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

// verifyAccessToken
router.put("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { model, description, price, sexId, sizeId, colorId, brandId, link } =
      req.body;
    const { user } = res.locals;
    if (user.isAdmin) {
      const result = await Sneaker.update(
        { model, description, price, sexId, sizeId, colorId, brandId, link },
        { where: { id } }
      );
      if (result[0] > 0) {
        const sneaker = await Sneaker.findOne({
          where: { id },
          include: [
            { model: Sex },
            { model: Size },
            { model: Color },
            { model: Brand },
            { model: Image },
          ],
        });
        res.status(200).json({ message: "success", sneaker });
        return;
      }
      res.status(400).json("Что-то пошло не так");
      return;
    }
     res.status(400).json({ message: "Вы не админ" });
     return
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

module.exports = router;
