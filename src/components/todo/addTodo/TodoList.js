import { Box, Button } from "@mui/material";
import React from "react";
import { v4 as uuid } from "uuid";
import TodoBody from "./TodoBody";
import SendIcon from "@mui/icons-material/Send";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { app, auth } from "../../../firebase/firebase";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { URL, MYTODOLIST } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import SnackbarShow from "../../action/Snackbar";

export default function TodoList(props) {
  const { todos } = props;
  const db = getFirestore(app);
  const [userId, setUserId] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.email);
      }
    });
  }, [auth.currentUser]);

  const updateMyTodoList = async () => {
    try {
      await updateTodoList();
      await navigate(URL.myTodos.path);
    } catch {
      setIsFailed(true);
      setTimeout(() => {
        setIsFailed(false);
      }, 5000);
    }
  };
  // update my todos
  const updateTodoList = () => {
    todos.forEach((todo) => {
      const itemDoc = doc(db, userId, MYTODOLIST);

      (async () => {
        await updateDoc(itemDoc, {
          todos: arrayUnion(todo),
        });
      })();
    });
  };

  return (
    <Box>
      {todos.map((todo) => {
        return (
          <div key={uuid()}>
            <TodoBody
              todo={todo}
              onEdit={props.onEdit}
              edit={props.edit}
              onDelete={props.onDelete}
            />
          </div>
        );
      })}
      <Footer todos={todos} />
      <Button
        fullWidth
        disabled={!todos.length}
        variant="contained"
        color="success"
        onClick={updateMyTodoList}
      >
        Save <SendIcon />
      </Button>
      {isFailed && <SnackbarShow />}
    </Box>
  );
}
