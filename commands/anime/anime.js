
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Component } = require("discord.js")
const { Colors } = require("../../resources/settings.json")
const { getInfoFromName } = require('mal-scraper')

const i18n = require("i18n")

module.exports = {
    aliases: [],
	args: true,
	category: "anime",
    description: "Display a list of all commands or information contained in a specific command.",
	developerOnly: false,
	guildOnly: true,
    name: "anime",
    usage: "<search | character> <args>",

    execute(message, args) {

        const name = `${args}`

        switch (args[0].toLowerCase()) {
            case "search":

                getInfoFromName(name).then(data => {

                    const animeDetails = new EmbedBuilder()
                    .addFields(
                        { name: "Status", value: data.status, inline: true },
                        { name: "Aired", value: data.aired, inline: true },
                        { name: "Score", value: data.score, inline: true },
                        { name: "Studio", value: data.studios[0], inline: true },
                        { name: "Source", value: data.source, inline: true },
                        { name: "Rating", value: data.rating, inline: true },
                    )
                    .setColor(Colors.info)
                    .setDescription(`${data.synopsis}\n`)
                    .setFooter({
                        text: "Data from MAL | " + "Requested by " + message.author.username,
                        iconURL: message.author.displayAvatarURL() 
                    })
                    .setTimestamp()
                    .setThumbnail(data.picture)
                    .setTitle( `${data.title} - ${data.type}`)

                    const trailerRow = new ActionRowBuilder()
                    .addComponents(
                        [
                            new ButtonBuilder()
                            .setLabel("Trailer")
                            .setURL(data.trailer)
                            .setStyle(5)
                        ]
                    )

                    message.channel.sendTyping().then(
                        message.channel.send({ embeds: [
                            animeDetails
                        ], components: [
                            trailerRow
                        ]
                    }))

                }).catch((err) => {
                    message.reply(i18n.__("commands.anime.search.error"))
                })

                break;

            case "character":
                message.reply("nezt update, bukan sekarang")
                break;
        
            default:
                message.reply("fuck u")
                break;
        }
    }
}