const Discord = require('discord.js');
module.exports = {
	name: 'kick',
	description: '',
	execute(msg, args) {
        if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send("Bạn Nghĩ Bạn Là Ai Mà Được Kick");
        let toKick = msg.mentions.members.first();
        let ing = args.slice(1).join(" ");
        let reason = args.slice(2).join(" ");
        if(!args[0]) return msg.channel.send('Hãy Tag Người Bạn Muốn Kick');
        if(!toKick) return msg.channel.send(`${args[0]} Thằng Này Không Tồn Tại.`);
        if(!ing) return msg.channel.send('Hãy Thêm Tên Ing');
        if(!reason) return msg.channel.send('Hãy Thêm Lý Do');

        if(!toKick.kickable)
        {
           return msg.channel.send('Cọng Lông Mà Mày Đòi Bằng Dao ?');
        }

        if(toKick.kickable)
        {
            const exampleEmbed = new Discord.MessageEmbed()
                .setTitle('Kick')
                .addField('Thành Viên Bị Kick', toKick)
                .addField('Ing / Lý Do', ing)
                .addField('Bị Kick Bởi', msg.author)
                .addField('Thời Gian', msg.createdAt)
                .setColor(0x6509ed);
                msg.channel.send(exampleEmbed);
                toKick.kick();
        }
	},
};