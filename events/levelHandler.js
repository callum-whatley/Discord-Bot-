const rankUp = require('../commands/rankList');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./db.sqlite');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = msg => {

    // And then we have two prepared statements to get and set the score data.
    client.getXP = sql.prepare("SELECT * FROM db WHERE user = ? AND guild = ?");
    client.setXP = sql.prepare("INSERT OR REPLACE INTO db (id, user, guild, xp, level) VALUES (@id, @user, @guild, @xp, @level);");

    // ignore bots
    if (msg.author.bot) 
        return; 
    let userInfo;
    if (msg.guild) {
        userInfo = client.getXP.get(msg.author.username, msg.guild.id);
        if (!userInfo) {
            userInfo = { 
                id: `${msg.guild.id}-${msg.author.id}`, 
                user: msg.author.username, 
                guild: msg.guild.id, 
                xp: 0, 
                level: 1 
            }
        }
        userInfo.xp++;
        
        if(userInfo.xp > 100) {
            //Checks for max level
            if(userInfo.level > 9){
                return msg.reply("You're already max level")
            }else {
                //Increases level and resets xp to 0
                userInfo.level++;
                userInfo.xp = 0;
                
                msg.reply(`You've earned enough XP to level up in the ${msg.channel.name} channel and are now level ${userInfo.level}` + '\n' +
                `you are now a ${rankUp(userInfo)}`);
            }
        }
        client.setXP.run(userInfo);
    }
}

