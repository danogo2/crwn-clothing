import { createContext, useState } from 'react';
/* createContext is a way to share data between components without having to pass down props manually at every level of the component tree. 
  Call createContext outside of any components to create a context.
  const SomeContext = createContext(null); //createContext(<default_value>) set default value to null if there isn't any
  <SomeContext.Provider value='Shared Top Secret Value'>
    <MyComponent />
  </SomeContext.Provider>
*/

// treat as actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  // UserProvider allows any of its children to have access to its useState values
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  console.log('currentUser from UserProvider:', currentUser);
  // Every child component will be able to call currentUser and setCurrentUser
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
