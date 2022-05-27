import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks"; 
import { useCollectionData } from "react-firebase-hooks";

firebase.initializeApp({
  // tuas configs

  apiKey: "AIzaSyCZOS60YFkgXnQQD-V6zEfGCTlrbZuxyRg",
  authDomain: "chat-app-f4c75.firebaseapp.com",
  projectId: "chat-app-f4c75",
  storageBucket: "chat-app-f4c75.appspot.com",
  messagingSenderId: "349937642538",
  appId: "1:349937642538:web:a5450b5863a5c32914e753",
  measurementId: "G-XS4XK71VQK"
});
const auth = firebase.auth();
const firestore = firebase.firestore();



function SignIn () {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider ();
    auth.signInWithPopup(provider);
  }
	return (
  <button onClick={signInWithGoogle}>Login com Google</button>
  );
}

function SignOut (){
  return auth.currentUser && (
    <button onClick={()=> auth.signOut()}>SignOut</button>
  )
}

function ChatRoom () {
	return <h1>Chat</h1>
}

function App() {
  const [user] = useAuthState (auth);
  return (
    <div className= "App">
      <header>

      </header>
      <section>
       {user ? <ChatRoom/> : <SignIn/>} 
       </section>
    </div>
  );
}

export default App;
