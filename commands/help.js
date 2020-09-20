module.exports = msg => {
    let args = msg.content.substring(1).split(" ");
    args = args.splice(1);
    const option = args[0];
    if(!option){
        msg.reply('\nBruhBot Command List' + '\n' +
                '!conch Question - Ask the Magic Conch a question and receive its wisdom' + '\n' +
                '!kick @UserName - Attempt to kick @Username' + '\n' +
                '!bruh @Username - Bruh' + '\n' +
                '!memeVault [add|remove|print|size|meme] [position|link|list] - A collection of memes that is available for all to use' + '\n' +
                '!rank - Check your current XP and level' + '\n' +
                '!help [cmd] to get more information about a command and its options');
    }else{
        switch(option){
            case 'conch':
                msg.reply('The conch command allows you to ask the Magical Conch any question your heart desires' + '\n' +
                'Syntax: !conch question');
                break;
            case 'kick':
                msg.reply('The kick command will attempt to remove the provided username from the server, this command will fail if the username provided is not kickable' + '\n' +
                'Syntax: !kick @username');
                break;
            case 'bruh':
                msg.reply('The bruh command will attempt to tell you opponent to get ready for a verbal jousting, if no username is provided the person who issued the command will be warned' + '\n' +
                'Syntax: !bruh @username');
                break;
            case 'memeVault':
                msg.reply('The memeVault command allows a user to interact with a channels vault of memes, there are several options for interacting with the vault such as:' + '\n' +
                'add: This option allows a user to add a meme to the vault by providing a working link to the meme' + '\n' +
                'Syntax: !memeVault add meme' + '\n' +
                'remove: This option allows a user to remove a meme from the vault by providing the link to the meme' + '\n' +
                'Syntax: !memeVault remove meme' + '\n' +
                'print: This option allows a user to view the current contents of the vault, if the user just wants to view a list of the links they may provide the sub-obtion list, alternatively if the user wishes to view a specific meme they must provide the position of the meme in the vault' + '\n' +
                'Syntax: !memeVault print [position|list]' + '\n' +
                'size: This option allows a user to view the current size of the vault' + '\n' +
                'Syntax: !memeVault size' + '\n' +
                'meme: This option allows the bot to choose a random meme from the vault' + '\n' +
                'Syntax: !memeVault meme');
                break;
            case 'rank':
                msg.reply('The rank command allows a user to check their rank on the server or the rank of another user' + '\n' +
                'Syntax: !rank [username]');
                break;
        }
    }
}