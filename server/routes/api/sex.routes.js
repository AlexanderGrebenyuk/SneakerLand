const router = require("express").Router();
const { Sex, Sneaker } = require("../../db/models");

router.get("/", async (req, res) => {
    try {
      const sexes = await Sex.findAll({ include: { model: Sneaker } }); // Нужно ли Sneaker подтягивать?
      res.status(200).json({ message: "success", sexes });
    } catch ({ message }) {
      res.status(500).json({ error: message });
    }
  });

module.exports = router;