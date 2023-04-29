const sequelize= require('../db')

const getStats= async()=>{
 const tCount= await sequelize.query(`SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '${process.env.DB_NAME}';`)
 const rCount= await sequelize.query(`SELECT SUM(TABLE_ROWS) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${process.env.DB_NAME}';`)
 return {
     tables: tCount[0][0]['COUNT(*)'],
     records: rCount[0]
 }
}

module.exports= getStats