import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema, Resolver, Query, Arg, ObjectType, Field, ID } from "type-graphql";

import { EstatesResolver } from "src/schema/estates.resolver";

import Cors from 'micro-cors';

const cors = Cors();

const schema = await buildSchema({
    resolvers: [EstatesResolver],
});

// const server = new ApolloServer({
//     schema,
// });

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export default async function handler(req, res) {
//     await startServer;
//     await server.createHandler({ 
//         path: "/api/graphql"
//     })(req, res);
// }

const server = new ApolloServer({ schema });

const startServer = server.start();

export default cors(async (req, res) => {

    if (req.method === 'OPTIONS') {
      res.end();
      return false;
    }

    await startServer;
    server.createHandler({ path: '/api/graphql' })(req, res);
  });
  
  export const config = {
    api: {
      bodyParser: false,
    },
  };