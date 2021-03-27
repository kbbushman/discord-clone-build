import { Grid } from "@chakra-ui/react";
import React from "react";

export default function AppLayout({ showLastColumn = false, children }) {
  return (
    <Grid
      height="100vh"
      templateColumns={`75px 240px 1fr ${showLastColumn ? "240px" : ""} `}
      templateRows="auto 1fr auto"
      bg="brandGray.light"
    >
      {children}
    </Grid>
  );
}
