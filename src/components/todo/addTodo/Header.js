import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import QueueIcon from "@mui/icons-material/Queue";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { URL } from "../../../constants/constants";

const useStyles = createUseStyles({
  box: {
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Header(props) {
  const { addTodo, edit, setEdit, item, updatedItem } = props;
  const classes = useStyles();
  const location = useLocation();
  const [itemName, setItemName] = useState(`${edit ? item.todoName : ""}`);

  const buttonAction = () => {
    if (edit) {
      return (
        item && setItemName("") + setEdit(false) + updatedItem(item, itemName)
      );
    } else if (location.pathname === URL.add.path) {
      return itemName && addTodo(itemName) + setEdit(false) + setItemName("");
    }
  };
  useEffect(() => {
    if (edit) {
      setItemName(item.todoName);
    }
    return () => {
      setItemName("");
    };
  }, [edit]);

  return (
    <Box className={classes.box}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          buttonAction();
        }}
      >
        <TextField
          label={edit ? "Edit item" : "Add item"}
          value={itemName}
          onChange={(e) => {
            return setItemName(e.target.value);
          }}
        />
        {edit && (
          <Button
            variant="outlined"
            onClick={() => {
              setEdit(false);
            }}
          >
            Cancel
          </Button>
        )}
        <Button variant="contained" onClick={buttonAction}>
          {edit ? "Edit item" : "Add"}
          <QueueIcon />
        </Button>
      </form>
    </Box>
  );
}
