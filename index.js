const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING] });

//Error Handling
process.on('unhandledRejection', async err => {
    console.log(err)
});

//Error Handler
process.on('uncaughtException', async err => {
    console.log(err)
})

client.on("ready", async => {
    console.log("Bot is online")
    client.user.setActivity("SPR Development", { type: `WATCHING`});
})

client.on('presenceUpdate', async (oldPresence, newPresence) => {

    try {

      if(oldPresence.status === "offline") return
      if(newPresence.status === "offline") return

    //Activity requirement
    let activity = ".gg/vanityhere"  
    //ROLE
    const role = newPresence.guild.roles.cache.get("Role ID Here");

    if (!role) return console.log("Role is missing")
    //Log Channel
    const channel = client.channels.cache.get("Channel ID Here")

    if (!channel) return console.log("Channel is missing")


    const member = newPresence.member
    const activities = newPresence.activities[0];
    if (activities && (activities.state.includes(activity) && !activities.state || activities.state.includes(activity))) {
      if (member.roles.cache.has(role.id)) return
      member.roles.add(role)
      channel.send({ content: `${role} was added to ${member} for using \`${activity}\` in their status.`})
    } else if (member.roles.cache.has(role.id)){
        member.roles.remove(role)
        channel.send({ content: `${role} was removed from ${member} for not using \`${activity}\` in their status.`})
    }

    } catch (e) {
        console.log(e)
    }

})

client.login("Token Here").catch(console.error)