### Input promp
Read code below,

  @Query(() => Estate, { nullable: true })
  estate(@Arg("name", () => String) name: string): Estate | undefined {
    const estate = estates.find((estate) => estate.name === name);
    if (estate === undefined) {
      throw new Error("Estate not found");
    }
    return estate;
  }

And change this to function in mongodb

### chatGPT response

Here is an example of how the code could be changed to use a MongoDB database instead:

```ts
import { Query, Arg, Resolver } from 'type-graphql';
import { Estate } from './models/Estate';

@Resolver()
export class EstateResolver {
  @Query(() => Estate, { nullable: true })
  async estate(@Arg("name", () => String) name: string): Promise<Estate | undefined> {
    const estate = await Estate.findOne({ name });
    if (!estate) {
      throw new Error("Estate not found");
    }
    return estate;
  }
}
```

In this example, `Estate` is the MongoDB model that represents the estate data, and the `EstateResolver` is a GraphQL resolver that uses the `Estate` model to query the database. The `findOne` method of the `Estate` model is used to search for a single estate with the specified `name`. If no estate is found, the `findOne` method will return `null`, and the resolver will throw an error.