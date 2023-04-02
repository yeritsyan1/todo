import React from "react";
import { useState } from "react";
import Header from "./Header";
import { v4 as uuid } from "uuid";
import { Button } from "@mui/material";
import TodoList from "./TodoList";
import { createUseStyles } from "react-jss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import NavigateList from "../../link/NavigateList";
import { useEffect } from "react";
import { LOGGED } from "../../../constants/constants";

const useStyles = createUseStyles({
  divParent: {
    backgroundColor: "#224979",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  div: {
    width: "60%",
    height: "auto",
    border: [1, "black", "solid"],
    position: "relative",
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
  },
});

export default function Todo() {
  const classes = useStyles();
  const [userId, setUserId] = useState(null);
  const [isShowUrl, setIsShowUrl] = useState(false);
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState({});

  // add todo item
  const addTodo = (name) => {
    setTodos([
      ...todos,
      {
        todoName: name,
        isEdited: false,
        id: uuid(),
      },
    ]);
  };

  // edit item
  const onEdit = (oneitem) => {
    setEdit(true);
    setItem(oneitem);
  };

  // update my todos
  const updatedItem = (oneItem, itemName) => {
    setTodos(() => {
      return todos?.map((todo) => {
        if (oneItem.id === todo.id) {
          return {
            ...oneItem,
            todoName: itemName,
            isEdited: true,
          };
        } else {
          return todo;
        }
      });
    });
  };

  // delete item
  const onDelete = (item) => {
    const filteredArr = todos.filter((findItem) => findItem.id !== item.id);
    return setTodos(filteredArr);
  };

  useEffect(() => {
    setUserId(localStorage.getItem(LOGGED));
  }, [userId]);

  return (
    <div className={classes.divParent}>
      <div className={classes.div}>
        <Button
          onClick={() => {
            setIsShowUrl(!isShowUrl);
          }}
        >
          <CoPresentIcon />
          {isShowUrl ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </Button>
        <span> {userId} </span>
        {isShowUrl && <NavigateList />}
        <h3 className={classes.title}> Add new item </h3>
        <Header
          addTodo={addTodo}
          edit={edit}
          setEdit={setEdit}
          item={item}
          updatedItem={updatedItem}
        />
        <TodoList
          todos={todos}
          onEdit={onEdit}
          item={item}
          edit={edit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
