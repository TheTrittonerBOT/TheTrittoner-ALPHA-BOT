 exports.run = (client, msg, args) => {
   let member = msg.mentions.members.first()
   if(!member)return msg.channel.send({embed: {
 color: Math.floor(Math.random() * (0xFFFFFF + 1)),
 description: ('Kimin Avatarına Bakmak İstiyon!')
}});
   const Discord = require('discord.js')
        const kullanicibilgimk = new Discord.RichEmbed()
        .setTitle(member.user.tag+" kullanıcısının profil fotoğrafı!")
        .setImage(member.user.avatarURL)
        .setFooter("naynbuckweet#3156", "https://cdn.discordapp.com/avatars/509337312547700754/512196d2ef1e12e2807cfd6e16f03a15.png?size=2048")
        return msg.channel.send(kullanicibilgimk);
    }
	
	
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "kullanıcı"
 };
 
 exports.help = {
 komut: 'avatar',
 description: 'Avatarınızı veya etiketlediğiniz kişinin avatarını atar.',
 usage: 'avatar & avatar [@Kişi]'
 }