// const like = require('../../db/models/like');
const { Sneaker, Brand, Image } = require('../../db/models');
const { Like } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
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

router.post('/', verifyAccessToken, async (req, res) => {
  try {
    console.log(req.body, '2222222222');
    const { user } = res.locals;
    const { sneakerId } = req.body;
    let like;
    console.log(sneakerId, '3333333333333333');
    like = await Like.findOne({
      where: { userId: user.id, sneakerId: sneakerId },
    });
    console.log(like, 'mmmmmmmmmmmmmmmmmmm');
    if (!like) {
      like = await Like.create({ userId: user.id, sneakerId: sneakerId });
      if (like) {
        like = await Like.findOne({
          where: { id: like.id, userId: user.id },
          include: {
            model: Sneaker,
            include: [{ model: Brand }, { model: Image }],
          },
        });
        res.status(201).json({ message: 'success', like });
        return;
      }
    }
  } catch ({ message }) {
    res.json({ error: message });
  }
});

router.delete('/:id', verifyAccessToken, async (req, res) => {
  const { user } = res.locals;
  const { id } = req.params;
  const result = await Like.destroy({
    where: { userId: user.id, sneakerId: id },
  });

  try {
    if (result > 0) {
      res.status(200).json({ message: 'успешно удалено' });
      return;
    }
    res.status(400).json({ message: 'что-то пошло не так' });
    return;
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

module.exports = router;
