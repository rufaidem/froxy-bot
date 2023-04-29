const sequelize = require('../db')
const { Sequelize, DataTypes } = require('sequelize');

const checkOrCreate = async (table, username, id) => {
    const checkField = await sequelize.query(`SELECT * FROM ${table}s WHERE username='${username}'`)
    if (checkField[0].length === 0) {
        const insertQr= await sequelize.query(`INSERT INTO ${table}s (username, userId) VALUES ('${username}', '${id}')`)
    }
}

module.exports = checkOrCreate