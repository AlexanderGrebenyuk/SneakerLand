const jwt = require("jsonwebtoken");
const { User, Basket } = require("../db/models");

async function verifyRefreshToken(req, res, next) {
  try {
    const { refresh } = req.cookies;
    console.log(refresh);
    let { user } = jwt.verify(refresh, "R");

    user = await User.findOne({
      where: { id: user.id },
      attributes: ["id", "name", "email", "isAdmin"],
    });

    const basket = await Basket.findOne({ where: { userId: user.id } });
    if (basket) {
      user.dataValues.basketId = basket.id; //ДОБАВИЛИ dataValues
    }
    res.locals.user = user;
    

    next();
  } catch (error) {
    console.log("Invalid refresh token");
    res.clearCookie("refreshToken").sendStatus(401);
  }
}

module.exports = verifyRefreshToken;
