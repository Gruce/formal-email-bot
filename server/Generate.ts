import qs from 'query-string';
import { ChatGPTAPI } from 'chatgpt'

export default async function (callback_query: any) {
    const { message: { data_message_id }, data } = callback_query;

    const { language, text } = JSON.parse(data)

    const rewriteMessage = language == "ar" ? "اعد كتابتها بصيغة رسالة بريد رسمية" : "Rewrite in formal Email."


    // ChatGPT API
    const api = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY || '',
    })

    // Send message to ChatGPT API
    const res = await api.sendMessage(text + `\n\n\n ${rewriteMessage}`, {
        timeoutMs: 2 * 60 * 1000
    })

    const msg = qs.stringify({
        text: res.text,
        reply_to_message_id: data_message_id,
    })

    return msg
}