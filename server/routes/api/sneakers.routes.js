const router = require('express').Router();
const { Sneaker, Sex, Size, Color, Brand, Image } = require('../../db/models');
const upload = require('../../middleware/multer');
const imageController = require('../../controllers/imageController');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

//Вкладка Обувь
router.get('/', async (req, res) => {
  try {
    const sneakers = await Sneaker.findAll({
      where: req.query,
      include: [
        { model: Sex },
        { model: Size },
        { model: Color },
        { model: Brand },
        { model: Image },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json({ message: 'success', sneakers });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

//для страницы 1 пары кроссовок

router.get('/:id', async (req, res) => {
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
    console.log(sneaker);
    res.status(200).json({ message: 'success', sneaker });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.post(
  '/upload-images/:sneakerId',
  upload.array('images', 3),
  imageController.uploadImages
);

// VERIFYACCESS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post('/', upload.array('images'), async (req, res) => {
  // console.log(req.files, '---');
  console.log('REQBODY+++++!!!!!!', req.body);
  try {
    const {
      model,
      description,
      price,
      sexId,
      sizeId,
      colorId,
      brandId,
      images,
      modelName,
    } = req.body;

    const { user } = res.locals;
    let a = true;
    if (a) {
      if (
        model.trim() !== '' &&
        description.trim() !== '' &&
        price !== '' &&
        sexId !== '' &&
        sizeId !== '' &&
        colorId !== '' &&
        brandId !== ''
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
        a = false;

        if (newSneaker) {
          const createdImages = await Promise.all(
            req.files.map(async (img) => {
              console.log(img);
              console.log(req.files);
              return await Image.create({
                link: `img/imgSneakers/${modelName}/${img.filename}`,
                sneakerId: newSneaker.id,
              });
            })
          );

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

          res.status(201).json({ message: 'success', sneaker });
          return;
        }
      }

      res.status(400).json({
        message:
          'Не должно быть пустых полей или неверное количество изображений',
      });
      return;
    }

    res.status(400).json({ message: 'Вы не админ' });
    return;
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

// verifyAccessToken
router.delete('/:id', verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = res.locals;

    //user.isAdmin
    if (user.isAdmin) {
      const result = await Sneaker.destroy({ where: { id } });

      if (result > 0) {
        res.status(200).json({ message: 'success' });
        return;
      }
    }
    res.status(400).json({ message: 'Вы не админ' });
    return;
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

// verifyAccessToken
router.put('/:id', verifyAccessToken, async (req, res) => {
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
        res.status(200).json({ message: 'success', sneaker });
        return;
      }
      res.status(400).json('Что-то пошло не так');
      return;
    }
    res.status(400).json({ message: 'Вы не админ' });
    return;
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

module.exports = router;
