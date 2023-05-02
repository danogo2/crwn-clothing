import { initializeApp } from 'firebase/app'; // initializeApp creates app based off of some config
// importing authentication methods
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'; // authentication service
// importing firestore methods
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCr93qFIRcK-sD1Y7Z571HeZw9x5TCD9UY',
  authDomain: 'crwn-clothing-db-ce61a.firebaseapp.com',
  projectId: 'crwn-clothing-db-ce61a',
  storageBucket: 'crwn-clothing-db-ce61a.appspot.com',
  messagingSenderId: '346216680412',
  appId: '1:346216680412:web:159226d2c7e2e7bc7cdd19',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider(); // provider could be Facebook or Github or other platforms

// there could be many providers for different cases
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// one auth per application
export const auth = getAuth(); // console.firebase.google.com/ =>  Authentication page => choose Sign in option (google)
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// creating databae
export const db = getFirestore();

// getting data from authentication service (that is in sign-in.component.jsx) and storing it into the firebase
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {} // if we are signing up with email and password userAuth doesn't have displayName(null) so we are overwriting null value inside the setDoc method with the value from the form
) => {
  if (!userAuth) return;
  console.log(userAuth);

  // create reference for the data in firestore db
  // doc(<database>, <collection>, <document's unique id>)
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  // getting document snapshot
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  // checking if this document exists in our database
  console.log(userSnapshot.exists());

  // if user data does not exist
  if (!userSnapshot.exists()) {
    // create/ set the document with the data from userAuth in my collection
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  // if user data exists
  // return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  // it will be called only when email and password are provided
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
