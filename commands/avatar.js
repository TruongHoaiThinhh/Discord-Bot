module.exports = {
	name: 'avatar',
	description: '',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Avatar của mày: ${message.author.displayAvatarURL({ dynamic: true })}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `Avatar của ${user.username}: ${user.displayAvatarURL({ dynamic: true })}`;
		});

		message.channel.send(avatarList);
	},
};