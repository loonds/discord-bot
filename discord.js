
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Echo Test Pass! ')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
require('dotenv').config()

const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_SERVER_GUILD_ID;
const APP_ID = process.env.DISCORD_APP_ID;

app.use(express.json());
const { Client, GatewayIntentBits, ChannelType, PermissionsBitField } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], });
// When the bot is ready, log a message to the console
client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`);
});
client.login(DISCORD_TOKEN);

app.post("/ready", async (req, res) => {

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
                 permissionOverwrites: [
                     {
                         id: guild.roles.everyone.id,
                         deny: [PermissionsBitField.Flags.ViewChannel],
                     },
                     {
                         id: role.id,
                         allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
                     },
                 ],
            });

            return res.send({ channelId: channel.id, roleId })
        })
})
app.post("/create", async (req, res) => {
  const channelName = req.body.name;
  const roleName = req.body.roleType;
  const guild = await client.guilds.fetch(GUILD_ID);

  let role = guild.roles.cache.find(r => r.name === roleName);
  let channel = guild.channels.cache.find(c => c.name === channelName);

  if (role && channel) {
    // If both the role and channel already exist, return their IDs
    return res.send({ channelId: channel.id, roleId: role.id });
  }

  if (!role) {
    // Create role if it doesn't exist
    role = await guild.roles.create({
      name: roleName,
      color: 'BLUE',
      permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels]
    });
  }

  // Create channel
  channel = await guild.channels.create({
    name: channelName,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: guild.roles.everyone.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
      {
        id: role.id,
        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
      },
    ],
  });

  return res.send({ channelId: channel.id, roleId: role.id });
});


app.post("/invite-user", async (req, res) => {
   const { channelId, roleId, email } = req.body;

       try {
           const inviteUrl = await createInvite(channelId, roleId);
           res.send({ invite: inviteUrl });
       } catch (error) {
           console.error(error);
           res.status(500).send('Internal Server Error');
       }
})


async function createInvite(channelId, roleId) {
    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = await guild.channels.fetch(channelId);
    const role = await guild.roles.fetch(roleId);

    const invite = await channel.createInvite();
    return invite.url;
}

// {
//     maxAge: 86400,
//     maxUses: 1,
//     targetType: 2,
//     targetApplicationId: "1081799164779831386",
//     targetId: role.id
// }