import { initializeApp } from 'firebase/app'; // initializeApp creates app based off of some config
// importing authentication methods
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'; // authentication service
// importing firestore methods
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  // both methods below are needed to upload SHOP_DATA to respective collections in firestore database
  collection,
  writeBatch,
  getDocs,
  query,
} from 'firebase/firestore';
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
// auth keeps track whether user is signed in or signed out, it holds to this info between page refreshes
export const auth = getAuth(); // console.firebase.google.com/ =>  Authentication page => choose Sign in option (google)
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// creating databae
export const db = getFirestore();

// method to upload data(category objects from SHOP_DATA) as documents to collections in firestore db
/* EXAMPLE OF DB STRUCTURE: 
  collection (eg. users, categories) 
=>
  document (eg. womens, hats, jackets, userId_JK893BJSA675) 
 => 
  {createdAt: May 14, 2023 at 12:24:19 PM UTC+2, displayname: "danogo", email: "xdoggen@gmail.com"}
  */
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // getting specific collection from db
  const collectionRef = collection(db, collectionKey);
  // transaction, all actions batched together
  const batch = writeBatch(db);
  // setting all objects as documents in firebase collection through attaching batch.set(docRef, obj) to every obj
  objectsToAdd.forEach(obj => {
    // docRef points us to the specific location for title key inside of collectionRef
    //here collectionsRef knows which db we're using from specifying it above, no need to specify db again
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    // set docRef location with the value of obj
    batch.set(docRef, obj);
  });

  // awaiting for batched actions to complete
  await batch.commit();
  console.log('done');
};

// method to get data from firebase
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  //generate query
  const q = query(collectionRef);
  // fetch document snapshots(data itself)
  const querySnapshot = await getDocs(q); //<Array>

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

// HELPER functions
// getting data from authentication service (that is in sign-in.component.jsx) and storing it into the firebase
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {} // if we are signing up with email and password userAuth doesn't have displayName(null) so we are overwriting null value inside the setDoc method with the value from the form
) => {
  if (!userAuth) return;
  // console.log(userAuth);

  // create reference for the data in firestore db
  // doc(<database/collection_ref>, <collection_title>, <document's_unique_id>)
  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userDocRef);

  // getting document snapshot
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);

  // checking if this document exists in our database
  // console.log(userSnapshot.exists());

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

export const signOutUser = async () => await signOut(auth);

// observer listening to user actions, onAuthStateChange(auth, callback that runs whenever auth's state changes (sign in / sign out))
// onAuthStateChanged returns unsubscribe method that stops observing, should be called on unmount (useEffect callback return)
export const onAuthStateChangedListener = callback =>
  onAuthStateChanged(auth, callback); //
