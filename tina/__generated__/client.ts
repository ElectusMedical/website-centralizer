import { createClient } from "tinacms/dist/client";
import { queries } from "./types";

export const client = createClient({
  url: "/api/graphql",
  token: "local",
  queries,
});

export default client;
