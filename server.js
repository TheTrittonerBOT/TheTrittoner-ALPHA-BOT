const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.on("message", msg => {
  const kzgn = client.emojis.get("512302904141545509");
  const embedlul = new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setDescription(msg.author + " Reklam Yasak Bunu Bilmiyormusun!");

  const embedlulz = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " reklam yapıyor!")
    .setColor(0x00ae86)
    .setDescription(
      "c!uyar <kişi> komutu ile onu uyarabilir ya da c!kick <kişi> veya c!ban <kişi> komutlarını kullanarak onu sunucudan uzaklaştırabilirsin!"
    )
    .addField("Kullanıcının mesajı:", "**" + msg.content + "**");

  if (
    msg.content
      .toLowerCase()
      .match(/(discord\.gg\/)|(discordapp\.com\/invite\/) (htpp)/g) &&
    msg.channel.type === "text" &&
    msg.channel
      .permissionsFor(msg.guild.member(client.user))
      .has("MANAGE_MESSAGES")
  ) {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
      return;
    } else {
      msg
        .delete(30)
        .then(deletedMsg => {
          deletedMsg.channel.send(embedlul);
          msg.guild.owner.send(embedlulz).catch(e => {
            console.error(e);
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//////////////sa-as

client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("**Aleyküm Selam Hoş Geldin!**");
  }
});

////////////////////////

client.on("guildMemberAdd", member => {
  let guild = member.guild;

  const channel = member.guild.channels.find("name", "welcome");
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(":inbox_tray: | Sunucuya katıldı!")
    .setTimestamp();
  channel.sendEmbed(embed);
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.find("name", "welcome");
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(":outbox_tray: | Sunucudan ayrıldı")
    .setTimestamp();
  channel.sendEmbed(embed);
});

////////////////////////

client.on("message", msg => {
  const uyarıembed = new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setDescription(
      ":crown: " +
        msg.author +
        "Reklam Yapmayı Kes Seni Yetkililere Söyledim :angry: :rage: "
    );

  const dmembed = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " reklam yapıyor!")
    .setColor(0x00ae86)
    .setDescription(
      " " +
        msg.author.tag +
        " Sunucunda Reklam Yapıyor t!ban Komutu İle Kişiyi Banlayabilirsin "
    )
    .addField("Kullanıcının mesajı:", "**" + msg.content + "**");

  if (
    msg.content
      .toLowerCase()
      .match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g) &&
    msg.channel.type === "text" &&
    msg.channel
      .permissionsFor(msg.guild.member(client.user))
      .has("MANAGE_MESSAGES")
  ) {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
      return;
    } else {
      msg
        .delete(30)
        .then(deletedMsg => {
          deletedMsg.channel.send(uyarıembed);
          msg.guild.owner.send(dmembed).catch(e => {
            console.error(e);
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//////////küfür-engel

let kufurEngel = JSON.parse(
  fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8")
);
client.on("message", msg => {
  if (!msg.guild) return;
  if (!kufurEngel[msg.guild.id]) return;
  if (kufurEngel[msg.guild.id].küfürEngel === "kapali") return;
  if (kufurEngel[msg.guild.id].küfürEngel === "acik") {
    const kufur = [
      "mk",
      "amk",
      "aq",
      "orospu",
      "oruspu",
      "oç",
      "sikerim",
      "yarrak",
      "piç",
      "amq",
      "sik",
      "amcık",
      "çocu",
      "sex",
      "seks",
      "amına",
      "orospu çocuğu",
      "sg",
      "siktir git"
    ];
    if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg
          .reply("Küfür filtresi, aktif!")
          .then(message => message.delete(3000));
      }
    }
  }
});

///////////////////////giriş çıkış

client.on("guildMemberAdd", async member => {
  const fs = require("fs");
  let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
  const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim);
  if (!gözelkanal) return;
  let username = member.user.username;
  if (gözelkanal === undefined || gözelkanal === null) return;
  if (gözelkanal.type === "text") {
    const bg = await Jimp.read(
      "https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png"
    );
    const userimg = await Jimp.read(member.user.avatarURL);
    var font;
    if (member.user.tag.length < 15)
      font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    else if (member.user.tag.length > 15)
      font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    await bg.print(font, 430, 170, member.user.tag);
    await userimg.resize(362, 362);
    await bg.composite(userimg, 43, 26).write("./img/" + member.id + ".png");
    setTimeout(function() {
      gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
    }, 1000);
    setTimeout(function() {
      fs.unlink("./img/" + member.id + ".png");
    }, 10000);
  }
});

client.on("guildMemberRemove", async member => {
  const fs = require("fs");
  let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
  const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim);
  if (!gözelkanal) return;
  let username = member.user.username;
  if (gözelkanal === undefined || gözelkanal === null) return;
  if (gözelkanal.type === "text") {
    const bg = await Jimp.read(
      "https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png"
    );
    const userimg = await Jimp.read(member.user.avatarURL);
    var font;
    if (member.user.tag.length < 15)
      font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    else if (member.user.tag.length > 15)
      font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    await bg.print(font, 430, 170, member.user.tag);
    await userimg.resize(362, 362);
    await bg.composite(userimg, 43, 26).write("./img/" + member.id + ".png");
    setTimeout(function() {
      gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
    }, 1000);
    setTimeout(function() {
      fs.unlink("./img/" + member.id + ".png");
    }, 10000);
  }
});

///////////////////

client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let arole = otorole[member.guild.id].sayi;
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("Otorol Sistemi")
    .setDescription(
      `:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `
    )
    .setColor("GREEN")
    .setFooter("CHYPER", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});

client.on("guildMemberAdd", async member => {
  let autorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let role = autorole[member.guild.id].sayi;

  member.addRole(role);
});

//////////////////sayaç

client.on("message", async message => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  if (sayac[message.guild.id]) {
    if (sayac[message.guild.id].sayi <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setDescription(
          `Tebrikler, başarılı bir şekilde ${sayac[message.guild.id].sayi} kullanıcıya ulaştık!`
        )
        .setColor("0x808080")
        .setTimestamp();
      message.channel.send({ embed });
      delete sayac[message.guild.id].sayi;
      delete sayac[message.guild.id];
      fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), err => {
        console.log(err);
      });
    }
  }
});
client.on("guildMemberRemove", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("")
    .setDescription(``)
    .setColor("RED")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: ${member.user.tag}, aramızdan ayrıldı, \**${
        sayac[member.guild.id].sayi
      }\** kişi olmamıza \**${sayac[member.guild.id].sayi -
        member.guild.memberCount}\** kişi kaldı!`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});
client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("")
    .setDescription(``)
    .setColor("GREEN")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: ${member.user.tag}, aramıza katıldı **${
        sayac[member.guild.id].sayi
      }** kişi olmamıza **${sayac[member.guild.id].sayi -
        member.guild.memberCount}** kişi kaldı!`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});

