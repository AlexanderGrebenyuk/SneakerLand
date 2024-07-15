const { Image, Sneaker } = require('../../db/models');
const router = require('express').Router();
const upload = require('../../middleware/multer');
const imageController = require('../../controllers/imageController');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.post(
  '/upload-images/:sneakerId',
  upload.array('images', 3),
  imageController.uploadImages
);

// ПРОВЕРИТЬ С ВЛАДОМ и verifyAccessToken
router.post('/', verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { link, sneakerId } = req.body;
    //user.isAdmin
    if (user.isAdmin) {
      const sneaker = await Sneaker.findOne({ where: { id: sneakerId } });
      const image = await Image.create({ link, sneakerId: sneaker.id });
      res.status(201).json({ message: 'success', image });
      return;
    }
    res.status(400).json({ message: 'Вы не админ' });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

// ПРОВЕРИТЬ С ВЛАДОМ и verifyAccessToken
router.delete('/:id', verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = res.locals;
    if (user.isAdmin) {
      const sneaker = await Image.destroy({ where: { id } });
      res.status(200).json({ message: 'success' });
      return;
    }
    res.status(400).json({ message: 'Вы не админ' });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

module.exports = router;
