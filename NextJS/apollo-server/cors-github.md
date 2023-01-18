### Cross origin access to a Next.js API route running apollo-server-micro #4779
- github: https://github.com/apollographql/apollo-server/issues/4779

arist0tl3 , commented on Dec 31, 2020

Hey, combined some ideas from the repo @sakhmedbayev posted as well as #2473 and came up with:

```ts
import { ApolloServer, gql } from 'apollo-server-micro';
import Cors from 'micro-cors';

const cors = Cors();

// This data will be returned by our test endpoint
const products = [
  {
    _id: 1,
    name: 'Cookie',
    price: 300,
  },
  {
    _id: 2,
    name: 'Brownie',
    price: 350,
  },
];

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  type Product {
    _id: ID
    name: String
    price: Int
  }

  type Query {
    products: [Product]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    products: () => products,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  return server.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
```

Let me know if this works for you