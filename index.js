const fs = require('fs');
const Discord = require('discord.js');
const token = 'NzEyODMyOTQ2NTcwMjY0NjM3.XsX91w.NL0wSHWEu8_DWYBgn5trZeApaIQ';
const prefix = '!';
const uw = require("./data/uw.json");
const ut = require("./data/ut.json");
const list = require("./data/list.json");
const { constants } = require('buffer');
const { info } = require('console');
let pages = ['💩','⭐️','⭐️⭐️', '⭐️⭐️⭐️', '⭐️⭐️⭐️⭐️','⭐️⭐️⭐️⭐️⭐️']; 
let page = 1; 

const client = new Discord.Client();
let cmdList = new Discord.Collection();

///LINK FILE

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require('./commands/' + file);

    cmdList.set(command.name, command);
}

////EMBED UW

function cEmbedUW(name, star, num){
    let eff = uw[num].effect;
    let mau = '#663300';
    for(j in uw[num]){
        let k = new RegExp(j);
        if(j.indexOf("plhdr") != -1){
            eff = eff.replace(k, uw[num][j][star]);
        if(list[num].class === 'warrior')
            mau = '#663300'
        }
    }
    let n = name;
    n = n.replace(n.charAt(0), String.fromCharCode(n.charCodeAt(0)-32));
    //let URL = `http://www.kingsraid.wiki/index.php?title=${n}#Unique_Weapon`;
    const emuw = new Discord.MessageEmbed()
    return emuw
        .setColor(mau)
        .setTitle(uw[num].name)
        //.setURL(URL)
        //.attachFiles(["./ava.jpg"])
        .attachFiles(["./data/face/" + num + ".png"])
        .setAuthor(list[num].title, "attachment://" + num + ".png")
        .attachFiles(["./data/weap/" + name + ".png"])
        .addField(eff)
        .setThumbnail("attachment://" + name + ".png")
        //.setTimestamp()
        .setFooter(`Page ${page} of ${pages.length}`)
        .setDescription(pages[page-1])
};

/// START BOT
client.once('ready', () => {
    console.log('Ready!');
});

///COMMAND

