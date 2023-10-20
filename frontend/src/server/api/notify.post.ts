import { defineEventHandler, readBody } from "h3";
import webpush from "web-push";
import { useRuntimeConfig } from "#imports";
import type { Database } from '../../types/database.types'
import { serverSupabaseServiceRole, serverSupabaseClient } from '#supabase/server'

interface vapidDetails {
    subject: string;
    publicKey: string;
    privateKey: string;
}

function sendNotifications({
    text,
    subscriptions,
    vapidDetails,
}: {
    text: string;
    subscriptions: webpush.PushSubscription[];
    vapidDetails: vapidDetails;
}) {
    // Create the notification content.
    const notification = JSON.stringify({
        title: text,
        tag: "hello_world",
        options: {
            body: `ID: ${Math.floor(Math.random() * 100)}`,
        },
    });
    // Customize how the push service should attempt to deliver the push message.
    // And provide authentication information.
    const options = {
        TTL: 10000,
        vapidDetails,
    };
    // Send a push message to each client specified in the subscriptions array.
    subscriptions.forEach((subscription) => {
        const endpoint = subscription.endpoint;
        const id = endpoint.substr(endpoint.length - 8, endpoint.length);
        webpush
            .sendNotification(subscription, notification, options)
            .then((result) => {
                console.log(`Endpoint ID: ${id}`);
                console.log(`Result: ${result.statusCode}`);
            })
            .catch((error) => {
                console.log(`Endpoint ID: ${id}`);
                console.log(`Error: ${error} `);
            });
    });
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const client = serverSupabaseServiceRole<Database>()
    const userClient = await serverSupabaseClient<Database>(event)
    const body = await readBody(event)
    const vapidDetails = {
        publicKey: config.public.publicKey,
        privateKey: config.privateKey,
        subject: config.subject,
    };

    if (!body.text || !body.room_id) {
        throw createError({
          statusCode: 400,
          statusMessage: 'text and room_id required',
        })
      }

    const { data } = await client.from('rooms').select('*').eq("id", body.room_id)

    if (!data.length) {
        throw createError({
          statusCode: 404,
          statusMessage: 'room not found',
        })
      }

    const { data: endpoints } = await client.from('notification_states').select("endpoint")

    const pushSubscriptions = [] as webpush.PushSubscription[]

    endpoints.value?.forEach(endpoint => {
        console.log("defineEventHandler notify", endpoint)
        pushSubscriptions.push(
            JSON.parse(endpoint.endpoint)
        )
    })

    sendNotifications({
        title: body.title
        subscriptions: pushSubscriptions,
        vapidDetails,
    });
    return 200;
});
