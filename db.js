const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telegram_bot',         // Название БД
    'root',                 // Имя
    'root',                 // Пароль
    {                       // Опции
        host: '5.188.129.230',
        port: '5432',
        dialect: 'postgres' // используем БД postgres
    }
)