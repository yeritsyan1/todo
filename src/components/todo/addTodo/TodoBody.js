import { Button } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import Modal from "../../modal/Modal";

const useStyles = createUseStyles({
  li: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    border: [2, "black", "solid"],
    backgroundColor: "orange",
    color: "red",
    fontSize: 22,
    width: "90%",
    margin: [3, "auto"],
  },
  liItem: {
    width: "30%",
    wordWrap: "break-word",
  },
});

export default function TodoBody(props) {
  const { todo, onEdit, edit } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <li className={classes.li}>
        <p className={classes.liItem}> {todo.todoName} </p>
        <Button
          variant="contained"
          disabled={edit ? true : false}
          onClick={() => {
            return onEdit(todo);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={edit ? true : false}
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete <DeleteIcon />{" "}
        </Button>
      </li>

      {open && (
        <Modal
          open={open}
          handleClose={handleClose}
          todo={todo}
          onDelete={props.onDelete}
        />
      )}
    </>
  );
}
