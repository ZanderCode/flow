import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, query, collection, getDocs, doc, addDoc, setDoc } from 'firebase/firestore';

// Downloaded data JSON from firebase console.
function getFirebaseConfig(){
    return {
      apiKey: "AIzaSyAwJYXxZFi3xcO9jROBramhblA_Ml6wVaQ",
      authDomain: "flow-a7455.firebaseapp.com",
      projectId: "flow-a7455",
      storageBucket: "flow-a7455.appspot.com",
      messagingSenderId: "987763281220",
      appId: "1:987763281220:web:fc375f9578ab5a92c69b11"
    };
}

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export async function logInClient(callback){
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        callback(result);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  }

export async function signOutClient(callback){
    await signOut(auth);
    callback();
}

// Creates a spot in the users database for this user.
export async function initializeFirebaseFlows(uid){
    try {
      const data = {
        // Each user has a Flow Page. Each Flow Page contains nodes and such.
        page: {
          // 0 : some data
          // 1 : ... 
          content: ""
        }
      }
  
      const ref = doc(db,"users", uid);
      const res = await setDoc(ref, data);  

    } catch (e) {
      console.error(e);
    }
}

export async function getDataFrom(db, uid){
    const q = query(collection(db, "users", uid));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }