import React, { useRef, useState } from 'react';
//import React from 'react';
import './App.css';

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
//import 'firebase/analytics';

import { useAuthState } from "react-firebase-hooks/auth"; 
import { useCollectionData } from "react-firebase-hooks/firestore";

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
//const analytics = firebase.analytics();


function SignIn () {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider ();
    auth.signInWithPopup(provider);
  }
	return (
    <>
  <button className="sign-in" onClick={signInWithGoogle}>Login com Google</button>
  <p>Não viole o guia desta comunidade ou serás banido para sempre!</p>
  </>
  );
}

function SignOut (){
  return auth.currentUser && (
    <button className="sign-out" onClick={()=> auth.signOut()}>Sair</button>
  )
}

function ChatRoom () {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Mensagem" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)

}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}

function App() {
  const [user] = useAuthState (auth);
  return (
    <div className= "App">
      <header>
      <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>
       {user ? <ChatRoom/> : <SignIn/>} 
       </section>
    </div>
  );
}

export default App;
