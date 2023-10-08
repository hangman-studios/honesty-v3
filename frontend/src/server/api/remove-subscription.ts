// // import { defineEventHandler, readBody } from "h3";
// // // import {useNuxtApp} from "#app";
// // import { graphql } from "../../gql";
// // import { StringHashFilter } from "../../gql/graphql";
// // import { getApolloClient } from "../..//lib/apollo";

// export default defineEventHandler(async (event) => {
//   let { notificationData, username } = await readBody<{
//     notificationData: string;
//     username: StringHashFilter;
//   }>(event);

//   console.log(
//     "defineEventHandler remove subscription",
//     notificationData,
//     username
//   );

//   const apollo = getApolloClient();

//   const { errors, data } = await apollo.mutate({
//     mutation: graphql(/*GraphQL*/ `
//       mutation removeNotificationData($update: UpdateMemberInput!) {
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
//         remove: {
//           notificationData: "",
//         },
//       },
//     },
//   });
//   console.log("defineEventHandler remove subscription result", errors, data);
// });
