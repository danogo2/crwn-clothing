import { createContext, useEffect, useReducer } from 'react';
/* createContext is a way to share data between components without having to pass down props manually at every level of the component tree. 
  Call createContext outside of any components to create a context.
  const SomeContext = createContext(null); //createContext(<default_value>) set default value to null if there isn't any
  <SomeContext.Provider value='Shared Top Secret Value'>
    <MyComponent />
  </SomeContext.Provider>
*/
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

import { createAction } from '../utils/reducer/reducer.utils';

// ################ User Context ##############

// createContext(defaultValue)
// defaultValue: The value that you want the context to have when there is no matching context provider in the tree above the component that reads context. If you don’t have any meaningful default value, specify null. The default value is meant as a “last resort” fallback. It is static and never changes over time.
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
  console.log('dispatched');
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} of action in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  // UserProvider allows any of its children to have access to its useState values
  //// const [currentUser, setCurrentUser] = useState(null);
  // Instead of useState we are using useReducer!!!
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  const setCurrentUser = user => {
    dispatch(createAction('SET_CURRENT_USER', user));
  };

  // value that we pass to our Provider that we want all of its children to have access to
  const value = { currentUser, setCurrentUser };
  console.log('currentUser:', currentUser);
  // sign out when this component mounts. It is needed because our auth singleton remembers that we are logged in even after page refresh
  //// signOutUser(); // doesn't work
  // when this component mounts set auth state change observer, has to be cleared when component unmounts to prevent memory leak
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      // user is a user value provided by onAuthStateChanged
      // this callback is called first when observer is set during the component mount and then on every auth state change
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
