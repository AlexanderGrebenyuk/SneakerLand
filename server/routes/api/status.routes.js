const router = require('express').Router();


router.get('/', async (req, res) => {
    try {
      const likes = await Like.findAll({
        include: {
          model: Sneaker,
          include: [{ model: Brand }, { model: Image }],
        },
      });
      //   console.log(likes, '11111111111111111111111111111111111');
      if (likes) {
        res.status(200).json({ message: 'success', likes });
        return;
      }
      res.status(400).json({ message: 'увы и ах' });
    } catch ({ message }) {
      res.status(500).json({ error: message });
    }
  });

module.exports = router;