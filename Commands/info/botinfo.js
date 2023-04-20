const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const cpuStat = require("cpu-stat");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Get information about the bot."),

    execute(interaction, client) {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60

        cpuStat.usagePercent(function (err, percent, seconds) {
            if(error) return interaction.reply({ content: `${error}` })

            const memoryUsage = formatBytes(proccess.memoryUsage().heapUsed)
            const node = process.version
            const cpu = percent.toFixed(2)

            const embed = new EmbedBuilder()

            .setTitle("Bot information")
            .setColor("Blue")
            .addFields(
                { name: "Develper", value: "Kaj", inline: true},
                { name: "Username", value: `${client.user.username}`, inline: true },
                { name: "ID", value: `${client.user.id}`, inline: true },
                { name: "reaction date", value: "02.03.2023" },
                { name: "Help command", value: "help"},
                { name: "Uptime",  value: ` \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds` },
                { name: "Bot-Ping", value: `${client.ws.ping}ms` },
                { name: "Node version", value: `${node}` },
                { name: "CPU", value: `${cpu}%` },
                { name: "Memory usage", value: `${memoryUsage}` }
            )

            interaction.reply({ embeds: [embed] })
        })

        function formatBytes(a, b) {
            let c = 1024
            d = b || 2
            e = ["B", "KB", "MB", "GB", "TB"]
            f = Math.floor(Math.log(a) / Math.log(c))

            return perseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
        }
    }
}