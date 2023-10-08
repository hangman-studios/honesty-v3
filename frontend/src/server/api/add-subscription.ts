// import { defineEventHandler, readBody } from "h3";
// // import {useNuxtApp} from "#app";
// import { graphql } from "../../gql";
// import { StringHashFilter } from "../../gql/graphql";
// import { getApolloClient } from "../..//lib/apollo";

// export default defineEventHandler(async (event) => {
//   let { notificationData, username } = await readBody<{
//     notificationData: string;
//     username: StringHashFilter;
//   }>(event);

//   console.log(
//     "defineEventHandler add subscription",
//     notificationData,
//     username
//   );

//   const apollo = getApolloClient();

//   const { data, errors } = await apollo.mutate({
//     mutation: graphql(/*GraphQL*/ `
//       mutation addNotificationData($update: UpdateMemberInput!) {
//         updateMember(input: $update) {
//           numUids
//         }
//       }
//     `),
//     variables: {
//       update: {
//         filter: {
//           username,
//         },
//         set: {
//           notificationData,
//         },
//       },
//     },
//   });
//   console.log("defineEventHandler add subscription result", errors, data);
// });
