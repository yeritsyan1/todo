import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import { URL } from "../../constants/constants";

export default function NavigateList(props) {
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        return localStorage.removeItem("logged");
      })
      .then(() => {
        return navigate(URL.signIn.path);
      })
      .catch((error) => {
        console.log(error.mesage);
      });
  };

  const navigationList = [
    {
      name: "My todos",
      link: URL.myTodos.path,
      icon: <ListAltIcon />,
      click: () => {
        return navigate(URL.myTodos.path);
      },
    },
    {
      name: "Add todo",
      link: URL.add.path,
      icon: <PlaylistAddIcon />,
      divider: <Divider />,
      click: () => {
        return navigate(URL.add.path);
      },
    },
    {
      name: "Log out",
      link: URL.signIn.path,
      icon: <LogoutIcon />,
      click: logOut,
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 200,
        bgcolor: "background.paper",
        position: "absolute",
        left: 5,
        border: 0.5,
      }}
    >
      <nav aria-label="pages">
        <List>
          {navigationList.map((item) => {
            return (
              <React.Fragment key={uuid()}>
                <ListItem disablePadding>
                  <ListItemButton onClick={item.click}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
                {item?.divider}
              </React.Fragment>
            );
          })}
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
