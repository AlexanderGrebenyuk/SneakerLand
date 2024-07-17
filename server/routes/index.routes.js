const router = require("express").Router();

const tokensRouter = require("./api/tokens.routes");
const authRouter = require("./api/auth.routes");
const sneakersRouter = require("./api/sneakers.routes");
const imagesRoutes = require("./api/image.routes");
const likesRouters = require("./api/like.router")
const sizesRoutes= require('./api/sizes.routes')
const sexRoutes = require('./api/sex.routes')
const brandRoutes = require('./api/brand.routes')
const colorRoutes = require('./api/color.routes')


const basketRoutes= require('./api/basket.routes')


router.use("/tokens", tokensRouter);
router.use("/auth", authRouter);
router.use("/sneakers", sneakersRouter);
router.use("/images", imagesRoutes);
router.use("/likes", likesRouters )
router.use("/sizes", sizesRoutes )
router.use("/sexes", sexRoutes )
router.use("/brands", brandRoutes )
router.use("/colors", colorRoutes )


router.use('/basket', basketRoutes)

module.exports = router;
