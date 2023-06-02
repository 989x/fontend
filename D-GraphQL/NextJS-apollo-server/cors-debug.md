### Problems Error: You must `await server.start()` before calling `server.createHandler()` in next.js
- stackoverflow: https://stackoverflow.com/questions/69034677/error-you-must-await-server-start-before-calling-server-createhandler-i

```ts
import Cors from "micro-cors";
import schema from "graphql/schema";
import { ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";
import { createContext } from "graphql/context";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const server = new ApolloServer({
  context: createContext,
  schema,
});

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
```ts