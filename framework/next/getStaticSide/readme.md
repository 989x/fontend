### Ask

There is already an api ready. http://localhost:5000/estate/estate_id/${estate_id}

now want to connect api using nextJS
Create a file at path pages/property/[estate_id].tsx. finished

I want the frontend to work like this. http://localhost:3000/property/${estate_id}

### ChatGPT

To connect to the API using NextJS, you can use the `getStaticProps` function in your `pages/property/[estate_id].tsx` file. This function will fetch the data from the API and pass it as props to the page component.

Here's an example implementation:

<getStatic.tsx />

With this implementation, you should be able to access your property page at `http://localhost:3000/property/${estate_id}` and have it render the appropriate property data fetched from your API.