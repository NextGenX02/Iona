
const { EmbedBuilder } = require("discord.js")
const { Colors } = require("../../resources/settings.json")

const i18n = require("i18n")

module.exports = {
    aliases: [],
	args: false,
	category: "general",
    description: "Get information about me, developer or user!",
	developerOnly: false,
	guildOnly: true,
    name: "avatar",
    usage: "[@user]",

    execute(message) {

        const user = message.mentions.users.first() || message.author

        const avatar = new EmbedBuilder()
        .setAuthor({
            iconURL: message.client.user.displayAvatarURL(),
            name: `Hello World! I'm ${message.client.user.username}!` 
        })
        .setColor(Colors.normal)
        .setFooter({
            text: "Requested by " + message.author.username,
            iconURL: message.author.displayAvatarURL() 
        })
        .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=4096`)
        .setTimestamp()

        message.channel.send({ embeds: [
            avatar
        ] 
    })

    }
}