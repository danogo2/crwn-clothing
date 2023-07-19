import { createContext, useState, useEffect } from 'react';
/* createContext is a way to share data between components without having to pass down props manually at every level of the component tree. 
  Call createContext outside of any components to create a context.
  const SomeContext = createContext(null); //createContext(<default_value>) set default value to null if there isn't any
  <SomeContext.Provider value='Shared Top Secret Value'>
    <MyComponent />
  </SomeContext.Provider>
*/
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// ################ User Context ##############
// treat as actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  // UserProvider allows any of its children to have access to its useState values
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  // sign out when this component mounts. It is needed because our auth singleton remembers that we are logged in even after page refresh
  // signOutUser();
  // when this component mounts set auth state change observer, has to be cleared when component unmounts to prevent memory leak
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      // user is a user value provided by onAuthStateChanged
      // this callback is called first when observer is set during the component mount and then on every auth state change
      console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    // when this component UNMOUNTS useEffect will run whatever is returned from this callback
    return unsubscribe;
  }, []);
  // Every child component will be able to access currentUser and call setCurrentUser()
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
