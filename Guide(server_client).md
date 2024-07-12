## ПУСТОЙ ПРОЕКТ

Пакеты для установки на server
npm i express
npm i -D nodemon
npm i morgan
npm i cookie-parser
npm i bcrypt
npm i jsonwebtoken

Пакеты для установки на client
npm create vite@latest .
npm i react-router-dom
npm i axios

SERVER

1. `npm init -y` – иициализация проекта
1. `npx gitignore node` – создание .gitignore
<!-- 1. `npm i -D eslint` – ESLint
1. `npm init @eslint/config` – настройка ESLint -->
1.

Main и скрипты в `p

1. ackage.json`

   ```JSON
   "scripts": {
    "dev": "nodemon app.js --ext js,json",
    "dbr" : "npx sequelize db:drop && npx sequelize db:create && npx sequelize db:migrate && npx sequelize-cli db:seed:all"
   },
   ``

    `npx sequelize db:seed:all` – применить все сиды
    `npx sequelize db:seed:undo:all` – отменить все сиды

   app.js создаем в корневой папке
   ```

## БАЗА ДАННЫХ

1.  `npm i sequelize pg pg-hstore sequelize-cli` - Общая команда
2.  `echo > .sequelizerc` – создание файла конфигурации Sequelize
3.  Запись в файл `.sequelizerc`

    ```Javascript
    const path = require('path')

    module.exports = {
      'config': path.resolve('db', 'config', 'config.json'),
      'models-path': path.resolve('db', 'models'),
      'seeders-path': path.resolve('db', 'seeders'),
      'migrations-path': path.resolve('db', 'migrations')
    };
    ```

4.  `npx sequelize-cli init` – инициализация Sequelize-cli

5.  Запись в файл для доступа к БД `db/config/config.json`

{
"development": {
"username": "postgres",
"password": "postgres",
"dialect": "postgres",
"database": "books3",
"host": "127.0.0.1"
},
"test": {
"username": "root",
"password": null,
"database": "database_test",
"host": "127.0.0.1",
"dialect": "mysql"
},
"production": {
"username": "root",
"password": null,
"database": "database_production",
"host": "127.0.0.1",
"dialect": "mysql"
}
}

````

1. `npx sequelize-cli db:create` – создаём БД

## КОММАНДЫ ДЛЯ БАЗЫ ДАННЫХ

1.  – создаём модель, которая всегда начинается с большой буквы в единственном числе. Миграция создается автоматически
npx sequelize model:generate --name User --attributes name:string,email:string,password:string,isAdmin:boolean
npx sequelize model:generate --name Contact --attributes address:text,email:string,phone:string
npx sequelize model:generate --name Sex --attributes title:string
npx sequelize model:generate --name Size --attributes size:float
npx sequelize model:generate --name Color --attributes name:string
npx sequelize model:generate --name Brand --attributes name:string
npx sequelize model:generate --name Sneaker --attributes model:string,description:text,price:integer,sexId:integer,sizeId:integer,colorId:integer,brandId:integer
npx sequelize model:generate --name Comment --attributes text:text,userId:integer,sneakerId:integer
npx sequelize model:generate --name Like --attributes userId:integer,sneakerId:integer
npx sequelize model:generate --name Image --attributes link:string,sneakerId:integer
npx sequelize model:generate --name Basket --attributes userId:integer
npx sequelize model:generate --name Status --attributes name:string
npx sequelize model:generate --name Order --attributes totalPrice:integer,basketId:integer,statusId:integer
npx sequelize model:generate --name OrderLine --attributes count:integer,priceLine:integer,orderId:integer,sneakerId:integer



1. Зайти в миграции и изменить колонки под задачу

```Javascript
type: Sequelize.TEXT,
allowNull: false,
unique: true,
defaultValue: "John Doe"
````

1. Также прописать связи в миграциях и моделях

   В МОДЕЛИ `Post` (зависимая)

   ```Javascript
   static associate({User}) {
     this.belongsTo(User, {
       foreignKey: 'userId',
     });
   }
   ```

   В МОДЕЛИ `User` (от которой зависят)

   ```Javascript
   static associate({Post}) {
     this.hasMany(Post, {
       foreignKey: 'userId',
     });
   }
   ```

   В МИГРАЦИИ `create-post` (зависимая)

   ```Javascript
   userId: {
   references: {
     model: "Users",
     key: 'id',
   },

      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

   }
   ```

1. `npx sequelize-cli db:migrate` – применяем миграции, чтобы создать таблицы  
   `npx sequelize-cli db:migrate:undo:all` – если нужно отменить все миграции

В корень проекта нужно добавить файл .babelrc с таким содержимым:

## Создание сидов

1.  `npx sequelize seed:generate --name users` – сгенерировать сид
npx sequelize seed:generate --name users
npx sequelize seed:generate --name contacts
npx sequelize seed:generate --name sexes
npx sequelize seed:generate --name sizes
npx sequelize seed:generate --name colors
npx sequelize seed:generate --name brands
npx sequelize seed:generate --name sneakers
npx sequelize seed:generate --name comments
npx sequelize seed:generate --name likes
npx sequelize seed:generate --name images
npx sequelize seed:generate --name baskets
npx sequelize seed:generate --name statuses
npx sequelize seed:generate --name orders
npx sequelize seed:generate --name orderLines
2.  `npx sequelize db:seed:all` – применить все сиды
3.  `npx sequelize db:seed:undo:all` – отменить все сиды

## Сервер

1. `npm i express` – установка Express

   ```Javascript
   const express = require('express')

   const app = express()

   const PORT = 3000

   app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))
   ```

1. `npm i morgan` – установка Morgan

   ```Javascript
   const morgan = require("morgan")

   app.use(morgan("dev"))
   ```

1. `npm i -D nodemon` – установка Nodemon
1. Читать данные из тела запросов
   ```Javascript
   app.use(express.urlencoded({ extended: true }))
   ```
1. Читать JSON-данные из тела запроса
   ```Javascript
   app.use(express.json())
   ```

## Виды ответов сервера

```Javascript
res.send(text) // Послать текст с кодом 200 + завершить ответ

res.json( { user: 'tobi'} ) // Послать json с кодом 200 + завершить ответ

res.end() // Завершить ответ

res.status(403) // Установить код, но не завершить ответ

res.redirect('/other-route') // Переадресовать клиента + завершить ответ

res.write(data) // Отправка части ответа, но не завершает ответ
```

## Router

```Javascript
const studentsRouter = require('./routes/students.route.js');

app.use('/students', studentsRouter);
```

```Javascript
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('GET-запрос к маршруту /students');
});

router.post('/', (req, res) => {
  res.send('POST-запрос к маршруту /students');
});

module.exports = router;
```
