
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


const { Client, GatewayIntentBits, ChannelType, PermissionsBitField } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], });

//bot chat all data is in message ....author,guild id
// client.on("messageCreate", message => {
//     if (message.author.bot) return;
//     message.reply({
//         content: "this is message from zeus!"
//     })
// })

//api
// const axios = require('axios');

// // The ID of the guild (server) in which you want to create the channel
// const guildId = '1081865368680812544';

// // The name and type of the channel you want to create
// const channelData = {
//     "name": "createChannel",
//     "type": "GUILD_TEXT",//for guild_text
//     // permission_overwrites: [],
//     // parent: "parent_ID",
// };

// // The authorization token for your bot
// const token = 'MTA4MTc5OTE2NDc3OTgzMTM4Ng.GPdQiH.w_I33ol_cGvJjBa2K9wtNXoivc4oT6xiZ8tPTE';

// // Make the request to create the channel
// axios.post(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
//     "name": "naming-things-is-hard",
//     "type": 0
// },
//     {
//         headers: {
//             Authorization: `Bot ${token}`,
//             'Content-Type': 'multipart/form-data'
//         }
//     }
// )
//     .then(response => {
//         console.log('Channel created:', response?.data);
//     })
//     .catch(error => {
//         console.error('Error creating channel:', error?.response?.data);
//     });

//   const token = 'MTA4MTc5OTE2NDc3OTgzMTM4Ng.GPdQiH.w_I33ol_cGvJjBa2K9wtNXoivc4oT6xiZ8tPTE';
client.login('MTA4MTc5OTE2NDc3OTgzMTM4Ng.GPdQiH.w_I33ol_cGvJjBa2K9wtNXoivc4oT6xiZ8tPTE');

// client.on('interactionCreate', async interaction => {
//     if (!interaction.isChatInputCommand()) return;

//     if (interaction.commandName === 'create') {
//         // if (message.content === '!create-channel') {
//         // Get the guild object for the server
//         const guild = message.guild;

//         // Create the channel
//         const channel = await guild.channels.create({
//             name: "channel",
//             type: ChannelType.GuildText,
//             // permissionOverwrites: [
//             //     {
//             //         id: guild.roles.bot, // This role refers to @everyone
//             //         deny: [''],
//             //     },
//             // ],
//         });

//         // Send a message to confirm that the channel was created
//         message.channel.send(`Created ${channel}`);
//         // }
//     }
// });

client.on('messageCreate', async message => {

    if (message.author.bot) return;
    // const name = message.content.replace("!create-channel", "")
    if (message.content === '!create-channel') {
        // Get the guild object for the server
        const guild = message.guild;
        // const role = guild.roles.cache.find(role => role.name === "Some Role");
        //role
        const everyoneRole = guild.roles.everyone;

        // Create the channel
        // console.log('message.author.id :>> ', message.guild.roles.everyone);

        const channel = await guild.channels.create({
            name: "check",
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: message.author.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
                },
            ],
        });

        //overRide permission
        // await channel.overwritePermissions([
        //     { type: 'member', id: message.author.id, allow: [Permissions.FLAGS.VIEW_CHANNEL] },
        //     { type: 'member', id: client.user.id, allow: [Permissions.FLAGS.VIEW_CHANNEL] },
        //     { type: 'role', id: everyoneRole.id, deny: [Permissions.FLAGS.VIEW_CHANNEL] },
        // ]);
        // Send a message to confirm that the channel was created
        message.channel.send(`Created ${channel}`);
    }
});

// const axios = require('axios');

// axios.post('https://discord.com/api/v9/guilds/1081865368680812544/channels', {
//     name: 'Zeus_2nd_channl',
//     type: 'text' // Or 'voice', 'category', etc.
// }, {
//     headers: {
//         Authorization: `Bot ${token}`
//     }
// }).then(response => {
//     console.log(response.data);
// }).catch(error => {
//     console.error(error);
// });


// client.on('ready', async () => {
//     // Create a new guild (server) with the name "My Private Server"
//     const guild = await client.guilds.create('My Private Server', {
//         region: 'us-west', // set the server region to US West
//         icon: 'https://example.com/my-private-server-icon.png', // set the server icon
//         verificationLevel: 'HIGH', // set the verification level to "High"
//         explicitContentFilter: 'DISABLED' // disable explicit content filtering
//     });

// Print the server name and ID to the console
// console.log(`Created guild with name ${guild.name} and ID ${guild.id}`);
// });

client.login('MTA4MTc5OTE2NDc3OTgzMTM4Ng.GPdQiH.w_I33ol_cGvJjBa2K9wtNXoivc4oT6xiZ8tPTE');
// client.login('my_token');


// const Discord = require('discord.js');
// const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


// client.on('ready', async () => {
//     const guild = await client.guilds.create('My Private Server');
//     console.log(`Created guild with name ${guild.name} and id ${guild.id}!`);
// });