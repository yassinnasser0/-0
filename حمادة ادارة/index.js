const { Client, GatewayIntentBits, Partials } = require('discord.js');
const TOKEN = process.env.BOT_TOKEN || 'YOUR_DISCORD_BOT_TOKEN'; // MTM1OTcxOTEzMjYzNTA3MDY5Ng.GXGfc5.W2jrXdUbFL2MXuKOf7ny9Y0km0y8D9_L4A9K2M

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const prefix = '!';

client.once('ready', () => {
  console.log(Logged in as ${client.user.tag});
});

// Auto Role
client.on('guildMemberAdd', member => {
  const role = member.guild.roles.cache.find(role => role.name === 'Member');
  if (role) member.roles.add(role);
});

// Delete Links
client.on('messageCreate', message => {
  if (message.content.match(/https?:\/\//) && !message.member.permissions.has('MANAGE_MESSAGES')) {
    message.delete();
    message.channel.send(${message.author}, links are not allowed.);
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const command = message.content.slice(prefix.length).trim();

  if (command === 'ping') {
    message.channel.send('Pong!');
  }
});

client.login(TOKEN);
