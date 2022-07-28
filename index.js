// var Slack = require('node-slack-upload');
const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const { WebClient, LogLevel } = require("@slack/web-api");
const puppeteer = require('puppeteer');


dotenv.config();


// const app = new App ({
//     token:process.env.BOT_TOKEN,
// });

const client = new WebClient(process.env.BOT_TOKEN, {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.DEBUG
});


// The name of the file you're going to upload
const fileName = "./flower.gif";
// ID of channel that you want to upload file to
const channelId = "C03NQ5HKBV4";

async function test() {
    try {
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('https://www.freecodecamp.org/');


            await page.screenshot({                      // Screenshot the website using defined options

                path: "./screenshot.png",                   // Save the screenshot in current directory

                fullPage: true                              // take a fullpage screenshot

            });
            await browser.close();
        })();
        // Call the files.upload method using the WebClient
        const result = await client.files.upload({
            // channels can be a list of one to many strings
            channels: channelId,
            initial_comment: "Here\'s my file :smile:",
            // Include your filename in a ReadStream here
            file: fs.createReadStream(path.join(__dirname, 'screenshot.png'))
        });

        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}
test();

// const bot = new SlackBot({
//     token: `${process.env.BOT_TOKEN}`,
//     name: 'test-channel'
// })


// slack.uploadFile({
//     file: fs.createReadStream(path.join(__dirname, 'flower.jfif')),
//     filetype: 'post',
//     title: 'flower',
//     initialComment: 'my comment',
//     channels: 'test-channel'
// }, function(err, data) {
//     if (err) {
//         console.error(err);
//     }
//     else {
//         console.log('Uploaded file details: ', data);
//     }
// });