const router = require("express").Router();

const tokensRouter = require("./api/tokens.routes");
const authRouter = require("./api/auth.routes");
const sneakersRouter = require("./api/sneakers.routes");
const imagesRoutes = require("./api/image.routes");
const likesRouters = require("./api/like.router")
const sizesRoutes= require('./api/sizes.routes')
const sexRoutes = require('./api/sex.routes')


const basketRoutes= require('./api/basket.routes')


router.use("/tokens", tokensRouter);
router.use("/auth", authRouter);
router.use("/sneakers", sneakersRouter);
router.use("/images", imagesRoutes);
router.use("/likes", likesRouters )
router.use("/sizes", sizesRoutes )
router.use("/sexes", sexRoutes )


router.use('/basket', basketRoutes)

module.exports = router;
