
const { EmbedBuilder } = require("discord.js")
const { Prefix } = require("../../resources/settings.json")
const { readdirSync } = require("node:fs")


const categories = readdirSync("./commands/")
const colors = require("../../resources/settings.json").Colors
const i18n = require("i18n")

module.exports = {
    aliases: [],
	args: false,
	category: "general",
    description: "Display a list of all commands or information contained in a specific command.",
	developerOnly: false,
	guildOnly: true,
    name: "help",
    usage: "",

    execute(message, args) {
		const { commands }  =  message.client

		if (!args.length) {
			const help = new EmbedBuilder()
			.setAuthor({
				iconURL: message.client.user.displayAvatarURL(),
				name: `Hello World! I'm ${message.client.user.username}!` 
			})
			.setColor(colors.normal)
			.setDescription(i18n.__("commands.general.help.help_description"))
			.setFooter({
				text: "Requested by " + message.author.username,
				iconURL: message.author.displayAvatarURL() 
			})
			.setThumbnail("https://cdn.dribbble.com/users/484085/screenshots/2164771/media/0e0cd8e469cb7154ca8e9b6ff219e0fd.gif")
			.setTimestamp()

			categories.forEach((category) => {
				const dir = commands.filter(dirs => dirs.category === category)
				const group = category.slice(0, 1).toUpperCase() + category.slice(1)

				help.addFields({ name: group.toUpperCase(), value: "`" + dir.map(dirs => dirs.name).join("`, `") + "`" , inline: true})
			})

			return message.author
				.send({ embeds: [
					help
				] })

				.then(() => {
					if (message.guild === null) return 

					message.reply({
						content: i18n.__("commands.general.help.succes"),
					})
				})
				.catch((error) => {
					console.error(`${i18n.__("commands.general.help.error")}\n`, error)
					message.reply({ content: i18n.__("commands.general.help.fail") })
				})
		}

		const name = args[0].toLowerCase()

		const command = commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name))

		if (!command) {
			return message.reply({ content: "That's not a valid command!" })
		}

		const commandDetails = new EmbedBuilder()
		.setAuthor({
			iconURL: message.client.user.displayAvatarURL(),
			name: `Hello World! I'm ${message.client.user.username}!` 
		})
		.setColor(colors.normal)
		.setDescription(`**${command.name}**\n${command.description}`)
		.setFooter({
			text: "Requested by " + message.author.username,
			iconURL: message.author.displayAvatarURL() 
		})
		.setThumbnail("https://cdn.dribbble.com/users/484085/screenshots/2164771/media/0e0cd8e469cb7154ca8e9b6ff219e0fd.gif")
		.setTimestamp()

		if(command.category)
			commandDetails.addFields({
				name: "Category",
				value: `\`\`\`${command.category.toUpperCase()}\`\`\``,
                inline: false
			})

		if(command.aliases)
			commandDetails.addFields({
				name: "Aliases", 
				value: `\`\`\`${command.aliases.join(" | ")}\`\`\``,
				inline: true

				
			})

		if(command.usage)
			commandDetails.addFields({
				name: "Usage", 
				value: `\`\`\`${Prefix}${command.name} ${command.usage}\`\`\``,
				inline: true
			})

		message.channel.send({ 
            embeds: [commandDetails] 
        })

    }
}