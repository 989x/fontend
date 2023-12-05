import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema, Resolver, Query, Arg, ObjectType, Field, ID } from "type-graphql";

import { EstatesResolver } from "src/schema/estates.resolver";

const schema = await buildSchema({
    resolvers: [EstatesResolver],
});

const server = new ApolloServer({
    schema,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

const startServer = server.start();

export default async function handler(req, res) {
    await startServer;
    await server.createHandler({ path: "/api/graphql"})(req, res);
}