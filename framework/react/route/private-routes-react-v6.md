# Private Routes in React Router v6

This guide demonstrates how to create and use private routes in React Router v6.

## Overview

In React Router v6, the approach to private routes has changed. The `Redirect` component is replaced by `Navigate`, and `Route` is now used differently.

## Implementation

### Basic Example

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth'; // Assume useAuth is a custom hook for authentication

const Public = () => <div>Public</div>;
const Private = () => <div>Private</div>;

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Public />} />
        <Route
          path="/private"
          element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Using Outlet for Nested Routes

```jsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';

function PrivateOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/private-outlet" element={<PrivateOutlet />}>
          <Route path="/private" element={<Private />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## Conclusion

By using `Navigate` and restructuring the use of `Route`, you can effectively manage private routes in React Router v6. For more detailed examples and use cases, refer to the [React Router documentation](https://reactrouter.com/).

## Resources

- [React Router v6 Documentation](https://reactrouter.com/)
- [Article on DEV Community](https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5)
