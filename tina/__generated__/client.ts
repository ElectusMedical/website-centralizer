import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/a0/usr/workdir/website-centralizer/tina/__generated__/.cache/1775106242287', url: '/api/graphql', token: 'local', queries,  });
export default client;
  