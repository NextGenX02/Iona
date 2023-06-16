
const i18n = require("i18n")

module.exports = {
    aliases: ["bulk", "delete","prune"],
	args: true,
	category: "admin",
    description: "Delete all messages that don't need again",
	developerOnly: false,
	guildOnly: true,
    name: "clear",
    usage: "<numbers>",

    execute(message, args) {

        if (isNaN(args[0])) {
            return message.channel.sendTyping().then(message.reply(i18n.__("commands.admin.delete_messages.uknown")))
        }

        if (args[0] <= 100) {
            
            message.channel.bulkDelete(args[0], true)
                .then(messages => message.channel.send(i18n.__mf("commands.admin.delete_messages.total_delete", { size: messages.size })))
                .catch(err => console.log(err))
        } else {

            message.channel.sendTyping().then(message.reply(i18n.__mf("commands.admin.delete_messages.fail", { total: args[0] })))
        }
    }
}