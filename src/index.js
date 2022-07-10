import { Client } from 'discord.js'
import config from './settings.json' assert {'type': 'json'}
import doodle from './modules/doodle.js'
const client = new Client({ intents: 32767 }); 

client.once('ready', () => {
    console.log('Ready to roll!')
})

client.on('messageCreate', message => {
    if(message.content.includes === '-p ' || message.author.bot) return
    let msg = (message.content).split('-p ')
    if(msg[1] === undefined) return
    var title = (msg[1]).toLowerCase()

    doodle(message.channel, title[0].toUpperCase() + title.slice(1))
})

client.login(config.token)