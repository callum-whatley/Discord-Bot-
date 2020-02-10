const fs = require("fs");
const rankUp = require('../commands/rankUp');
let db = JSON.parse(fs.readFileSync("database.json", "utf8"));

module.exports = msg => {
    
    // ignore bots
    if (msg.author.bot) 
        return; 

    // if the user is not on db add the user and change their values to 0
    if (!db[msg.author.id + msg.channel.name]) db[msg.author.id + msg.channel.name] = {
            xp: 0,
            level: 0,
            rank: 'Scrumslave'
        };

    let userInfo = db[msg.author.id + msg.channel.name];
    //Increases the XP of the User who sent the msg
    userInfo.xp++;
    //Level up handler
    if(userInfo.xp > 100) {
        //Checks for max level
        if(userInfo.level > 9){
            return msg.reply("You're already max level")
        }else {
            //Increases level and resets xp to 0
            userInfo.level++;
            userInfo.xp = 0;
            rankUp(userInfo, msg);
            msg.reply(`You've earned enough XP to level up in the ${msg.channel.name} channel and are now level ${userInfo.level}` + '\n' +
            `you are now a ${userInfo.rank}`);
        }
    }
    //Writes any changes to database.json
    fs.writeFile("./database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
    });
}

