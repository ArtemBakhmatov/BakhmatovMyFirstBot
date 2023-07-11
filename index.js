const telegramApi = require('node-telegram-bot-api');

const token = '6376731335:AAET5cJDyNJl5og5-FXbdgDXzIkLkJEhlfc'; // токен из нашего чат бота

const bot = new telegramApi(token, { polling: true });

const chats = {};

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}],
        ]
    })
}

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Играть еще раз', callback_data: '/again'}]
        ]
    })
}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен её угадать!');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

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
            return startGame(chatId);
        }

        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз!'); 
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
 
        if (data === '/again') {
            return startGame(chatId);
        }

        if (data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${chats[chatId]}`, againOptions);
        } else {
            return await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions); 
        }
    })
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