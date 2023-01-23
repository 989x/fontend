### "message": "Method not implemented."

```ts
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

this code something wrong error "Error: Method not implemented." how to solve problem 

The error message "Method not implemented" typically indicates that the method you're trying to call is not implemented or is not found.

In this case, the error is likely caused by the Product type not being recognized. Make sure that the Product type is defined and imported correctly, it should be imported from a file where you have defined your product model.

Also, it's important to mention that Like class is from typeorm package and you should import it from 'typeorm' like this:

```
import { Like } from 'typeorm';
```

Another thing to check is if the ORM configuration is correct, if the connection to the database is established, and if the database contains the data you are trying to fetch.

If you are still encountering the issue, please share the error message in its entirety and the relevant parts of your application's file structure and configuration.