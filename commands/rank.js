const fs = require("fs");
const Discord = require('discord.js');
let db = JSON.parse(fs.readFileSync("database.json", "utf8"));


module.exports = msg => {
    
    
    console.log(msg.author.id + msg.channel.name);
    
    let member = msg.mentions.members.first();
    //Creates a reply with User stats
    
    //If this message doesn't have a direct target it will target the msg's creator
    if(!member) {
        try{
            //let userInfo = db[msg.author.id + msg.channel.name];
            let embed = new Discord.RichEmbed()
            .setColor(0x4286f4)
            .addField("Level", db[msg.author.id + msg.channel.name].level)
            .addField("Rank", db[msg.author.id + msg.channel.name].rank)
            .addField("XP", db[msg.author.id + msg.channel.name].xp+"/100");
            return msg.channel.send(embed);
        }catch(error){
             return console.log(error);
        }
    }
    let memberInfo = db[member.id];
    //Checks that the targeted member has an entry in the memeVault
    if(!memberInfo) 
        return msg.channel.send('No info');
    //Creates a reply with the targeted members stats
    let embed2 = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("Level", memberInfo.level)
        .addField("Rank", memberInfo.rank)
        .addField("XP", memberInfo.xp+"/100");

    msg.channel.send(embed2);
}