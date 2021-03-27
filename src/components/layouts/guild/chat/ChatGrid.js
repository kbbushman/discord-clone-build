import { GridItem } from "@chakra-ui/react";
import React from "react";
import { scrollbarCss } from "utils/theme";

export default function ChatGrid({ children }) {
  return (
    <GridItem
      id={"chatGrid"}
      gridColumn={3}
      gridRow={"2"}
      bg="brandGray.light"
      mr="5px"
      display="flex"
      flexDirection="column-reverse"
      overflowY="auto"
      css={scrollbarCss}
    >
      {children}
    </GridItem>
  );
}
