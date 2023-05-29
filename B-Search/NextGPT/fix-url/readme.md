I apologize for the inconvenience. It seems that the issue lies in how the `value` prop is set in the search input field and how the `handleSearchChange` function is implemented.

To allow the search field to be edited and cleared, you can update the `SearchEstatePage` component as follows:

<searchBar.tsx/>

Here's what has changed in the code:

1. Introduced a `searchInputRef` using the `useRef` hook to store a reference to the search input field.
2. Updated the `handleSearchChange` function to correctly update the `propertySearch` state.
3. Added a `handleClearSearch` function to clear the search field and focus on it after clearing.
4. Conditionally rendered the clear button based on the presence of a search value.
5. Modified the form submission logic to handle both search and clear actions.

With these changes, you should be able to edit and clear the search field properly.