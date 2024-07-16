const router = require("express").Router();
const { Size, Sneaker } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const sizes = await Size.findAll({ include: { model: Sneaker } }); // Нужно ли Sneaker подтягивать?
    res.status(200).json({ message: "success", sizes });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

// router.get('/:id', async (req, res) => {
//     const {id} = req.params


// })

module.exports = router;
