import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import "./Chat.css";
import { useSelector } from "react-redux";
// require("dotenv").config();

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: "keen-button-343000.firebaseapp.com",
  projectId: "keen-button-343000",
  storageBucket: "keen-button-343000.appspot.com",
  messagingSenderId: "564886534054",
  appId: "1:564886534054:web:ff62c463bebe5059194167",
});

const db = firebase.firestore();
console.log(db);

const auth = firebase.auth();

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const name = useSelector(
    (state) => state.auth.firstName + " " + state.auth.lastName
  );
  console.log(name);

  const sendMessage = async (messge) => {
    await db.collection("chat_messages").add({
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
    setMsg("");
  };

  useEffect(() => {
    db.collection("chat_messages")
      .orderBy("createdAt")
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
              message.uid === auth.currentUser.uid ? "sent" : "received"
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
