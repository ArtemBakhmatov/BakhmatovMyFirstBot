const {DataTypes} = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('user', { // название таблицы user
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique: true},
    right: {type: DataTypes.INTEGER, defaultValue: 0},
    wrong: {type: DataTypes.INTEGER, defaultValue: 0},
})

module.exports = User;

// define('название таблицы', объкт);  define -> созадть
// DataTypes.INTEGER -> число
// DataTypes.STRING -> строка
// primaryKey -> первичный ключ
// autoIncrement -> автоинкремент
// unique -> уникальный