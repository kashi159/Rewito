const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Resturant = sequelize.define('resturants', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
       type: Sequelize.STRING,
       allowNull: false
    } ,
    location:{
        type: Sequelize.STRING,
        allowNull: false
     } ,
     description:{
        type: Sequelize.STRING,
        allowNull: false
     }
})

module.exports = Resturant