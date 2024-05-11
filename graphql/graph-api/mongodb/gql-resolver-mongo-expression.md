### Input promp
Use typescript,
create graphql resolver query data from mongodb,
and create mongo find expression 
if name = “all” return name = “ ”
if type = “all” return type = “ ”

### chatGPT response

Here's an example of how you can create a GraphQL resolver in TypeScript to query data from MongoDB with a dynamic find expression based on the inputs:

1.First, you'll need to install the necessary packages: mongoose, graphql, apollo-server, and type-graphql. You can do this by running the following command:

```
npm install mongoose graphql apollo-server type-graphql
```

2.Connect to your MongoDB database in a separate file, for example db.ts

```ts
import mongoose from 'mongoose';

const connectionString = 'mongodb://localhost:27017/your_db_name';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});
```

3. Create a MongoDB model for your data, for example Product.ts. This will define the structure of your data in the database.

```ts
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
});

export const Product = mongoose.model('Product', productSchema);
```

4. Create a schema.ts file where you'll define your GraphQL schema. Here's an example of how you could define a Product type and a Query type that has a products field that takes two arguments, name and type:

```ts
import { gql, buildSchema } from 'type-graphql';

const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    type: String!
  }

  type Query {
    products(name: String, type: String): [Product]
  }
`);

export default schema;
```

5. Create a resolvers folder where you'll define your resolver. Here's an example of how you could define a ProductResolver class with a products method that takes two arguments, name and type, and returns a list of products based on the inputs:

```ts
import { Query, Resolver, Arg } from 'type-graphql';
import { Product } from './models/Product';

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products(
    @Arg("name") name: string,
    @Arg("type") type: string
  ) {
    // You can implement your logic here to return the product based on the inputs.
    let nameQuery = {};
    if (name !== 'all') {
      nameQuery = { name };
    }
    
    let typeQuery = {};
    if (type !== 'all') {
      typeQuery = { type };
    }

    return await Product.find({...nameQuery, ...typeQuery});
  }
}
```

6. Create an index.ts file where you'll set up your Apollo server and define which schema and resolver to use:

```ts
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { ProductResolver } from './resolvers/ProductResolver';

const server = new ApolloServer({
    schema,
    resolvers: [ProductResolver],
  });

server.listen().then(({ url }) =>
```