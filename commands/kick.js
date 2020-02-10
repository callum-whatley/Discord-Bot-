module.exports = (msg) => {
    const member = msg.mentions.members.first();
                if(!member) {
                    return msg.reply('User does not exist');
                }
                if(!member.kickable){
                    return msg.reply('User cannot be kicked');
                }
                
                member.kick()
                .then(() => msg.reply(`${member.user.tag} was kicked.`))
                .catch(error => msg.reply('Sorry, an error occured.'))
}