const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/./config/config.js')[env];
const { Sequelize } = require('sequelize');



const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;