import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import './Chat.css';
import { useSelector } from 'react-redux';
// require("dotenv").config();

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: 'find-your-clique.firebaseapp.com',
  projectId: 'find-your-clique',
  storageBucket: 'find-your-clique.appspot.com',
  messagingSenderId: '332772335668',
  appId: '1:332772335668:web:e796dd15961e0ba50eea61',
  measurementId: 'G-29CSP1MLPG',
});

const db = firebase.firestore();
console.log(db);

const auth = firebase.auth();

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  const name = useSelector(
    (state) => state.auth.firstName + ' ' + state.auth.lastName
  );
  console.log(name);

  const sendMessage = async (messge) => {
    await db.collection('chat_messages').add({
      text: messge,
      uid: auth.currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: name,
    });
    // db.collection("cities").doc("LA").set({
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    // });
    setMsg('');
  };

  useEffect(() => {
    db.collection('chat_messages')
      .orderBy('createdAt')
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div>
      <div className="chat-container">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={
              message.uid === auth.currentUser.uid ? 'sent' : 'received'
            }
          >
            <h3>{message.name}</h3>
            <p className="">{message.text}</p>
          </div>
        ))}
      </div>
      <input type="text" onChange={(ev) => setMsg(ev.target.value)} />
      <button onClick={() => sendMessage(msg)}>Send</button>
    </div>
  );
}
