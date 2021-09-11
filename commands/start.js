//jshint esversion:8
const config = require('../config');
const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

async function get(battery, phn_info) {

    let batttxt;

    if (battery.plugged) {
        batttxt = `${battery.battery}% (Charging)`;
    } else {
        batttxt = `${battery.battery}%`;
    }

    return ({
        msg: `*Whatsbot* _(1.5.0)_\n\nThis chat is Powered By *Whatsbot*\n\n*Battery:* ${batttxt}\n*Device:* ${phn_info.device_manufacturer} ${phn_info.device_model}\n*WA Version:* ${phn_info.wa_version}\n*Pmpermit:* ${config.pmpermit_enabled}\n*Mutetime:* ${config.pmpermit_mutetime/60} Minutes\n\n*Official Repository Url 👇*\n` + "```https://github.com/TheWhatsBot/WhatsBot```",
        mimetype: "image/jpeg",
        data: Buffer.from(((await axios.get('https://telegra.ph/file/ecbc27f276890bf2f65a2.jpg', { responseType: 'arraybuffer' })).data)).toString('base64'),
        filename: "start.jpg"
    });
}

const run = async (client,msg) => {
    msg.delete(true);
    let startdata = await get(await client.info.getBatteryStatus(), client.info.phone);
    client.sendMessage(msg.to, new MessageMedia(startdata.mimetype, startdata.data, startdata.filename), { caption: startdata.msg });
};

module.exports = {run};