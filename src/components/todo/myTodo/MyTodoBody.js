import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import {
  arrayRemove,
  doc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { app, auth } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuid } from "uuid";
import MyTodoList from "./MyTodoList";
import MyTodoHeader from "./MyTodoHeader";
import Footer from "../addTodo/Footer";
import LoadingPage from "../../action/LoadingPage";
import { LOGGED, MYTODOLIST } from "../../../constants/constants";

const useStyles = createUseStyles({
  parentDiv: {
    minHeight: "100vh",
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "center",
  },
  div: {
    width: "60%",
    margin: "auto",
    position: "relative",
    border: [1, "black", "solid"],
    backgroundColor: "white",
  },
});

export default function MyTodoBody() {
  const db = getFirestore(app);
  const classes = useStyles();
  const [userId, setUserId] = useState(localStorage.getItem(LOGGED));
  const [myTodos, setMyTodos] = useState(null);
  const docRef = doc(db, userId, MYTODOLIST);

  // delete item
  const onDelete = (item) => {
    updateDoc(docRef, {
      todos: arrayRemove(item),
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.email) 
        getData()
      }
    });

    getData();
  }, [auth.currentUser, userId]);

  // getData
  const getData = () => {
    if (auth.currentUser) {
      onSnapshot(docRef, (doc) => {
        setMyTodos(doc.data()?.todos.reverse());
      });
    }
  };

  return (
    <div className={classes.parentDiv}>
      <div className={classes.div}>
        <MyTodoHeader />
        {myTodos === null ? (
          <LoadingPage />
        ) : (
          myTodos?.map((todo) => {
            return <MyTodoList key={uuid()} todo={todo} onDelete={onDelete} />;
          })
        )}
        <Footer todos={myTodos} />
      </div>
    </div>
  );
}
