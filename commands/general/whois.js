
const { EmbedBuilder } = require("discord.js")
const { Colors } = require("../../resources/settings.json")

const i18n = require("i18n")
const moment = require("moment")

module.exports = {
    aliases: ["whoareyou", "ui"],
	args: false,
	category: "general",
    description: "Get details information about another user!",
	developerOnly: false,
	guildOnly: true,
    name: "whois",
    usage: "[@user]",

    execute(message) {

        const member = message.mentions.members.first() || message.member, user = member.user
        const rolesName = member.roles.cache
            .filter(roles => roles.id !== message.guild.id)
            .map(role => role.toString())
        const checkRoles = rolesName.length ? rolesName.join(", ") : "None"

        const createAt = moment.utc(user.createdAt).format("ddd, D MMM YYYY, HH:mm")
        const joinedAt = moment.utc(message.guild.members.cache.get(user.id).joinedAt).format("ddd, D MMM YYYY, HH:mm")

        const whois = new EmbedBuilder()
        .addFields(
            { name:"**Roles** " + `[${rolesName.length}]`, value: `${checkRoles}`  },
            { name: "user Id", value: user.id },
            { name: "created At", value: `${createAt}` },
            { name: "joined At", value: `${joinedAt}` },
        )
        .setAuthor({
            name: "Who is " + user.username + "?",
            iconURL: user.displayAvatarURL()
        })
        .setThumbnail(user.displayAvatarURL())
        .setFooter({
            text: "Requested by " + message.author.username,
            iconURL: message.author.displayAvatarURL() 
        })
        .setTimestamp()

        message.channel.send({ embeds: [
            whois
        ] 
    })
    }
}