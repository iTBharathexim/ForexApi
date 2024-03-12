var request = require('request');
function sendNotificationToUser(fcm_token, title, body, message, callback) {
    request({
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${process.env.FCM_SERVER_KEY}`
        },
        body: JSON.stringify({
            "notification": {
                "title": title,
                "body": body
            },
            "data": {
                "message": message
            },
            "to": fcm_token
        })
    }, function (error, response, body) {
        if (error) callback(error, null);
        else if (response.statusCode === 200) callback(null, JSON.parse(body));
        else callback(null, null);
    });
}

module.exports = { sendNotificationToUser };
