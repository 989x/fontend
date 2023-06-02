### how to do nextjs search and filter product name with dynamic router using typescript

You can use Next.js's dynamic routing to create a search page that filters products by name. Here's an example of how you could implement this:

1.Create a new file in your pages directory called [search].tsx. This will be your search page, and the [search] part tells Next.js to treat this as a dynamic route.

2.In this file, define a function called Search that will be responsible for rendering the search page. This function should accept a query parameter that will contain the search query.

```ts
import { useEffect, useState } from 'react';

interface Props {
  query: string;
}

const Search = ({ query }: Props) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch the search results from your API
    // Here is an example how to filter product name 
    // assuming you have an endpoint to get all products
    const fetchData = async () => {
      const response = await fetch(`/api/products?name=${query}`);
      const data = await response.json();
      setSearchResults(data);
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <ul>
        {searchResults.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
```

3.Create a new file in your pages directory called search.tsx that will handle the search form and redirect the user to the search page with the query as a parameter.

```ts
import { useState } from 'react';
import Router from 'next/router';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    Router.push({
      pathname: '/search',
      query: { q: query },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchPage;
```

4.Finally, you will need to add a route to your next.config.js that maps the search route to the search.tsx file

```ts
module.exports = {
  async rewrites() {
    return [
      {
        source: '/search',
        destination: '/search',
      },
    ];
  },
};
```

This is just one way to implement search and filter with Next.js and TypeScript. There are many other ways to achieve this and you should adjust the code to fit your specific needs and the structure