
import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

const config: DenonConfig = {
   allow: [
    "net",
    "env",
    "read",
    "write"
  ],
  scripts: {
    start: {
      cmd: "deno run index.ts",
      desc: "run my index.ts file",
       env: {
        ENV: "development"
      },
       watch: true,
      tsconfig: "tsconfig.json"
    },
  },
};

export default config;