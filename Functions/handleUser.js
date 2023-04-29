const sequelize = require('../db')
const slugify= require('slugify')
const { Sequelize, DataTypes } = require('sequelize');
const checkOrCreate= require('./checkOrCreate')

const handleUser= async(ctx)=>{
    let slug= `${slugify(ctx.chat.title.split('-').join('_'), '_')}${ctx.chat.id.toString().split('-').join('_')}`
    if(await sequelize.isDefined(slug)){
        await checkOrCreate(slug, ctx.message.from.username, ctx.message.from.id)
    }else{
        await sequelize.define(
            slug,
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                userId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },{
                timestamps: false
            }
        )
        await sequelize.sync({ alter: true });
        await checkOrCreate(slug, ctx.message.from.username, ctx.message.from.id)
    } 
}

module.exports= handleUser;