//get sequelize 
const Sequelize = require('sequelize')

//create db variabel
const db = {}

//create sequelize variabel and get config as obj
const sequelize = new Sequelize('dumb-merch', 'root',null, {
    host:'localhost',
    dialect:'mysql',
    logging:console.log,
    freezeTableName: true,

    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

//enter the database config to sequelize 
db.sequelize = sequelize

//create exports module db
module.exports = db