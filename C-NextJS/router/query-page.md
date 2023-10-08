### Ask

This code encounters a problem when handlingPageChange. and change the button number
But found that currentPage always returns the value 1.

```js
  useEffect(() => {
    setEstatesData(estates);

    // Calculate the total number of pages based on totalRecords and page size
    const pageSize = 12; // Set your desired page size
    const totalPages = Math.ceil(totalRecords / pageSize);

    setHowManyPages(totalPages);
    setCurrentPage(1); // reset the current page when the data changes
  }, [estates, totalRecords]);
```

### ChatGPT

It seems like the issue might be related to how you're handling the page query parameter in the `getServerSideProps` function and how it interacts with the `currentPage` state in the `Properties` component.

When you first load the page, the `getServerSideProps` function is called on the server side, and the `page` parameter is taken from the query. However, in your `useEffect` in the `Properties` component, you always set `currentPage` to 1, which might be overwriting the value obtained from the query.

To fix this, you can update the `setCurrentPage` in the `useEffect` only if the `page` parameter is present in the query. This way, the initial `currentPage` will be set based on the query parameter, and subsequent changes will be handled by the `handlePageChange` function.

Here's the modified `useEffect`:

```js
useEffect(() => {
  setEstatesData(estates);

  // Calculate the total number of pages based on totalRecords and page size
  const pageSize = 12; // Set your desired page size
  const totalPages = Math.ceil(totalRecords / pageSize);

  setHowManyPages(totalPages);

  // Set the current page only if the page parameter is present in the query
  if (router.query.page) {
    setCurrentPage(parseInt(router.query.page as string, 10));
  } else {
    setCurrentPage(1);
  }
}, [estates, totalRecords, router.query.page]);
```

This modification checks if the `page` parameter is present in the query before setting the `currentPage`. If it's present, it uses the value from the query; otherwise, it defaults to 1.

Make sure to test this thoroughly to ensure it resolves the issue you're encountering.
