import qs from 'query-string';

import Language from '../Language';
import Generate from '../Generate';

const isArabic = (text: string) => {
    var arabic = /[\u0600-\u06FF]/;
    return arabic.test(text)
}

export default defineEventHandler(async (event) => {
    const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

    // Message is the email body
    const { message, callback_query } = await readBody(event)

    const chat_id = message?.chat?.id ?? callback_query?.message?.chat?.id
    const query_id = callback_query?.id





    if (callback_query?.data) {
        await $fetch(`${TELEGRAM_API}/sendMessage?chat_id=${chat_id}&${await Generate(callback_query)}`, { method: "POST" })
        await $fetch(`${TELEGRAM_API}/answerCallbackQuery?callback_query_id=${query_id}`, { method: "POST" })

    } else {
        await $fetch(`${TELEGRAM_API}/sendMessage?chat_id=${chat_id}&${Language(message)}`, { method: "POST" })
    }






    return {
        api: "test"
    }
})
