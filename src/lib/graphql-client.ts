// lib/graphql-client.ts
import { GraphQLClient } from "graphql-request";

if (!process.env.WP_GRAPHQL_ENDPOINT) {
  throw new Error("WP_GRAPHQL_ENDPOINT is not defined in .env.local");
}

export const graphqlClient = new GraphQLClient(process.env.WP_GRAPHQL_ENDPOINT, {
  // لو تحتاج هيدرز مخصصة (JWT, Auth) تضيفها هنا
  // headers: {
  //   Authorization: `Bearer ${process.env.WP_JWT_TOKEN}`,
  // },
});
