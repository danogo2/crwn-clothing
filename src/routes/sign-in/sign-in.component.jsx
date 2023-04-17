// FOR REDIRECT ONLY START (unnecessary if signing in with popup)
// import for signInWithGoogleRedirect
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
// FOR REDIRECT ONLY END

// other import
import {
  auth, // this is also for signing in with redirect, it's singleton that keeps track of all the authentications that has happened, even after we were redirected to another page we still remember about auth that had place before
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils.js';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';

const SignIn = () => {
  // FOR REDIRECT ONLY START
  useEffect(() => {
    const logWithGoogleRedirect = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        createUserDocumentFromAuth(response.user);
      }
    };
    logWithGoogleRedirect();
  }, []); // empty array means that it will be called only once when this component mounts for the first time
  // FOR REDIRECT ONLY END

  const logWithGooglePopup = async () => {
    // destructuring user from the response
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };

  // FOR REDIRECT ONLY START
  const logWithGoogleRedirect = async () => {
    const { user } = await signInWithGoogleRedirect();
    // this below won't happen after we are redirected
    // but once we are back to the page above useEffect will kick in and proceed with signing in using data that was stored by getRedirectResult(auth)
    createUserDocumentFromAuth(user);
  };
  // FOR REDIRECT ONLY END

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logWithGooglePopup}>Sign In with google popup</button>
      <SignUpForm />
    </div>
  );

  // FOR REDIRECT ONLY START
  // put this in return:
  // <button onClick={logWithGoogleRedirect}>
  //   Sign In with google Redirect
  // </button>
  // FOR REDIRECT ONLY END
};

export default SignIn;
