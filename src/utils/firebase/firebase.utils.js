import { initializeApp } from 'firebase/app'
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider 
  } from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAISchDsVlY4DWsT0V239EPPiJVo89n40E",
    authDomain: "crwn-clothing-db-5b2e3.firebaseapp.com",
    projectId: "crwn-clothing-db-5b2e3",
    storageBucket: "crwn-clothing-db-5b2e3.appspot.com",
    messagingSenderId: "245072862161",
    appId: "1:245072862161:web:a3d2666559faa019e09ef0"
  };
 
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  'prompt': "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

 

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        })
    } catch(error) {
      console.log("error creating the user", error.message)
  }
 
  
}
  return userDocRef
}