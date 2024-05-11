# Troubleshooting: Uncaught Error - Cannot Find Module 'react/jsx-runtime'

## Additional Resources

For more insights and discussions on this error, refer to the following Stack Overflow thread:

[Uncaught Error: Cannot find module 'react/jsx-runtime'](https://stackoverflow.com/questions/65913201/uncaught-error-cannot-find-module-react-jsx-runtime)

## Error Description

When consuming the component library in an application, bundling may occur in the wrong order, leading to the following error:

```bash
bundle.js:99 Uncaught Error: Cannot find module 'react/jsx-runtime'
    at webpackMissingModule (bundle.js:99)
    at Module.../../../component-library/dist/index.es.js 
```

## Solution

To resolve this issue, follow these steps:

1. Remove existing dependencies and lock file:

```bash
rm -rf node_modules package-lock.json
```

2. Reinstall dependencies:

```bash
npm i
```
