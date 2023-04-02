import * as React from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export default function LoadingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        margin: [0, 3],
      }}
    >
      <span> Loading... </span>
      <CircularProgress />
    </Box>
  );
}
