### Ask 1

This code can work well. But there will be a problem with the request api.
Because the user will be able to press the search button repeatedly.
This operation is almost no different from pressing f5 to refresh the page.

<search-dev.tsx />

### ChatGPT

It seems like you are concerned about users making repeated API requests when pressing the search button multiple times. To address this issue, you can disable the search button while a request is in progress, preventing users from triggering multiple requests before the first one is completed. Additionally, you can show a loading indicator to inform the user that the search is in progress.

Here's an updated version of your code with these changes:

<search-done.tsx />

This code introduces the `isSearching` state to keep track of whether a search is in progress. The button is disabled while `isSearching` is true, and a loading indicator is shown to indicate that the search is ongoing. The button is re-enabled once the search is complete.



<br />

### Ask 2

But there's still a problem.
Suppose the value in the input is simple, but people can continue searching as before.

I'd like to add a condition. If the value in the input is the original value, there is no need to send the value. Because even if you press search again, it's already the same value.

### ChatGPT

Certainly! To achieve that, you can add a check to see if the current search value is the same as the previous one. If they are the same, you can avoid making the API request. Here's how you can modify your code:

<search-done.tsx />

In this modification, I added a `previousSearch` state to keep track of the previous search value. Before making the API request, it checks if the current search value is the same as the previous one. If they are the same, it prevents making the request. After a successful search, it updates the `previousSearch` value.



<br />

### Ask 3

SearchBlogs, Can I limit the number of search words to no more than 80 characters?

### ChatGPT

Certainly! You can limit the number of search words to no more than 80 characters by adding a validation check when submitting the form. Here's how you can modify the `handleSubmit` function in the `SearchBlogs` component to achieve this:

<search-done.tsx />

In this modification, the `trimmedSearch` variable is created to limit the number of search words to 80 characters using the `slice` method. The search value used in the query and stored in the `previousSearch` state is the trimmed version. This ensures that the search request is based on the limited character count.
