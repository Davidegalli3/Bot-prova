const { Events } = require('discord.js');
const mongoose = require('mongoose');
const mongodbURL = process.env.MONGODB_URL;
const config = require("../../config.json");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} is now online!`);



        if (!mongodbURL) return;

        await mongoose.connect(mongodbURL || '', {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        if (mongoose.connect) {
            console.log("Rhe database is running")
        }
    },
};