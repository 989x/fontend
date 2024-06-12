# React + Redux Container Pattern Documentation

## Overview
The article on The Great Code Adventure discusses the React + Redux container pattern, a method used to separate data management from UI components in web applications. This pattern divides components into two categories: container components and presentational components.

## Container Components
- Responsible for managing state and handling logic using Redux.
- Fetch data and pass it down as props to presentational components.
- Handle user interactions by dispatching Redux actions.

## Presentational Components
- Focus solely on rendering the UI based on props received.
- Do not manage any state or data fetching logic.

## Benefits
- Improved code maintainability by adhering to the Single Responsibility Principle.
- Enhanced readability and reusability of components.
- Clear separation of concerns, making it easier to test and debug.

## Example
The article provides an example involving a student attendance tracking application:

1. **Container Component**: Fetches attendance data from a Redux store and passes it to a presentational component.
2. **Presentational Component**: Displays the attendance data and invokes callbacks for user interactions, such as marking attendance.

This approach ensures that the UI components remain simple and focused on rendering, while the data handling is managed separately, making the overall application more modular and easier to maintain.

For more details and the full example, you can read the original article [here](https://www.thegreatcodeadventure.com/the-react-plus-redux-container-pattern/).

## Example Implementation

### Container Component (StudentAttendanceContainer.js)
```javascript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAttendance } from '../actions';
import StudentAttendance from './StudentAttendance';

const StudentAttendanceContainer = () => {
  const dispatch = useDispatch();
  const attendance = useSelector(state => state.attendance);
  const loading = useSelector(state => state.loading);
  
  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  return <StudentAttendance attendance={attendance} loading={loading} />;
};

export default StudentAttendanceContainer;
```

### Presentational Component (StudentAttendance.js)
```javascript
import React from 'react';

const StudentAttendance = ({ attendance, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Student Attendance</h1>
      <ul>
        {attendance.map(student => (
          <li key={student.id}>
            {student.name}: {student.attendance ? 'Present' : 'Absent'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentAttendance;
```

### Redux Actions (actions.js)
```javascript
export const fetchAttendance = () => {
  return async dispatch => {
    dispatch({ type: 'FETCH_ATTENDANCE_REQUEST' });
    const response = await fetch('/api/attendance');
    const data = await response.json();
    dispatch({ type: 'FETCH_ATTENDANCE_SUCCESS', payload: data });
  };
};
```

### Redux Reducer (reducer.js)
```javascript
const initialState = {
  attendance: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ATTENDANCE_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_ATTENDANCE_SUCCESS':
      return { ...state, loading: false, attendance: action.payload };
    default:
      return state;
  }
};

export default reducer;
```

## Project Structure

Here’s an example project structure for a React + Redux application using the container pattern:

```
my-app/
├── public/
│   └── index.html
├── src/
│   ├── actions/
│   │   └── index.js
│   ├── components/
│   │   └── StudentAttendance.js
│   ├── containers/
│   │   └── StudentAttendanceContainer.js
│   ├── reducers/
│   │   └── index.js
│   ├── store/
│   │   └── configureStore.js
│   ├── App.js
│   ├── index.js
│   └── styles/
│       └── App.css
└── package.json
```

### Explanation:
1. **public/index.html**: The HTML template.
2. **src/actions/index.js**: Contains Redux actions like `fetchAttendance`.
3. **src/components/StudentAttendance.js**: The presentational component.
4. **src/containers/StudentAttendanceContainer.js**: The container component.
5. **src/reducers/index.js**: The Redux reducer managing the state.
6. **src/store/configureStore.js**: Configures the Redux store.
7. **src/App.js**: The main App component.
8. **src/index.js**: The entry point for React.
9. **src/styles/App.css**: CSS styles for the application.

This structure keeps the project organized, making it easier to manage and scale.
