import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils.js';

const SignIn = () => {
  const logWithGooglePopup = async () => {
    // destructuring user from the response
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logWithGooglePopup}>Sign In with google popup</button>
    </div>
  );
};

export default SignIn;
