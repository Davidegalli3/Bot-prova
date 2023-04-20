const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials, Collection} = require('discord.js');
const { token } = require('./config.json');


const { Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;
const {user, Message, GuildMember, ThreadMember, Channel} = Partials;

const {loadEvents} = require('./Handlers/eventHandler');
const {loadCommands} = require('./Handlers/commandHandler');

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    portials: [user, Message, GuildMember, ThreadMember],
});


client.commands = new Collection();
client.config = require('./config.json');


const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command); 
        } else {
            console.log(`[WARNING] The command ${filePath} is missing "data" or "execute" property.`);
        }
    }
}


const eventsPath = path.join(__dirname, 'events');
const eventFile = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFile) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
})

