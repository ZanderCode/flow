import { getAuth, signInWithPopup,getAdditionalUserInfo, GoogleAuthProvider, signOut } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider(); 


// logs in returns result in callback
export async function logInClient(callback){
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const isNew = getAdditionalUserInfo(result).isNewUser;
        callback(result,isNew);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  }

// Sings out and returns callback
export async function signOutClient(callback){
    await signOut(auth);
    callback();
}