client.on("message", message => {
    if(message.author.bot || !message.content.startsWith(prefix)){
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "ping"){
        message.channel.send(`Pong! \`${Math.abs(Date.now() - message.createdTimestamp)} ms\``);
    }
    else if(command === "uw"){
        let hero = args.shift().toLowerCase();
        if (hero === "miri"){
            message.channel.send('Siêu Hero Nên Không Đủ Trình Độ Code')
            return;}
        var a = hero.substring(0,3)
        let star = 0;
        if(args.length > 0){
                star = 0;
                page = star + 1 ;
            }
            //star = args.shift();
            //page = star +2
            //pages = star +2
            //if(star > 5){
                //message.channel.send("Invalid star level.");
                //return;
                //}}
        else
            {
            star = 0;
            page = star + 1 ;
            }

        for(i in list)
        {
            if(list[i].name === a)
            {
                let ngu=cEmbedUW(a, star, i);
                t=i
                //if(!list[i].name === a)
                //return message.channel.send("Hero \`" + hero + "\` does not exist, dummy.");
                message.channel.send(ngu).then(msg => {
                msg.react('◀️').then( r => {
                msg.react('▶️').then( r => {
                msg.react('❌')
                // Filters
                const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀️' && user.id === message.author.id;
                const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶️' && user.id === message.author.id;
                const delete1 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                
                const backwards = msg.createReactionCollector(backwardsFilter, {timer: 1000});
                const forwards = msg.createReactionCollector(forwardsFilter, {timer: 1000});
                const del = msg.createReactionCollector(delete1 , {timer: 1000});
            
                backwards.on('collect', r => {
                if (page <= 6 && page >1) {
                star--;  
                page--; 
                let ngu = cEmbedUW(a, star, t);
                ngu.setDescription(pages[page-1])
                ngu.setFooter(`Page ${page} of ${pages.length}`)
                msg.edit(ngu)            
                }})

                forwards.on('collect', r => {
                if(page === pages.length) return;
                star++;
                page ++;
                let ngu = cEmbedUW(a, star, t);
                ngu.setDescription(pages[page-1])
                ngu.setFooter(`Page ${page} of ${pages.length}`)
                msg.edit(ngu)
                    })

                /*del.on('collect', r => {
                    ngu.clear({ timeout: 1000 })

                    })  */
                })
              })
            })
        }}
    }  

///EMBED UT
    function takeEff(name, star, num, num2){
        let eff = ut[num][num2].effect;
        let mau = '#663300';
        for(j in ut[num][num2]){
        let k = new RegExp(j);
        if(j.indexOf("plhdr") != -1){
            eff = eff.replace(k, ut[num][num2][j][star]);
            }
        }
        return eff;
    }

    function cEmbedUT(name, star, num){
        if(list[num].class === 'warrior'){
        mau = '#663300'
            }
        let n = name;
        n = n.replace(n.charAt(0), String.fromCharCode(n.charCodeAt(0)-32));
        //let URL1 = `http://www.kingsraid.wiki/index.php?title=${n}#1st_Skill_Unique_Treasure`;
        const emut = new Discord.MessageEmbed()
        return emut
            .setColor(mau)
            //.attachFiles(["./ava.jpg"])
            .attachFiles(["./data/face/" + num + ".png"])
            .setAuthor(list[num].title, "attachment://" + num + ".png")
            .addField(`UT1: ${ut[num][1].name}`, takeEff(name, star, num, 1))
            .addField(`UT2: ${ut[num][2].name}`, takeEff(name, star, num, 2))
            .addField(`UT3: ${ut[num][3].name}`, takeEff(name, star, num, 3))
            .addField(`UT4: ${ut[num][4].name}`, takeEff(name, star, num, 4))
            //.setThumbnail("attachment://" + name + ".png")
            .setTimestamp()
            .setFooter(`Page ${page} of ${pages.length}`)
            .setDescription(pages[page-1])
    };

///UT COMMAND
    if(command === "ping"){
        message.channel.send(`Pong! \`${Math.abs(Date.now() - message.createdTimestamp)} ms\``);
    }
    

    else if(command === "ut"){
        let hero = args.shift().toLowerCase();
        if (hero === "miri"){
            message.channel.send('Siêu Hero Nên Không Đủ Trình Độ Code')
            return;}
        var a = hero.substring(0,3)
        let star = 0;
        if(args.length > 0){
                star = 0;
                page = star + 1 ;
            }
        else
            {
            star = 0;
            page = star + 1 ;
        }
/////////////////////////////////////////////////////////////////



for(i in list)
{
    if(list[i].name === a)
    {
        let ngu=cEmbedUT(a, star, i);
        t=i
        //if(!list[i].name === a)
        //return message.channel.send("Hero \`" + hero + "\` does not exist, dummy.");
        message.channel.send(ngu).then(msg => {
        msg.react('◀️').then( r => {
        msg.react('▶️').then( r => {
        msg.react('❌')
        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀️' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶️' && user.id === message.author.id;
        const delete1 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
        
        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 1000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 1000});
        const del = msg.createReactionCollector(delete1 , {timer: 1000});
    
        backwards.on('collect', r => {
        if (page <= 6 && page >1) {
        star--;  
        page--; 
        let ngu = cEmbedUT(a, star, t);
        ngu.setDescription(pages[page-1])
        ngu.setFooter(`Page ${page} of ${pages.length}`)
        msg.edit(ngu)            
        }})

        forwards.on('collect', r => {
        if(page === pages.length) return;
        star++;
        page ++;
        let ngu = cEmbedUT(a, star, t);
        ngu.setDescription(pages[page-1])
        ngu.setFooter(`Page ${page} of ${pages.length}`)
        msg.edit(ngu)
            })

        /*del.on('collect', r => {
            ngu.clear({ timeout: 1000 })

            })  */
                })
            })
        })
    }}
}



/// TEST
    try{
     cmdList.get(command).execute(message, args);
    }
    catch (error) {
    console.error(error);
    //message.reply('Nguln');
    }

})

client.login(token);
