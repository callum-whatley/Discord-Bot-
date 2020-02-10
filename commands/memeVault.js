const fs = require('fs');
let db = JSON.parse(fs.readFileSync("memeDB.json", "utf8"));
//Current Size of the memeVault
let size = Object.keys(db).length;



module.exports = msg => {

    let args = msg.content.substring(1).split(" ");
    args = args.splice(1);

    //Handles no argument errors
    if(!args[0])
        return msg.reply('No arguments provided');
    
        

    //Continues parsing msg for memevault options and potential meme urls
    const option = args[0];
    args = args.splice(1);
    const meme = args[0];

    //Increases size if meme argument is provided
    if(meme) 
        size += 1;

    switch(option){
        case 'add': 
            //if the memeDB.json doesn't already contain the meme it will create it adding the provided meme
            if (!db[msg.channel.name + size]) db[msg.channel.name + size] = {
                userName: msg.author.username,
                memeUrl: meme
            };
            msg.reply('Meme has been added to the vault');
            break;
        case 'remove':
            try {
                delete db[msg.channel.name + meme];
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
            for(let i = 1; i <= size; i++){
                memes += (`${db[msg.channel.name + `${i}`].memeUrl}` + '\n');
            }
            msg.channel.send(memes);
            break;
        case 'size':
            msg.reply(`There is currently ${size} memes stored in the vault`);
            break;
        case 'meme':
            //Sends the channel a random meme from the vault
            let random = Math.floor((Math.random() * size) + 1);
            while(!(db[msg.channel.name + `${random}`].memeUrl)) {
                random = Math.floor((Math.random() * size) + 1);
            }
            msg.channel.send(`${db[msg.channel.name + `${random}`].memeUrl}`);
            break;
    }
    //Writes changes to the memeDB.json
    fs.writeFile("./memeDB.json", JSON.stringify(db), (x) => {
        if (x) 
            console.error(x);
    });
}