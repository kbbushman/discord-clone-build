import { MenuList } from "@chakra-ui/react";
import React from "react";

export default function StyledMenuList({ children }) {
  return (
    <MenuList bg="brandGray.darkest" px="2">
      {children}
    </MenuList>
  );
}
