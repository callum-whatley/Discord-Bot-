module.exports = msg => {
    const outcome = parseInt((Math.random() * 6) + 1);
    switch(outcome){
        case 1:
            msg.reply('Maybe someday.');
            break;
        case 2:
            msg.reply('Follow the seahorse.');
            break;
        case 3:
            msg.reply('I dont think so.');
            break;
        case 4:
            msg.reply('No.');
            break;
        case 5:
            msg.reply('Yes.');
            break;
        case 6:
            msg.reply('Try asking again.');
            break;
    }
}