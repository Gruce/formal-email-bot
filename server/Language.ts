import qs from 'query-string';

export default function (message: any) {
    const { chat: { id }, text, message_id } = message;

    // Format message
    const messageQuery = qs.stringify({
        text: text,
        // reply_to_message_id: message_id,
        reply_markup: JSON.stringify({
            inline_keyboard:
                [
                    [{
                        text: 'English', callback_data: `en@${message_id}`
                    }, {
                        text: 'عربي', callback_data: `ar@${message_id}`
                    }],
                ]
        })
    })




    return messageQuery
}