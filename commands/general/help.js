const { Prefix } = require("../../resources/settings.json");

const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "help",
	description: "List all commands of bot or info about a specific command.",
	category: "🧾 General",
	aliases: "h, how to, command, commands",
    usage: "[command name]",
    guildOnly: true,
	
	execute(message, args) {
		const { commands } = message.client

		if (!args.length) {
			const helpEmbed = new EmbedBuilder()
				.setColor(0xffffff)
				.setTitle("List of all my commands")
				.setDescription(
					"`" + commands.map((command) => command.name).join("`, `") + "`"
				)
				.addFields({ 
					name: 'Usage', 
					value: `\nYou can send \`${Prefix}help [command name]\` to get info on a specific command!` },
					)
                .setFooter({
                    text: `${message.author.tag}`,
                    iconURL: `${message.author.displayAvatarURL()}`
                })
                .setTimestamp()


			return message.author
				.send({ embeds: [helpEmbed] })

				.then(() => {
					if (message.guild === null) return 

					message.reply({
						content: "I've sent you a DM with all my commands!",
					})
				})
				.catch((error) => {
					console.error(
						`Could not send help DM to this user.\n`,
						error
					)

					message.reply({ content: "It seems like I can't DM you!" })
				})
		}

		const name = args[0].toLowerCase();

		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply({ content: "That's not a valid command!" });
		}

		const commandEmbed = new EmbedBuilder()
			.setColor(0xffffff)
			.setTitle(`❓ ${command.name} Help`)

		if(command.description)
			commandEmbed
            .setDescription(`${command.description}`)

		if(command.category)
			commandEmbed
			.addFields({
				name: "Category",
				value: `\`\`\`${command.category}\`\`\``,
                inline: false
			})

		if(command.aliases)
			commandEmbed
			.addFields({
				name: "Aliases", 
				value: `\`\`\`${command.aliases}\`\`\``,
				inline: true
			})

		if(command.usage)
			commandEmbed
			.addFields({
				name: "Usage", 
				value: `\`\`\`${Prefix}${command.name} ${command.usage}\`\`\``,
				inline: true
			})

            .setFooter({
                text: `${message.author.tag}`,
                iconURL: `${message.author.displayAvatarURL()}`
            })
            .setTimestamp()

		message.channel.send({ 
            embeds: [commandEmbed] 
        })
	},
}