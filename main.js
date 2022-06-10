const { Client, Intents} = require('discord.js');
const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILDS, 
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
	] 
});
const {inspect} = require('util')
const fs = require('fs')
const { token, botOwner } = require('./config.json')
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        game: {
            name: 'real',
            type: 'STREAMING'
        }
    })
});

function isInt(num) {
    return (parseInt(num) === parseFloat(num))
}

const upperCaseReacitons = [
    'BRUH',
    'trolololo',
    'face',
    't',
//    '<:GWbruhTrolled:405065201390452737>',
    'ok',
    ':flushed:',
    'chungles'
]
const normalReactions = [
    'ok',
    'troll',
    'chunges',
    'bruh',
    'when',
    'the',
    'allah',
    ':flushed:',
    'oh',
    'no',
    'Same',
    'real',
    'stop',
    'why',
    'how',
    'mohamed',
    'HAPPY BIRTHDAY',
    'what is the year',
    '3',
    'why',
    'anybody know who higbead is',
    'monke',
    ':gorilla:',
    'whe',
    'higbead'
]
const mentioned = [
    'what',
    'ok',
    'same'
]
const mentionMessages = {
    '<@!645060174901542935>':true,
    '<@!645060174901542935><@!645060174901542935>':true,
    '<@!645060174901542935> <@!645060174901542935>':true,
    '<@!645060174901542935><@!645060174901542935><@!645060174901542935>':true,
    '<@!645060174901542935> <@!645060174901542935> <@!645060174901542935>':true
}

const randomEmojis = JSON.parse(fs.readFileSync('emoji-compact.json'))
const trollWords = [
    'sex',
    's*x',
    'lunathorix',
    'rape',
    'fuck',
    'nsfw',
]
function random(min,max,dontround){
    var initial = Math.random()*(max-min)+min
    return (dontround && initial) || Math.round(initial)
}
var tros = {}
function scheduleMsg(msg,resp,time){
    var os = new Date
    var bef = tros[resp.author.id]
    console.log(bef)
    resp.channel.sendTyping()
    setTimeout(function(){
        console.log(bef,tros[resp.author.id])
        if (!tros[resp.author.id] || (tros[resp.author.id] === bef)) {
            resp.channel.send(msg)
        }
        resp.channel.sendTyping(false)
    },(time && time*1000) || 5000)
}
client.on('messageCreate', async msg => {
    var os = new Date
    if (msg.author.id === client.user.id) {return}
    tros[msg.author.id] = os.getTime()
    /*if (!msg.guild && (msg.author.id != client.user.id)) { Commented out because I don't plan on using the DM feature.
        var str = `Message: \`${msg.content}\`, User: <@!${msg.author.id}> (name: ${msg.author.username}), Channel: <#${msg.channel.id}> (name: ${msg.channel.name})`
        console.log(str)
        client.users.fetch('(Make this a config option later)').then((user) => {
            user.send(str)
//            user.dmChannel.startTyping(9999999)
        })
    }*/
    console.log('"'+msg.content+'"')
    if (mentionMessages[msg.content]){
        scheduleMsg(mentioned[random(0,mentioned.length)],msg)
    }
    else if (msg.content.toUpperCase()===msg.content && msg.content.toLowerCase()!=msg.content){
        scheduleMsg(upperCaseReacitons[random(0,upperCaseReacitons.length)],msg)
    }
    else if (Math.random()>=.75) {
        scheduleMsg(normalReactions[random(0,normalReactions.length)],msg)
    }
    else if (Math.random()>=.9) {
        msg.react(randomEmojis[random(0,randomEmojis.length)])
    }
    else if (Math.random()>=.9 && !msg.content.includes('@')) {
        scheduleMsg(`> ${msg.content}\n <@!${msg.author.id}>`,msg)
    }
    var tr = false
    trollWords.forEach((word) => {
        if (!tr && msg.content.indexOf(word) > -1){
            msg.react('😳')
            tr = true
        }
    })
    if (msg.content.startsWith('eval') && msg.author.id === botOwner){
        eval(msg.content.substr(5))
    }
});

client.login(token);
