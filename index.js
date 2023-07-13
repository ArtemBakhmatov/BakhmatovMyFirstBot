const telegramApi = require('node-telegram-bot-api');

const { gameOptions, againOptions } = require('./options');
const sequelize = require('./db');
const UserModel = require('./models');

const token = '6376731335:AAET5cJDyNJl5og5-FXbdgDXzIkLkJEhlfc'; // токен из нашего чат бота

const bot = new telegramApi(token, { polling: true });
// polling - это клиент-серверная технология, которая позволяет нам получать обновления с серверов телеграма.

const chats = {};

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен её угадать!');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = async () => {
    try {
        await sequelize.authenticate(); // Авторизация
        await sequelize.sync();         // Синхронизация
    } catch (e) {
        console.log('Подключени к БД сломалось', e);
    }
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'}
    ]);
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {
                await UserModel.create({chatId});  // при подключении делаем запись в БД
                await bot.sendSticker(chatId, 'https://telegram.org.ru/uploads/posts/2017-03/1490220353_25.png');
                return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот Артема Бахматова`);
            }
            if (text === '/info') {
                const user = await UserModel.findOne({chatId}); // поиск по id
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}, в игре у тебя правильных ответов ${user.right}, неправильных ${user.wrong}`);
            }
            if (text === '/game') {
                return startGame(chatId);
            }
    
            return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз!'); 

        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая то ошибка!');
        }
    
        
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
 
        if (data === '/again') {
            return startGame(chatId);
        }

        const user = await UserModel.findOne({chatId});

        if (data == chats[chatId]) {
            user.right += 1;
            await bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${chats[chatId]}`, againOptions);
        } else {
            user.wrong += 1;
            await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions); 
        }

        await user.save(); // обновляем данные в БД
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