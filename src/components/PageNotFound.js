import React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  div: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "grey",
  },
  icon: {
    width: 350,
    height: 100,
  },
});

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <SentimentVeryDissatisfiedIcon className={classes.icon} />
      <h1> Error 404 </h1>
      <h4> Page not found! </h4>
    </div>
  );
}
