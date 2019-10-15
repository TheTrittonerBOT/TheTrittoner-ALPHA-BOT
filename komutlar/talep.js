const Discord = require('discord.js');

exports.run = (client, message, args) => {
 message.delete();
    message.guild.createChannel(`TALEP${message.author.username}`, 'text').then(ch => {
        ch.overwritePermissions(message.member.roles.first(),{
            VIEW_CHANNEL: false,
        }).catch()
        message.guild.roles.forEach((role) => {
            if (role.hasPermission("BAN_MEMBERS")) {
                ch.overwritePermissions(role,{
                    VIEW_CHANNEL: true,
                }).catch()
                ch.overwritePermissions(message.author.id,{
                    VIEW_CHANNEL: true,
                }).catch()
            }
        })

        const embed = new Discord.RichEmbed()
        .setTitle(`» Hey ${message.author.username} !`)
        .setAuthor("Destek Sistemi")
        .setDescription("**Destek Ekibimiz Sizinle İlgilenecektir.\nDestek talebini iptal etmek için [t!iptal](https://discord.gg/eEbKXxX) yazabilirsin!**")
        .setFooter('Destek Sistemi', client.user.avatarURL)
        .setTimestamp()
        ch.send(embed).catch()
        ch.send("@Destek ekibi")
        ch.send("@here")
        ch.awaitMessages((msg)=> {
            if (msg.content === "t!iptal") {
                ch.send("`Talebiniz iptal ediliyor!`").then(()=>{
                    setTimeout(()=> {
                        ch.delete().catch()
                    },1000)
                });
            }
        },{time:86400000})
    })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['talep'],
  permLevel: 0,
  kategori: "sunucu",
};

exports.help = {
  komut: 'talep',
  description: 'Destek talebi açar.',
  usage: '/talep'
};