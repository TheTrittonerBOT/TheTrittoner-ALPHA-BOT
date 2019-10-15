const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  
  let p = '/'
  let arg = args.slice(0).join(' ');
  
  if (!arg[0]) {
  const embed = new Discord.RichEmbed()
  .setTitle('Yardım Menüsü')
  .setDescription(`:white_small_square: \`t!yardım eğlence\` = Eğlence ve Kullanıcı Komutlarını Listeler. \n\n:white_small_square: \`t!yardım moderasyon\` = Moderasyon Komutlarını Listeler. \n\n:white_small_square: \`t!yardım kullanıcı\` = Kullanıcı Komutlarını Listeler.  `)
  message.channel.send({embed})
  }
   if (arg === 'eğlence' || arg === '1') {
  const embed = new Discord.RichEmbed()
  .setTitle('Eğlence  Komutları')
  .setDescription(`:white_small_square: \`t!ara155\` = Polisi Arar. \n:white_small_square: \`t!ascii\` = Ascii olarak yazarsınız. \n:white_small_square: \`t!slots\` =Slots Oyunu Oynarsınız. \n:white_small_square: \`t!boks-makinası\` =Boks Makinesi Oyunu Oynarsınız. \n:white_small_square: \`t!herkesebendençay\` = Herkese Çay Ismarlarsınız. \n:white_small_square: \`t!çayiç\` = Çay İçersiniz. \n:white_small_square: \`t!wwegif\` = WWE Gifi Atar. \n:white_small_square: \`t!stresçarkı\` = Stres Çarkı Çevirirsin. \n:white_small_square: \`t!simit\` = Simit Yersiniz.   \n:white_small_square: \`t!ping\` = Botun Pingini Gösterir. \n:white_small_square: \`t!fbi\` = FBI Gifi Atar. \n:white_small_square: \`t!wasted\` = Profilinize Wasted Efekti Ekler. \n`)
  message.channel.send(embed)
  }
  if (arg === 'moderasyon' || arg === '2') {
      const embed = new Discord.RichEmbed()
      .setTitle('Moderasyon Komutları:')
      .setDescription(` :white_small_square: \`t!otorol\` = Sunucu için otorol ayarlar. \n:white_small_square: \`t!sayaç-ayarla\` = Sunucu için sayaç ayarlar. \n:white_small_square: \`t!hazır-sunucu\` = Hazır Sunucu Kurar (Dikkat Edilmeli) . \n:white_small_square: \`t!küfür-engelle [aç-kapat]\` = Küfürü Engeller. \n:white_small_square: \`t!link-engelle [aç-kapat]\` = Link Engeller.  \n:white_small_square: \`t!oylama\` = Oylama Yapar. \n:white_small_square: \`t!slowmode\` = Yavaş Modu Açar. \n:white_small_square: \`t!sil\` = İstediniz Kadar Mesaj Siler. \n:white_small_square: \`t!mute\` = İstediğiniz Kişiyi Geçici Olarak Susturursunuz.`)
      return message.channel.send(embed);
}
   if (arg === 'kullanıcı' || arg === '2') {
      const embed = new Discord.RichEmbed()
      .setTitle('Kullanıcı Komutları:')
      .setDescription(`:white_small_square: \`t!yaz\` = Bota İstediğiniz Şeyi Yazdırırsınız. \n:white_small_square: \`t!sunucuresmi\` = Sunucu Resmini Atar. \n:white_small_square: \`t!mesajat\` = Bot Kullanıcıya Özelden istediğiniz Mesajı Atar. \n:white_small_square: \`t!yetkilerim\` = Yetkilerinizi Gösterir. \n:white_small_square: \`t!kullanıcıbilgim\` = Bilgilerinizi Gösterir. \n:white_small_square: \`t!ping\` = Botun Pingini Gösterir.  \n:white_small_square: \`t!sunucubilgi\` = Sunucu Hakkında Bilgi Verir. \n:white_small_square: \`t!afk [sebep]\` = AFK Olursunuz. `)   
      return message.channel.send(embed);
}

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım','help','y'],
  permlevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Gelişmiş Yardım Menüsü',
  usage: 'yardım'
};
