import React, { useState } from "react";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { Outlet, useNavigate } from "react-router-dom";
import { LOGGED, URL } from "../constants/constants";
import LoadingPage from "../components/action/LoadingPage";

export default function AuthProvider() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [getLocalData, setGetLocalData] = useState(
    localStorage.getItem(LOGGED)
  );

  useEffect(() => {
    if (getLocalData) {
      return setIsLogged(true);
    } else {
      navigate(URL.signIn.path);
    }

    return () => {
      setGetLocalData(localStorage.getItem(LOGGED));
      if (getLocalData) {
        return setIsLogged(true);
      } else if (getLocalData === false) {
        return navigate(URL.signIn.path);
      }
    };
  }, [auth?.currentUser, isLogged, getLocalData]);

  return <> {getLocalData ? <Outlet /> : <LoadingPage />} </>;
}
