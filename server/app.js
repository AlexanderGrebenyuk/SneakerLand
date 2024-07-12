const express = require('express');
const removeHeaders = require('./middleware/removeHeaders');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const app = express();
const PORT = 3000;


app.use(express.urlencoded({extended: true}))
app.use(removeHeaders)
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))


const indexRouter = require('./routes/index.routes');




app.use('/api', indexRouter)

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
