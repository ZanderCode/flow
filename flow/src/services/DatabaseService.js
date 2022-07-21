import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, doc, setDoc, getDocs, collection, query} from 'firebase/firestore';

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

export async function getDocFrom(uid,onData){
    // Single Doc
    const data = onSnapshot(doc(db,"users",uid),(d)=>{
      onData(d.data());
    });

}

export async function getDocsFrom(uid,onData){
    // All Docs
    const data = collection(db,"users",uid,"pages");
    const res = await getDocs(data);
    onData(res);
}