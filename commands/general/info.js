
const { EmbedBuilder } = require("discord.js")
const { Colors } = require("../../resources/settings.json")
const { description, version } = require("../../package.json")

const i18n = require("i18n")

module.exports = {
    aliases: [],
	args: false,
	category: "general",
    description: "Get details information about me!",
	developerOnly: false,
	guildOnly: true,
    name: "info",
    usage: "Test",

    execute(message) {

        const days = Math.floor(message.client.uptime / 86400000)
        const hours = Math.floor(message.client.uptime / 3600000) % 24
        const minutes = Math.floor(message.client.uptime / 60000) % 60
        const seconds = Math.floor(message.client.uptime / 1000) % 60

        message.reply(i18n.__mf("commands.general.info.introduction", { user: `<@${message.author.id}>` })).catch(err => console.log(err))

        const infoDetails = new EmbedBuilder()
        .addFields(
            { name: "My Tag", value: message.client.user.tag , inline:true},
            { name: "My Version", value: version, inline:true },
            { name: "Ping", value: message.client.ws.ping + " ms", inline: true },
            { name: "Uptime", value: `\`\`\`css\n${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds\`\`\`` },
            { name: "Servers", value: `${message.client.guilds.cache.size}`, inline: true },
            { name: "Users", value: `${message.client.guilds.cache.reduce((client, guild) => client + guild.memberCount, 0)}`, inline: true },
            { name: "Commands", value: `${message.client.commands.map(command => command.name).length}`, inline: true },
            { name: "Website", value: `[Iona](https://niaz.netlify.app/iona)`, inline: true },
            { name: "Creator", value: "Naiyzk#6994", inline: true },
            { name: "Trakteer?", value: `[Donate](https://niaz.netlify.app/iona)`, inline: true },

        )
        .setAuthor({
			iconURL: message.client.user.displayAvatarURL(),
			name: `Hello World! I'm ${message.client.user.username}!` 
		})
        .setDescription(description)
		.setColor(Colors.normal)
        .setThumbnail(message.client.user.displayAvatarURL())

        message.channel.send({ embeds: [
            infoDetails
        ] 
    }).catch(err => console.log(err))

    }
}