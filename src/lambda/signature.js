const crypto = require('crypto')
require('dotenv/config')

function generateSignature(secrets, meetingData) {
    const timestamp = new Date().getTime()
    const msg = Buffer.from(secrets.apiKey + meetingData.meetingNumber + timestamp + meetingData.role).toString('base64')
    const hash = crypto.createHmac('sha256', secrets.apiSecret).update(msg).digest('base64')
    const signature = Buffer.from(`${secrets.apiKey}.${meetingData.meetingNumber}.${timestamp}.${meetingData.role}.${hash}`).toString('base64')
    return signature
}

const temp = {
    body: {
        meetingData: {
            meetingNumber: '2859761343',
            role: 0
        }
    }
}

export async function handler(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    // console.log(event.body)
    // console.log(context)

    try {        

        return {
            statusCode: 200,
            body: JSON.stringify({ signature: generateSignature(process.env, event.body) })
        }
    } catch (err) {
        console.log(err) // output to netlify function log
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
        }
    }
}