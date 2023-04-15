import { initializeApp } from 'firebase/app'; // initializeApp creates app based off of some config
// importing authentication methods
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();

// there could be many providers for different cases
provider.setCustomParameters({
  prompt: 'select_account',
});

// one auth per application
export const auth = getAuth(); // console.firebase.google.com/ =>  Authentication page => choose Sign in option (google)
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// creating databae
export const db = getFirestore();

// getting data from authentication service (that is in sign-in.component.jsx) and storing it into the firebase
export const createUserDocumentFromAuth = async userAuth => {
  console.log(userAuth);

  // create reference for the data in firestore db
  // doc(<database>, <collection>, <document's unique id>)
  const userDocRef = doc(db, 'user', userAuth.uid);
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
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('error creating the user');
    }
  }

  // if user data exists
  // return userDocRef
  return userDocRef;
};
