const { readdirSync } = require("node:fs")

const i18n = require("i18n")

module.exports = {
    aliases: ["r", "muat"],
	args: true,
	category: "developer",
    description: "Reload commands more easily!",
	developerOnly: true,
	guildOnly: false,
    name: "reload",
    usage: "<command>",

    execute(message, args) {

		const commandName = args[0].toLowerCase()
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

		if (!command) {
			return message.reply({
				content: i18n.__("commands.developer.reload.not_command") + commandName + "!"
			})
		}

		commandFolder = readdirSync("./commands/")
		const folderName = commandFolder.find(folder => readdirSync(`./commands/${folder}`).includes(`${command.name}.js`))

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)]

		try {

			const newCommand = require(`../${folderName}/${command.name}.js`)

			message.client.commands.set(newCommand.name, newCommand)
			message.reply({ content: i18n.__mf("commands.developer.reload.succes", { command: newCommand.name }), })
		} catch (error) {
			
			console.error(error)
			message.reply({ content: i18n.__("commands.developer.reload.error") + `\n> \`${command.name}\`: \`${error.message}\``, })
		}
	}
}