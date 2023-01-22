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