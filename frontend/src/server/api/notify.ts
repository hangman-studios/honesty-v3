// import { defineEventHandler, readBody } from "h3";
// // import {useNuxtApp} from "#app";
// import { graphql } from "../../gql";
// import { StringHashFilter } from "../../gql/graphql";
// import webpush from "web-push";
// import { useRuntimeConfig } from "#imports";
// import { getApolloClient } from "../../lib/apollo";

// interface vapidDetails {
//   subject: string;
//   publicKey: string;
//   privateKey: string;
// }

// function sendNotifications({
//   subscriptions,
//   vapidDetails,
// }: {
//   subscriptions: webpush.PushSubscription[];
//   vapidDetails: vapidDetails;
// }) {
//   // Create the notification content.
//   const notification = JSON.stringify({
//     title: "Hello, Notifications!",
//     tag: "hello_world",
//     options: {
//       body: `ID: ${Math.floor(Math.random() * 100)}`,
//     },
//   });
//   // Customize how the push service should attempt to deliver the push message.
//   // And provide authentication information.
//   const options = {
//     TTL: 10000,
//     vapidDetails,
//   };
//   // Send a push message to each client specified in the subscriptions array.
//   subscriptions.forEach((subscription) => {
//     const endpoint = subscription.endpoint;
//     const id = endpoint.substr(endpoint.length - 8, endpoint.length);
//     webpush
//       .sendNotification(subscription, notification, options)
//       .then((result) => {
//         console.log(`Endpoint ID: ${id}`);
//         console.log(`Result: ${result.statusCode}`);
//       })
//       .catch((error) => {
//         console.log(`Endpoint ID: ${id}`);
//         console.log(`Error: ${error} `);
//       });
//   });
// }

// export default defineEventHandler(async (event) => {
//   const config = useRuntimeConfig();
//   const vapidDetails = {
//     publicKey: config.public.publicKey,
//     privateKey: config.privateKey,
//     subject: config.subject,
//   };

//   let { sendToIds } = await readBody<{
//     sendToIds: string[];
//     username: StringHashFilter;
//   }>(event);

//   console.log("defineEventHandler notify", sendToIds);

//   const apollo = getApolloClient();

//   const { errors, data } = await apollo.query({
//     query: graphql(/*GraphQL*/ `
//       query getNotificationData($filter: MemberFilter!) {
//         queryMember(filter: $filter) {
//           notificationData
//         }
//       }
//     `),
//     variables: {
//       filter: {
//         username: { in: sendToIds },
//       },
//     },
//   });
//   console.log("defineEventHandler query", data?.queryMember);
//   sendNotifications({
//     // TODO may exec JSON parse on each array item
//     subscriptions: data?.queryMember?.map((item) =>
//       JSON.parse(item?.notificationData!)
//     ) as webpush.PushSubscription[],
//     vapidDetails,
//   });
//   console.log("defineEventHandler notify result", errors, data);
//   return 200;
// });
