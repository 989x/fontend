### GraphQL query multiple inputs resolver , typescript

Here's an example of how you could create a GraphQL resolver with multiple inputs in TypeScript:

1. First, you'll need to install the necessary packages: `graphql`, `apollo-server`, and `type-graphql`. You can do this by running the following command:

```bash
npm install graphql apollo-server type-graphql
```

2. Create a `schema.ts` file where you'll define your GraphQL schema. Here's an example of how you could define a `Product` type and a `Query` type that has a `product` field that takes two arguments, `name` and `description`:

```ts
import { gql, buildSchema } from 'type-graphql';

const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    description: String
  }

  type Query {
    product(name: String, description: String): Product
  }
`);

export default schema;
```

3. Create a `resolvers` folder where you'll define your resolver. Here's an example of how you could define a `ProductResolver` class with a `product` method that takes two arguments, `name` and `description`, and returns a product based on the inputs:

```ts
import { Query, Resolver, Arg } from 'type-graphql';

@Resolver()
export class ProductResolver {
  @Query(() => Product)
  product(
    @Arg("name") name: string,
    @Arg("description") description: string
  ) {
    // You can implement your logic here to return the product based on the inputs.
    // For this example, let's assume that you have an array of products defined as follows:
    const products = [
      {
        id: 1,
        name: "Product 1",
        description: "This is the first product."
      },
      {
        id: 2,
        name: "Product 2",
        description: "This is the second product."
      }
    ];

    // Return the product that matches the inputs.
    return products.find(product => product.name === name && product.description === description);
  }
}
```

4. Create an `index.ts` file where you'll set up your Apollo server and define which schema and resolver to use:

```ts
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { ProductResolver } from './resolvers/ProductResolver';

const server = new ApolloServer({
    schema,
    resolvers: [ProductResolver],
  });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

In this example, the `ProductResolver` class has a `product` method that takes two arguments, `name` and `description`, and returns a product based on the inputs. The `product` field in the `Query` type takes the same two arguments, allowing you to query for a specific product based on its `name` and `description`.
