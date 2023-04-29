const { Telegraf } = require("telegraf");
const express = require("express");
const sprightly=  require('sprightly');
const path = require('path');
const expressApp = express();
require("dotenv").config();
const runBot= require('./bot');
const getStats = require("./Functions/getStats");

const token = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 5000;
const URL = process.env.URL || "https://froxy-bot.herokuapp.com";

expressApp.engine('spy', sprightly); // The one line you have to add
expressApp.set('views', './views'); // specify the views directory (its ./views by default)
expressApp.set('view engine', 'spy'); // register the template engine

const bot = new Telegraf(token);
bot.telegram.setWebhook(`${URL}/bot${token}`);
expressApp.use(bot.webhookCallback(`/bot${token}`));

bot.launch();
runBot(bot)


expressApp.get("/", async(req, res)=>{
    const data= await getStats() 
    let recordCount=parseInt(0);
    data.records.map(table =>{
        recordCount+= parseInt(table['SUM(TABLE_ROWS)'])
    })
    res.render('index.spy', {tables: data.tables, records: recordCount});
})
expressApp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));