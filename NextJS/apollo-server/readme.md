### problems

🔥 Unable to reach server

Try one of these solutions:

- Embed Sandbox on your own website 
- To diagnose the problem, please run:
```
npx diagnose-endpoint@1.1.0 --endpoint=http://localhost:3000/api/graphql
```

### after
```
npx diagnose-endpoint@1.1.0 --endpoint=http://localhost:3000/api/graphql
Diagnosing http://localhost:3000/api/graphql
⚠️  OPTIONS response is missing header 'access-control-allow-methods: POST'
⚠️  POST response missing 'access-control-allow-origin' header.
If using cookie-based authentication, the following headers are required from your endpoint:
    access-control-allow-origin: https://studio.apollographql.com
    access-control-allow-credentials: true
Otherwise, a wildcard value would work:
    access-control-allow-origin: *
(📫 Interested in previewing a local tunnel to bypass CORS requirements? Please let us know at https://docs.google.com/forms/d/e/1FAIpQLScUCi3PdMerraiy6GpD-QiC_9KEKVHr4oDL5Vef5fIvzqqQWg/viewform )
```