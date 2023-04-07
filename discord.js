
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Echo Test Pass!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const DISCORD_TOKEN = 'MTA5MzIzMzQxMTU2NjYxMjY1MA.G9hkzC.PUygkmqdQAPtHEDuCqPptWpzC9Egy1cYrxhm9I';
const GUILD_ID = '1093232503709507768';
const APP_ID = '1093233411566612650';


app.use(express.json());

app.post("/ready", async (req, res) => {

    const { Client, GatewayIntentBits, ChannelType, PermissionsBitField } = require('discord.js');
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], });

    client.login(DISCORD_TOKEN);

    const channelName = req.body.name
    const roleName = req.body.roleType
    const guild = await client.guilds.fetch(GUILD_ID)

    guild.roles.create({
        name: roleName,
        color: 'BLUE',
        permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels]
    })
        .then(async role => {
            const { id } = role;
            const roleId = id;
            //creating channel code
            const channel = await guild.channels.create({
                name: channelName,
                type: ChannelType.GuildText,
                // permissionOverwrites: [
                //     {
                //         id: guild.roles.everyone,
                //         deny: [PermissionsBitField.Flags.ViewChannel],
                //     },
                //     {
                //         id: role.id,
                //         allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
                //     },
                // ],
            });

            return res.send({ channelId: channel.id, roleId })
        })
})


app.post("/invite-user", async (req, res) => {
    const { Client, GatewayIntentBits, ChannelType, PermissionsBitField } = require('discord.js');
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.MessageContent
        ],
    });
    client.login(DISCORD_TOKEN);
    const { channelId, roleId, email } = req.body
    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = await guild.channels.fetch(channelId);
    const role = await guild.roles.fetch(roleId);
    const TARGET_APPLICATION_ID = APP_ID;
    const invite = await channel.createInvite();
    return res.send({ "invite": invite.url });
})

// {
//     maxAge: 86400,
//     maxUses: 1,
//     targetType: 2,
//     targetApplicationId: "1081799164779831386",
//     targetId: role.id
// }