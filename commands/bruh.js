module.exports = msg => {
    const member = msg.mentions.members.first();
    if(!member) {
        return msg.reply('User does not exist');
    }
    msg.channel.send(`${member.user} SQUARE UP BRUH`);
}