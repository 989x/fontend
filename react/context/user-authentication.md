# Example of Using Context in a React Application

Here is a more realistic example of using Context in a React application, using user authentication as an example:

### 1. Create UserContext

```jsx
import React, { createContext, useState, useContext } from 'react';

// Create a Context for the user
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the Context
export const useUser = () => useContext(UserContext);
```

### 2. Create a Login Page

```jsx
import React, { useState } from 'react';
import { useUser } from './UserContext';

const LoginPage = () => {
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Assume we successfully login and get user data back
    const userData = { username: username };
    login(userData);
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
```

### 3. Create a Profile Page

```jsx
import React from 'react';
import { useUser } from './UserContext';

const ProfilePage = () => {
  const { user, logout } = useUser();

  if (!user) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Welcome, {user.username}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
```

### 4. Use UserProvider in the Main Application

```jsx
import React from 'react';
import { UserProvider } from './UserContext';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';

const App = () => {
  return (
    <UserProvider>
      <LoginPage />
      <ProfilePage />
    </UserProvider>
  );
};

export default App;
```

### Explanation

1. **UserContext**:
   - Creates a Context for the user's status (`UserContext`)
   - `UserProvider` is a Component that wraps other Components and passes user information to those Components
   - `useUser` is a custom hook that helps access data from `UserContext` more easily

2. **LoginPage**:
   - Has a form for the user to enter their username and password. When the "Login" button is clicked, it calls the `login` function from `useUser` to store the user information in the Context

3. **ProfilePage**:
   - Displays the logged-in user's information. If there is no logged-in user, it displays "Please log in." There is also a "Logout" button that calls the `logout` function to remove the user information from the Context

4. **App**:
   - Uses `UserProvider` to wrap all Components, making the user's status accessible to all Components within the Context
