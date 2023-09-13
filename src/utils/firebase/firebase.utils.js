import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhQlTnVgLEgfSmj8nGNxoTDaj4kZ8R_WM",
  authDomain: "crwn-clothing-v-2f7c7.firebaseapp.com",
  projectId: "crwn-clothing-v-2f7c7",
  storageBucket: "crwn-clothing-v-2f7c7.appspot.com",
  messagingSenderId: "836909354937",
  appId: "1:836909354937:web:61bff36f8b0c62331e7068"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db,'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot =  await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });

    } catch (error) {
      console.log('Error creating document');

    }
  }
  return userDocRef;

  

}
