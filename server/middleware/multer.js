const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const modelName = req.body.modelName; // Получаем модель кроссовок из тела запроса
    const dir = path.join(__dirname, `../public/img/imgSneakers/${modelName}`);

    // Создать папку, если она не существует
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, path.join(__dirname,'..', '/public/img/imgSneakers/'));
//   },
//   filename(req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}`);
//   },
// });

const upload = multer({ storage: storage });

module.exports = upload;