//////////////otorol

client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let arole = otorole[member.guild.id].sayi;
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("Otorol Sistemi")
    .setDescription(
      `:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `
    )
    .setColor("GREEN")
    .setFooter("Gnarge", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});

client.on("guildMemberAdd", async member => {
  let autorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let role = autorole[member.guild.id].sayi;

  member.addRole(role);
});

/////////////sunucu-panel

client.on("message", async message => {
  const ms = require("ms");
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "stattemizle") {
    if (
      !message.guild.channels.find(
        channel => channel.name === "Sunucu İstatistik"
      )
    )
      return message.channel.send(" İstatistik ayarlanmamış.");
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(" Yetkin bulunmuyor.");
    const a = message.guild.channels
      .find(channel => channel.name === "Sunucu İstatistik")
      .delete();
    if (!a) return console.log("guildStats");
    const b = message.guild.channels
      .find(
        channel => channel.name === `Üye sayısı: ${message.guild.memberCount}`
      )
      .delete();
    if (!b) return console.log("guildStatsMember");
    const c = message.guild.channels
      .find(
        channel =>
          channel.name ===
          `Bot sayısı: ${message.guild.members.filter(m => m.user.bot).size}`
      )
      .delete();
    if (!c) return console.log("guildStatsBot");
    const d = message.guild.channels
      .find(
        channel =>
          channel.name === `Kanal sayısı: ${message.guild.channels.size}`
      )
      .delete(); //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
    if (!d) return console.log("guildStatsChannel");
    message.channel.send(" Kanallar temizlendi.");
  }
  if (command === "statayarla") {
    if (
      message.guild.channels.find(
        channel => channel.name === "server statistics"
      )
    )
      return message.channel.send(" Zaten istatistik ayarlanmış.");
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(" Yetkin bulunmuyor.");
    message.channel.send(
      `Kategori ve kanal kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
    );
    message.channel
      .awaitMessages(response => response.content === "evet", {
        max: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(collected => {
        message.guild.createChannel("server statistics", "category", [
          {
            id: message.guild.id,
            deny: ["CONNECT"],
            deny: ["VIEW_CHANNEL"]
          }
        ]);

        message.guild
          .createChannel(`Üye sayısı: ${message.guild.memberCount}`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "server statistics"
              )
            )
          );
        message.guild
          .createChannel(
            `Bot sayısı: ${message.guild.members.filter(m => m.user.bot).size}`,
            "voice"
          )
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "server statistics"
              )
            )
          );
        message.guild
          .createChannel(
            `Kanal sayısı: ${message.guild.channels.size}`,
            "voice"
          )
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "server statistics"
              )
            )
          );
        message.channel.send(" Sunucu paneli ayarlandı!");
      });
  }
});

//////////////////botun dm görme

client.on("message", message => {
  const dmchannel = client.channels.find("name", "dm-log");
  if (message.channel.type === "dm") {
    if (message.author.bot) return;
    dmchannel.sendMessage("632719881787277320", {
      embed: {
        color: 3447003,
        title: `Gönderen: ${message.author.tag}`,
        description: `Bota Özelden Gönderilen DM: ${message.content}`
      }
    });
  }
});

///////////link-engel
let linkEngel = JSON.parse(
  fs.readFileSync("././jsonlar/linkEngelle.json", "utf8")
);
client.on("message", msg => {
  if (!linkEngel[msg.guild.id]) return;
  if (linkEngel[msg.guild.id].linkEngel === "kapali") return;
  if (linkEngel[msg.guild.id].linkEngel === "acik") {
    var regex = new RegExp(
      /(discord.gg|http|.gg|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/
    );
    if (regex.test(msg.content) == true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete(5000));
        var e = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Link Engeli!")
          .setDescription(
            `Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Link atmana izin vermeyeceğim!`
          );
        msg.channel.send(e).then(message => message.delete(5000));
      }
    }
  }
});

///////////////hazır-sunucu

client.on("message", async message => {
  const ms = require("ms");
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "sunucu-kur") {
    if (
      message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
    )
      return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
    message.channel.send(
      `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
    );
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        " Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir."
      );
    message.channel
      .awaitMessages(response => response.content === "evet", {
        max: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(collected => {
        message.guild
          .createChannel("SUNUCU", "category", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])

          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "BİLGİLENDİRME"
              )
            )
          );
        message.guild.createChannel("Log-chat", "text", [
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES"]
          }
        ]);

        message.guild.createChannel("BİLGİLENDİRME", "category", [
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES"]
          }
        ]);

        message.guild
          .createChannel("kurallar", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])

          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "BİLGİLENDİRME"
              )
            )
          );
        message.guild
          .createChannel("duyurular", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "BİLGİLENDİRME"
              )
            )
          );
        message.guild
          .createChannel("gelen-giden", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "BİLGİLENDİRME"
              )
            )
          );
        message.guild
          .createChannel("sayaç", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])

          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "BİLGİLENDİRME"
              )
            )
          );
      })
      .then(collected => {
        message.guild.createChannel("YAZI KANALLARI", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`Sohbet`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "YAZI KANALLARI"
              )
            )
          );
        message.guild
          .createChannel(`Komut`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "YAZI KANALLARI"
              )
            )
          );
        message.guild
          .createChannel(`rank`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "YAZI KANALLARI"
              )
            )
          );
        message.guild
          .createChannel(`foto-video`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "YAZI KANALLARI"
              )
            )
          );

        message.guild
          .createChannel(`🏆》Kurucu Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "Kurucu");

            c.overwritePermissions(role, {
              CONNECT: false
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
          });

        message.guild.createChannel("YÖNETİCİ", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`Yönetici Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "YÖNETİCİ"
              )
            )
          )
          .then(c => {
            message.guild
              .createChannel(`Admin`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "YÖNETİCİ"
                  )
                )
              );
            message.guild
              .createChannel(`Moderatör`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "YÖNETİCİ"
                  )
                )
              );

            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "Kurucu");
            let role3 = message.guild.roles.find("name", "Yönetici");
            c.overwritePermissions(role, {
              CONNECT: false
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
            c.overwritePermissions(role3, {
              CONNECT: true
            });
          });

        message.guild.createChannel("SOHBET ODALARI", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`Sohbet Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "Sohbet Odaları"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: true
            });

            message.guild
              .createChannel(`Sohbet Odası 2`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "Sohbet Odaları"
                  )
                )
              );
          });

        message.guild.createChannel("MÜZİK ODALARI", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`Müzik Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "Müzik Odaları"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: false
            });

            message.guild
              .createChannel(`Müzik Odası 2`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "Müzik Odaları"
                  )
                )
              );
          });

        message.guild.createChannel("OYUN ODALARI", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`Minecraft`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "Sohbet Odaları"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: true
            });

            message.guild
              .createChannel(`League Of Legends`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "Sohbet Odaları"
                  )
                )
              );
          });

        message.guild.createRole({
          name: "Kurucu",
          color: "RED",
          permissions: ["ADMINISTRATOR"]
        });

        message.guild.createRole({
          name: "Yönetici",
          color: "BLUE",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
          ]
        });

        message.guild.createRole({
          name: "Moderatör",
          color: "GREEN",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
          ]
        });

        message.guild.createRole({
          name: "V.I.P",
          color: "00ffff"
        });

        message.guild.createRole({
          name: "Üye",
          color: "WHITE"
        });

        message.guild.createRole({
          name: "Bot",
          color: "ORANGE"
        });

        message.channel.send("Gerekli Odalar Kuruldu!");
      });
  }
});

//////////////////////bot eklenince msj yazma

client.on("guildDelete", guild => {
  let rrrsembed = new Discord.RichEmbed()

    .setColor("RED")
    .setTitle(" Bot Kickledi ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.get("Kanalİd").send(rrrsembed);
});

client.on("guildCreate", guild => {
  let rrrsembed = new Discord.RichEmbed()

    .setColor("GREEN")
    .setTitle(" Bot Eklendi ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.get("Kanalİd").send(rrrsembed);
});
