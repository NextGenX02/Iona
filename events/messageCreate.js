const { Collection, ChannelType } = require("discord.js")
const { Prefix, Developers } = require("../resources/settings.json")

const i18n = require("i18n")


const escapeRegex = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

module.exports = {
	name: "messageCreate",

	async execute(message) {

		const { client, guild, channel, content, author } = message

		if (message.content == `<@${client.user.id}>`) 
		{ 
			require("../messages/onMention.js").execute(message) 
			return
		}

		const checkPrefix = Prefix.toLowerCase()

		const prefixRegex = new RegExp(
			`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`
		)

		if (!prefixRegex.test(content.toLowerCase())) return

		const [matchedPrefix] = content.toLowerCase().match(prefixRegex)

		const args = content.slice(matchedPrefix.length).trim().split(/ +/)

		const commandName = args.shift().toLowerCase()

		if (!message.content.startsWith(matchedPrefix) || message.author.bot) return

		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			)

		if (!command) return

		if (command.developerOnly && message.author.id !== Developers) {
			return message.reply({ content: i18n.__("events.message_create.developer_only") })
		}


		if (command.guildOnly && message.channel.type === ChannelType.DM) {
			return message.reply({
				content: i18n.__("events.message_create.guild_only"),
			})
		}

		if (command.permissions && message.channel.type !== ChannelType.DM) {
			const authorPerms = message.channel.permissionsFor(message.author)
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply({ content: i18n.__("events.message_create.no_permissions") })
			}
		}

		if (command.args && !args.length) {
			let reply = `${i18n.__("events.message_create.incomplete_args")}, ${message.author}!`

			if (command.usage) {
				reply += `\n> ${i18n.__("events.message_create.proper_usage")}: \`${Prefix}${command.name} ${command.usage}\``
			}

			return message.channel.send({ content: reply })
		}

		try {
			command.execute(message, args)
		} catch (error) {
			console.error(error)
			message.reply({
				content: i18n.__("events.message_create.error_while_executing_the_command"),
			})
		}
	},
}