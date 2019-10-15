module.exports = member => {
    let username = member.user.username;
    member.sendMessage('Sunucuya Hoş Geldin **' + username + '** Eğleneceğini Düşünüyorum!');
};
