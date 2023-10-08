import {defineEventHandler} from "h3";

export default defineEventHandler(async (event) => {

})

// taken from https://web.dev/push-notifications-server-codelab/
/*
const express = require('express');
const webpush = require('web-push');
const bodyparser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('.data/db.json');
const db = low(adapter);
const vapidDetails = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
    subject: process.env.VAPID_SUBJECT
};

db.defaults({
    subscriptions: []
}).write();

function sendNotifications(subscriptions) {
    // Create the notification content.
    const notification = JSON.stringify({
        title: "Hello, Notifications!",
        options: {
            body: `ID: ${Math.floor(Math.random() * 100)}`
        }
    });
    // Customize how the push service should attempt to deliver the push message.
    // And provide authentication information.
    const options = {
        TTL: 10000,
        vapidDetails: vapidDetails
    };
    // Send a push message to each client specified in the subscriptions array.
    subscriptions.forEach(subscription => {
        const endpoint = subscription.endpoint;
        const id = endpoint.substr((endpoint.length - 8), endpoint.length);
        webpush.sendNotification(subscription, notification, options)
            .then(result => {
                console.log(`Endpoint ID: ${id}`);
                console.log(`Result: ${result.statusCode}`);
            })
            .catch(error => {
                console.log(`Endpoint ID: ${id}`);
                console.log(`Error: ${error} `);
            });
    });
}

const app = express();
app.use(bodyparser.json());
app.use(express.static('public'));

app.post('/add-subscription', (request, response) => {
    console.log(`Subscribing ${request.body.endpoint}`);
    db.get('subscriptions')
        .push(request.body)
        .write();
    response.sendStatus(200);
});

app.post('/remove-subscription', (request, response) => {
    console.log(`Unsubscribing ${request.body.endpoint}`);
    db.get('subscriptions')
        .remove({endpoint: request.body.endpoint})
        .write();
    response.sendStatus(200);
});

app.post('/notify-me', (request, response) => {
    console.log(`Notifying ${request.body.endpoint}`);
    const subscription =
        db.get('subscriptions').find({endpoint: request.body.endpoint}).value();
    sendNotifications([subscription]);
    response.sendStatus(200);
});

app.post('/notify-all', (request, response) => {
    console.log('Notifying all subscribers');
    const subscriptions =
        db.get('subscriptions').cloneDeep().value();
    if (subscriptions.length > 0) {
        sendNotifications(subscriptions);
        response.sendStatus(200);
    } else {
        response.sendStatus(409);
    }
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${listener.address().port}`);
});
*/