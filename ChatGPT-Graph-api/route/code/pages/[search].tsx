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