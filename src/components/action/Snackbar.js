import React from "react";
import Snackbar from "@mui/material/Snackbar";

export default function SnackbarShow() {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={true}
      message="Failed to upload."
    />
  );
}
