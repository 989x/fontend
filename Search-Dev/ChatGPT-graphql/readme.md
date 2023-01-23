### create api can get database by using `/api/products?name=${query}` with graphql query and resolver use typescript

Here's an example of how you could create an API endpoint using GraphQL and TypeScript to fetch products from a database based on a search query:

1.First, you'll need to install the necessary packages: graphql, apollo-server, and type-graphql. You can do this by running the following command:

Copy code
```
npm install graphql apollo-server type-graphql
```

2.Create a schema.ts file where you'll define your GraphQL schema. Here's an example of how you could define a Product type and a Query type that has a products field that takes a name argument:

Copy code
```ts
import { gql, buildSchema } from 'type-graphql';

const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    description: String
  }

  type Query {
    products(name: String): [Product]
  }
`);

export default schema;
```

3.Create a resolvers folder where you'll define your resolvers. Here's an example of how you could define a ProductResolver class with a products method that fetches products from the database based on the name argument:

Copy code
```ts
import { Query, Resolver } from 'type-graphql';
import { Product } from './entity/Product';

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products(@Arg("name") name: string) {
    // Fetch products from database using name parameter
    const products = await Product.find({ where: { name: Like(`%${name}%`) } });
    return products;
  }
}
```

4.Create an index.ts file where you'll set up your Apollo server and define which schema and resolvers to use:

Copy code
```ts
import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import schema from './schema';
import { ProductResolver } from './resolvers/ProductResolver';

createConnection().then(async (connection) => {
  const server = new ApolloServer({
    schema,
    resolvers: [ProductResolver],
  });

  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
});
```
In this example, I am using typeorm to connect to the database and fetch data based on the name parameter passed in the query, you can use any ORM or querybuilder that you prefer.

This is just one example of how you could set up a GraphQL API with TypeScript to fetch products from a database based on a search query. You should adjust the code to fit your specific needs and the structure of your application.