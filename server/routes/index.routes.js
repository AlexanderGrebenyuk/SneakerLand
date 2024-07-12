const router = require('express').Router();


const tokensRouter = require('./api/tokens.routes');
const authRouter = require('./api/auth.routes');
// const sneakersRouter = require()


router.use('/tokens', tokensRouter)
router.use('/auth', authRouter)

module.exports = router;
