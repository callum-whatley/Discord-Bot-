

module.exports = (userInfo, msg) => {
    //Creates an Array for the channels to assign to
    let rankList = [];
    //Assigns rankList values based on the messages origin channel
    switch(msg.channel.name){
        case 'general':
            rankList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
            break;
        case 'test':
            rankList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
            break;
    }
    //Assigns the user a rank base on level
    userInfo.rank = rankList[userInfo.level - 1];
}