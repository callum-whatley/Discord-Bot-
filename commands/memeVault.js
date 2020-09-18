const Discord = require('discord.js');
const SQLite = require('better-sqlite3');
const sql = SQLite('../mdb.sqlite');
const client = new Discord.Client();

module.exports = msg => {

    let sizeSQL = sql.prepare("SELECT COUNT(*) FROM mdb WHERE channel = ?").get(msg.channel.name);
    let size = Object.values(sizeSQL);
    let args = msg.content.substring(1).split(" ");
    args = args.splice(1);
    //Handles no argument errors
    if(!args[0])
        return msg.reply('No arguments provided');

    //Continues parsing msg for memevault options and potential meme urls
    const option = args[0];
    args = args.splice(1);
    const meme = args[0];

    client.getMeme = sql.prepare("SELECT * FROM mdb WHERE channel = ?");
    client.setMeme = sql.prepare("INSERT OR REPLACE INTO mdb (id, user, channel, meme) VALUES (@id, @user, @channel, @meme);");
    client.delMeme = sql.prepare(`DELETE FROM mdb WHERE meme = ?`).run(meme);
    let memeInfo = client.getMeme.get(msg.channel.name);
    let memeArr = sql.prepare("SELECT meme FROM mdb WHERE channel = ?").all(msg.channel.name);
    switch(option){
        case 'add': 
            //if the memeDB.json doesn't already contain the meme it will create it adding the provided meme
            if (!memeInfo || meme != memeInfo.meme) {
                memeInfo = {
                    id: msg.author.id,
                    user: msg.author.username,
                    channel: msg.channel.name,
                    meme: meme
                };
                
                msg.reply('Meme has been added to the vault');
            }else {
                msg.reply('Meme is already in vault');
            }
                
            break;
        case 'remove':
            try {
                sql.prepare(`DELETE FROM mdb WHERE meme = ?`).run(meme);
                msg.reply('Meme has been removed from the vault');
                break;
            }catch(error){
                console.log(error);
                break;
            }
        case 'print':
            //Checks if the size is empty
            if(size == 0)
                msg.reply('memeVault is empty');
            //Creates a string for the list of memes to be added to
            let memes = '';
            //Appends the memeUrl for each entry to the meme string
            for(let i = 0; i < size; i++){
                memes += (`${Object.values(memeArr[i])}` + '\n');
            }
            msg.channel.send(memes);
            break;
        case 'size':
            msg.reply(`There is currently ${size} meme(s) stored in the vault`);
            break;
        case 'meme':
            //Sends the channel a random meme from the vault
            let random = Math.floor((Math.random() * size));
            while(!(memeArr[random])) {
                random = Math.floor((Math.random() * size));
            }
            msg.channel.send(`${Object.values(memeArr[random])}`);
            break;
    }
    client.setMeme.run(memeInfo);
}