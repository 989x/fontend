## Asking

In this section of code, there are too many if and else if statements,
I don't know if this will make the code run slower.

Or is there a better way? You can customize the code.

<formatDate-past />

## ChatGPT

The code you've provided seems to work fine for formatting a date difference into a human-readable string. However, you're right that it has multiple if-else if statements, which can make the code less readable and harder to maintain over time. Here's a refactored version of your code that uses a more concise and structured approach:

<formatDate-update />

In this refactored version, we define an array of time units along with their singular and plural forms. Then, we use a loop to iterate through these units and check which one is suitable for formatting the time difference. This approach reduces code duplication and makes it easier to add or modify time units in the future.

This code should run at a similar speed to your original code, and it's more maintainable and readable.