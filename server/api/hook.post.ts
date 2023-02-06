import { ChatGPTAPI } from 'chatgpt'
import qs from 'query-string';

const isArabic = (text: string) => {
    var arabic = /[\u0600-\u06FF]/;
    return arabic.test(text)
}

export default defineEventHandler(async (event) => {
    const SERVER_URL = "https://formal-email-bot.vercel.app/api/hook"
    const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

    // Message is the email body
    const { message: { chat: { id }, text } } = await readBody(event)

    const rewriteMessage = isArabic(text) ? "اعد كتابتها بصيغة رسالة بريد رسمية" : "Rewrite in formal Email."

    // ChatGPT API
    const api = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY || '',
    })

    // Send message to ChatGPT API
    const res = await api.sendMessage(text + `\n\n\n ${rewriteMessage}`, {
        timeoutMs: 2 * 60 * 1000
    })
    // res.text

    // Format message
    const messageQuery = qs.stringify({
        text: res.text
    })

    // Send message to Telegram
    await $fetch(`${TELEGRAM_API}/sendMessage?chat_id=${id}&${messageQuery}`, { method: "POST" })

    return {
        api: "test"
    }
})
