const {EmbedBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('createverify')
    .setDescription('Set your verification channel')
    .addChannelOption(option =>
        option.setName('channel')
        .setDescription('Send verification embed in this channel')
        .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        async execute(interaction) {
            const channel = interaction.options.getChannel('channel');
            const verifyEmbed = new EmbedBuilder()
            .setTitle("Verification")
            .setDescription('Click the button to Verify you account and get access to the channels')
            .setColor(0x5fb041)
            let sendChannel = channel.send({
                embeds: ([verifyEmbed]),
                components: [
                    new ActionRowBuilder().setComponents(
                        new ButtonStyle().setCustomId('verify').setLabel('Verify').setStyle(ButtonStyle.Success),
                    ),
                ],
            });
            if (!sendChannel) {
                return interaction.reply({content: 'There was an error! Try again later',ephemeral: true});
            } else {
                return interaction.reply({content: "Verification channel set!", ephemeral: true});
            }
        }
    }