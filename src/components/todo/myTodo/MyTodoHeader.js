import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import NavigateList from "../../link/NavigateList";
import { auth } from "../../../firebase/firebase";

const useStyles = createUseStyles({
  myTodosHeaderTitle: {
    margin: 0,
    textAlign: "center",
    color: "green",
  },
});

export default function MyTodoHeader() {
  const classes = useStyles();
  const [isShowUrl, setIsShowUrl] = useState(false);
  const [uesrId, setUserId] = useState("");

  useEffect(() => {
    setUserId(auth?.currentUser?.email);
  }, [auth.currentUser]);

  return (
    <div>
      <Button
        onClick={() => {
          setIsShowUrl(!isShowUrl);
        }}
      >
        <CoPresentIcon />
        {isShowUrl ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
      </Button>
      <span> {uesrId} </span>
      {isShowUrl && <NavigateList />}
      <h2 className={classes.myTodosHeaderTitle}> My Todos </h2>
    </div>
  );
}
