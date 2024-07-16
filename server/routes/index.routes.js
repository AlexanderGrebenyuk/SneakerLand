const router = require("express").Router();

const tokensRouter = require("./api/tokens.routes");
const authRouter = require("./api/auth.routes");
const sneakersRouter = require("./api/sneakers.routes");
const imagesRoutes = require("./api/image.routes");
const likesRouters = require("./api/like.router")


const basketRoutes= require('./api/basket.routes')


router.use("/tokens", tokensRouter);
router.use("/auth", authRouter);
router.use("/sneakers", sneakersRouter);
router.use("/images", imagesRoutes);
router.use("/likes", likesRouters )


router.use('/basket', basketRoutes)

module.exports = router;
