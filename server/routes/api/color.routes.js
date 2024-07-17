const { Color} = require('../../db/models');
const router = require('express').Router();

router.get("/", async (req, res) => {
    try {
      const colors = await Color.findAll(); 
      res.status(200).json({ message: "success", colors });
    } catch ({ message }) {
      res.status(500).json({ error: message });
    }
  });

module.exports = router