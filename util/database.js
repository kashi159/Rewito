const Sequelize = require('sequelize');
require('dotenv').config();

const user = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const sequelize = new Sequelize('rewito' , user , password , {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;