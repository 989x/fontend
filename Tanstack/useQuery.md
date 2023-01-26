### 🐣 How to use useQuery inside the useEffect #4873
- https://github.com/TanStack/query/discussions/4873#discussioncomment-4780214

Guides

1.React query with react hook form #4844
- https://github.com/TanStack/query/discussions/4844

2.useQuery hook not updated after parameter changes #2347
- https://github.com/TanStack/query/discussions/2347

### 🐣 Solution
My code can solve the problem by just adding props.name into the queryKey and after that useQuery can be used in useEffect.
```ts
    const [posts, setPosts] = useState([]);

    const { isLoading, error, data } = useQuery({
        queryKey: ['products', props.name],
        queryFn: () =>
        productFind({name: props.name}),
    })
    console.log("isLoading", data)

    if(isLoading) return <div>loading...</div>

    useEffect(() => {
        setPosts(data?.productFind), [data?.productFind]
    })
```

### 🐣 Advice
1. Paragraph 1

Firstly, hooks can only be called at the top level of a function component or hook, not within an effect callback function.

To achieve what you're looking for, you just need to include the name of the product you want to search for in the query key. This will mean that when the product name is updated, a new query is created that will run the query function for the new product name.

Please also see: https://tkdodo.eu/blog/effective-react-query-keys

As an aside, you probably don't need to derive the posts state from the data returned from the query hook. Once you start calling the hook at the top level and using the suggested query key, data will contain whatever the query function successfully resolves with and be in the necessary scope.

2. Paragraph 2

For what it's worth if you want to derive another piece of state from the data returned by the query (which you usually don't want to do, for the record) you can do this in an onSuccess callback and omit the effect entirely.

Tangentially, your effect probably isn't doing what you think it is. The first argument to useEffect is a callback function and the second argument is the dependency array. You're only passing a single argument and it looks like you might be trying to supply a dependency array.

### 🐣 Dependent Queries
- https://tanstack.com/query/v4/docs/react/guides/dependent-queries

```ts
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
```