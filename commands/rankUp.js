

module.exports = (userInfo) => {
    //Creates an Array for the channels to assign to
    let rankList = ['Scrumslave', 'Script Kiddie', 'Big Brain', 'Boomer', 'Zoomer', 'Chaga Mushroom', 'Tegridy', 'ScrumMaster', 'Hackerman', 'Lord'];
    //Assigns the user a rank base on level
    return rank = rankList[userInfo.level - 1];
}