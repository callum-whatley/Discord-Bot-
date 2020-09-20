const Discord = require('discord.js');
const rankList = require('../commands/rankList');
const SQLite = require('better-sqlite3');
const sql = new SQLite('./db.sqlite');
const client = new Discord.Client();

module.exports = msg => {
    
    client.getInfo = sql.prepare("SELECT * FROM db WHERE user = ? AND guild = ?");
    const userInfo = client.getInfo.get(msg.author.username, msg.guild.id);
    let member = msg.mentions.members.first();
    //Creates a reply with User stats
    
    //If this message doesn't have a direct target it will target the msg's creator
    if(!member) {
        try{
            let embed = new Discord.RichEmbed()
            .setColor(0x4286f4)
            .addField("Level", userInfo.level)
            .addField("Rank", rankList(userInfo))
            .addField("XP", userInfo.xp+"/100");
            return msg.channel.send(embed);
        }catch(error){
             return console.log(error);
        }
    }else{
        //Checks that the targeted member has an entry in the memeVault
        let memberInfo = client.getScore.get(member.username, msg.guild.id);
        if(!memberInfo) 
            return msg.channel.send('No info');
        //Creates a reply with the targeted members stats
        let embed2 = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("Level", memberInfo.level)
        .addField("Rank", rankList(memberInfo))
        .addField("XP", memberInfo.xp+"/100");

        msg.channel.send(embed2);
    }
}