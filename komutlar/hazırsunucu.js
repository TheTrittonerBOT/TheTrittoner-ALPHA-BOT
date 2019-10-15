const Discord = require('discord.js');

exports.run = (client, message, args) => {
     if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send("** Yetkin bulunmuyor.**");
    message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Komut Girişi').setDescription('Gerekli Dosaylar Kurulsunmu?.').setFooter('Bu eylemi onaylıyorsan "evet" yazman yeterlidir.Bu eylem 30 saniye içinde sona erecek'))
.then(() => {
message.channel.awaitMessages(response => response.content === 'evet', {
max: 1,
time: 30000,
errors: ['time'],
})
.then((collected) => {

             
             

         

             message.guild.createChannel(`SUNUCU`, 'category')
          message.guild.createChannel(`log chat`);
          message.guild.createChannel(`Bot Ayarlar`);

             message.guild.createChannel(`YETKİLİ`, 'category')
          message.guild.createChannel(`Yetkili Sohbet`);
          message.guild.createChannel(`Yetkili Kurallar`);
          message.guild.createChannel(`moderasyon`);

             message.guild.createChannel(`KAYIT`, 'category')
          message.guild.createChannel(`Kayıt`);
          message.guild.createChannel(`Kayıt destek`);

             message.guild.createChannel(`Welcome&See you`, 'category');
          message.guild.createChannel(`Welcome`);
          message.guild.createChannel(`See you  `);

             message.guild.createChannel(`YAZI KANALLARI`, 'category');
          message.guild.createChannel(`Sohbet`);
          message.guild.createChannel(`komut`);
          message.guild.createChannel(`rank`);

             message.guild.createChannel(`BİLGİLENDİRME`, 'category');
          message.guild.createChannel(`Kurallar`);
          message.guild.createChannel(`Duyurular`);
          message.guild.createChannel(`Rank Duyuru`);  
         
             message.guild.createChannel(`Kurucu`, 'category')
          message.guild.createChannel(`Kurucu `, 'voice');
          message.guild.createChannel(`Lider`, 'voice');
          message.guild.createChannel(`Admin`, 'voice');
          message.guild.createChannel(`Moderatör`, 'voice');
          message.guild.createChannel(`Rehber`, 'voice');
             message.guild.createChannel(`Özel Sohbet`, 'category')
          message.guild.createChannel(`Dost`, 'voice');
          message.guild.createChannel(`Vip`, 'voice');
          message.guild.createChannel(`Bayan Üye`, 'voice');

             message.guild.createChannel(`SOHBET ODALARI`, 'category')
          message.guild.createChannel(`Sohbet Odası`, 'voice');
          message.guild.createChannel(`Sohbet Odası 2`, 'voice');

             message.guild.createChannel(`MÜZİK ODALARI`, 'category')
          message.guild.createChannel(`Müzik Odası`, 'voice');
          message.guild.createChannel(`Müzik Odası 2`, 'voice');

             message.guild.createChannel(`AFK`, 'category')
          message.guild.createChannel(`AFK`, 'voice');
          message.guild.createRole({
                name: 'Kurucu',
                color: 'RED',
                  })       
                .then(async (newRole) => {
                await message.member.addRole(newRole)
                  })    
          message.guild.createRole({
                name: 'Lider',
                color: 'YELLOW',
                  })
                .then(async (newRole) => {
                await message.member.addRole(newRole)
                  }) 
          message.guild.createRole({
                name: 'Admin',
                color: 'ORANGE',
                  })
                .then(async (newRole) => {
                await message.member.addRole(newRole)
                  })
          message.guild.createRole({
                name: 'MODERATÖR',
                color: 'GREEN',
                  })
                .then(async (newRole) => {
                await message.member.addRole(newRole)
                  })
          message.guild.createRole({
                name: 'Üye',
                color: 'BLUE',
                  })
                .then(async (newRole) => {
                await message.member.addRole(newRole)
                  })
        
        message.channel.send(`**Gerekli Kanalları Oluşturdum.**`);
    });
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'hazır-sunucu',
  description: 'Bot İçin gerekli kanlları kurar.',
  usage: '!sunucukurulum'
};