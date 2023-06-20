
const i18n = require("i18n")

module.exports = {
    aliases: [],
	args: false,
	category: "general",
    description: "Get information about me, developer or user!",
	developerOnly: false,
	guildOnly: true,
    name: "kick",
    permissions: ["KickMembers"],
    usage: "<@user> <reason>",

    execute(message, args) {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!user) {
            message.reply("Masukkan nama yang akan di kick!")
        }

        if (user) {
            user.kick()
            message.channel.send("Done :ok_hand:")
        }
    }
}