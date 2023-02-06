import qs from 'query-string';

export default function (message: any) {
    const { chat: { id }, text, message_id } = message;

    // Format message
    const messageQuery = qs.stringify({
        text: "أختر اللغة",
        reply_to_message_id: message_id,
        reply_markup: JSON.stringify({
            inline_keyboard:
                [
                    [{
                        text: 'English', callback_data: JSON.stringify({
                            "language": "en",
                            "text": text,
                        })
                    }, {
                        text: 'عربي', callback_data: JSON.stringify({
                            "language": "ar",
                            "text": text,
                        })
                    }],
                ]
        })
    })




    return messageQuery
}