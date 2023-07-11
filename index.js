const telegramApi = require('node-telegram-bot-api');

const token = '6376731335:AAET5cJDyNJl5og5-FXbdgDXzIkLkJEhlfc'; // токен из нашего чат бота

const bot = new telegramApi(token, { polling: true });

const chats = {};

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'}
    ]);
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://telegram.org.ru/uploads/posts/2017-03/1490220353_25.png');
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот Артема Бахматова`);
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if (text === '/game') {
            await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен её угадать!');
            const randomNumber = Math.floor(Math.random() * 10);
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, 'Отгадывай');
        }

        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз!'); 
    });
}

start();




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