const { Brand} = require('../../db/models');
const router = require('express').Router();

router.get("/", async (req, res) => {
    try {
      const brands = await Brand.findAll(); 
      res.status(200).json({ message: "success", brands });
    } catch ({ message }) {
      res.status(500).json({ error: message });
    }
  });

module.exports = router