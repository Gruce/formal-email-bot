import { ChatGPTAPI } from 'chatgpt'
import { Telegraf } from 'telegraf';


export default defineEventHandler(async (event) => {
    // Message is the email body
    const { message } = await readBody(event)

    // ChatGPT API
    const api = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY
    })

    // Telegraf API for Telegram Bot
    const bot = new Telegraf(process.env.BOT_TOKEN);


    // Send message to ChatGPT API
    // const res = await api.sendMessage(message + '\n\n\n Rewrite in formal Email.')
    // res.text


    bot.on("text", ctx => ctx.reply("Hello"));


    // Start webhook via launch method (preferred)
    bot.launch({
        webhook: {
            domain: "localhost",
            port: 8080,
        },
    });

    return {
        api: "test"
    }
})
