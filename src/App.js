import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


function ChatRoom () {
	return <h1>Chat</h1>
}

function SingIn () {
	return <h1>Login</h1>
}
function App() {
  return (
    <div className= "App">
       {user ? <ChatRoom/>:<SingIn/>}
    </div>
  );
}

export default App;
