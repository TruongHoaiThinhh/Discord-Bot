const Discord = require('discord.js');

module.exports = {
	name: 'crit',
	description: '',
	execute(msg) {
            const tinhcrit = new Discord.MessageEmbed()
    	.setColor('#0099ff')
    	.setTitle('CÁCH TÍNH CRIT')
    	.setAuthor('Nam Cìu Be Be', 'https://i.imgur.com/aIJP2Hu.png')
		.setDescription('Khi các bạn đi PvE, điều quan trọng nhất là DPS phải có 100%/1000 crit. Tại sao vậy? Vì crit (và crit dmg) là một trong những cách nhanh nhất để tăng sát thương lên cực đại. Chỉ cần bạn crit thôi thì sát thương sẽ được nhân với (200%+ chỉ số crit dmg). Ví dụ như bạn có 150% crit dmg thì sát thương cuối cùng sẽ được nhân với (200% + 150%) = 350% hay còn gọi là nhân 3.5. Do đó, khi đi PvE, các bạn sẽ bắt buộc phải cần 1000 crit cho DPS (990 chấp nhận được ở rất ít trường hợp). Dù chỉ 950 thôi bạn cũng đã mất 5% số đòn đánh có khả năng gây sát thương')
    	.addField('LÀM SAO ĐỂ ĐỦ CRIT ?', '12 năm học toán đừng để ba mẹ thất vọng nhé', true)
    	.setImage('https://i.imgur.com/i6VEXuG.png')
		msg.channel.send(tinhcrit);
        }
}