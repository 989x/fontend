### create graphql resolver query data from mongodb or mock api use typescript

Here's an example of how you could use TANStack (TypeScript, Apollo, Next.js) to fetch a list of products from a Next.js API route /api/products?name=${query} using a function productFind:

1.First, you'll need to install the necessary packages: @apollo/client, graphql, and next-with-apollo. You can do this by running the following command:

```bash
npm install @apollo/client graphql next-with-apollo
```

2.Create a lib folder where you'll define your productFind function. Here's an example of how you could define the function:

```ts
import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';

const PRODUCT_FIND = gql`
  query productFind($name: String!) {
    productFind(name: $name) {
      id
      name
      description
    }
  }
`;

export const useProductFind = (name: string) => {
  const [data, setData] = useState({});
  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        query: PRODUCT_FIND,
        variables: { name },
      })
      .then((result) => {
        setData(result.data);
      });
  }, [name]);

  return data;
};
```

3.In your page component where you want to use the product find function you can use it like this:

```ts
import { useProductFind } from '../lib/productFind';

const Product = (props) => {
  const { name } = props;
  const { productFind } = useProductFind(name);

  return (
    <div>
      <h1>{productFind.name}</h1>
      <p>{productFind.description}</p>
    </div>
  );
};

Product.getInitialProps = async (context) => {
  const { name } = context.query;
  return { name };
};

export default Product;
```

This is just one way to use TANStack to fetch products data using a custom function and query using Apollo client. You should adjust the code to fit your specific needs and the structure of your application.