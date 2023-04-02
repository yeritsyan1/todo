import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import Modal from "../../modal/Modal";
import { v4 as uuid } from "uuid";

const useStyles = createUseStyles({
  li: {
    width: "90%",
    margin: [5, 'auto'],
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    border: [2, "black", "solid"],
    backgroundColor: "orange",
    color: "red",
    fontSize: 22,
  },
  liItem: {
    width: "30%",
    wordWrap: "break-word",
  },
});

export default function MyTodoList(props) {
  const { todo, onDelete } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <li className={classes.li} key={uuid()}>
      <p className={classes.liItem}> {todo.todoName} </p>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete <DeleteIcon />
      </Button>
      {open && (
        <Modal
          open={open}
          handleClose={handleClose}
          todo={todo}
          onDelete={onDelete}
        />
      )}
    </li>
  );
}
