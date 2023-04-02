import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app, auth, provider } from "../../firebase/firebase";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { LOGGED, MYTODOLIST, URL } from "../../constants/constants";
import LoginIcon from "@mui/icons-material/Login";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import { useEffect } from "react";
import LoadingPage from "../action/LoadingPage";

const useStyles = createUseStyles({
  fonImgDiv: {
    height: "100vh",
    backgroundColor: "grey",
  },
  title: {
    textAlign: "center",
    position: "absolute",
    left: "47%",
    top: "30%",
    color: "white",
  },
  signInBtn: {
    position: "absolute",
    left: "47%",
    top: "50%",
  },
});

export default function Signin() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [islogged, setIsLogged] = useState(false);
  const db = getFirestore(app);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        return result;
      })
      .then(async (result) => {
        const docRef = doc(db, result.user.email, MYTODOLIST);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(docRef, {
            todos: [],
          });
        }
        return result;
      })
      .then((result) => {
        localStorage.setItem(LOGGED, result.user.email);
      })
      .then(() => {
        return navigate(URL.myTodos.path);
      })
      .catch(() => {
        return console.log("Error");
      });
  };

  useEffect(() => {
    if (localStorage.getItem(LOGGED)) {
      navigate(-1);
    } else {
      setIsLogged(null);
    }
  }, [auth.currentUser, islogged]);

  return (
    <>
      {islogged ? (
        <LoadingPage />
      ) : islogged === false ? null : (
        <div className={classes.fonImgDiv}>
          <h1 className={classes.title}> Sign In </h1>
          <Button
            variant="contained"
            className={classes.signInBtn}
            onClick={signIn}
          >
            Sign in <LoginIcon />
          </Button>
        </div>
      )}
    </>
  );
}
