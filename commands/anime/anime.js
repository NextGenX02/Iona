
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Component } = require("discord.js")
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
    usage: "<args> <args>",

    execute(message, args) {

        let name = args[1].toLowerCase()

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
                    .setDescription(`${data.synopsis}\n`)
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

                    message.channel.send({ embeds: [
                        animeDetails
                    ], components: [
                        trailerRow
                    ]
                })
                }).catch(err => console.log(err))

                break;
        
            default:
                message.reply("fuck u")
                break;
        }
    }
}