const telegramApi = require('node-telegram-bot-api');

const token = '6376731335:AAET5cJDyNJl5og5-FXbdgDXzIkLkJEhlfc'; // токен из нашего чат бота

const bot = new telegramApi(token, { polling: true });





// 1) Инициализация проекта
// npm init -y

// 2) Устанавливаем первый пакет:
// npm i node-telegram-bot-api

// 3) Для комфортной разработки для автоматической перезагрузки сервера при каждом изменений в коде:
// npm i nodemon



// "scripts": {
//     "dev": "nodemon index.js", // Для разработки
//     "start": "node index.js"   // Для продакшн
// },