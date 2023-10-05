## Ask

### Ask 1

This code can work well. But there will be a problem with the request api.
Because the user will be able to press the search button repeatedly.
This operation is almost no different from pressing f5 to refresh the page.

### ChatGPT

It seems like you are concerned about users making repeated API requests when pressing the search button multiple times. To address this issue, you can disable the search button while a request is in progress, preventing users from triggering multiple requests before the first one is completed. Additionally, you can show a loading indicator to inform the user that the search is in progress.

Here's an updated version of your code with these changes:

...code

### Ask 2

But there's still a problem.
Suppose the value in the input is simple, but people can continue searching as before.

I'd like to add a condition. If the value in the input is the original value, there is no need to send the value. Because even if you press search again, it's already the same value.

### ChatGPT

Certainly! To achieve that, you can add a check to see if the current search value is the same as the previous one. If they are the same, you can avoid making the API request. Here's how you can modify your code:

...code

In this modification, I added a previousSearch state to keep track of the previous search value. Before making the API request, it checks if the current search value is the same as the previous one. If they are the same, it prevents making the request. After a successful search, it updates the previousSearch value.
