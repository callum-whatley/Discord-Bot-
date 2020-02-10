const kick = require('../commands/kick');
const conch = require('../commands/conch');
const bruh = require('../commands/bruh');
const help = require('../commands/help');
const memeVault = require('../commands/memeVault');
const lvler = require('./levelHandler');
const rank = require('../commands/rank')
const fs = require("fs");
let db = JSON.parse(fs.readFileSync("database.json", "utf8"))




module.exports = (client, msg) => {
    //Passes msg to levelHandler.js
    lvler(msg);
    //Checks that the msg starts with !
    if (msg.content.startsWith("!")) {
        //Parses msg for cmd and arg tokens
        let args = msg.content.substring(1).split(" ");
        const cmd = args[0];
        args = args.splice(1);

        switch(cmd.toLowerCase()){
            case 'ping':
                msg.reply('Pong!');
                break;
            case 'kick':
                if(msg.member.hasPermission("ADMINISTRATOR")){
                   return kick(msg);
                }else {
                    msg.reply('You do not have permission to kick members')
                }
                break;
            case 'rank':
                rank(msg);
                break;
            case 'bruh':
                bruh(msg);
                break;
            case 'conch':
                conch(msg);
                break;
            case 'help':
                help(msg);
                break;
            case 'memevault':
                memeVault(msg);
                break;
        }
    }
}