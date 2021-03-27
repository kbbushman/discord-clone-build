import { Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React from "react";

export function StyledMenuItem({ label, icon, handleClick }) {
  return (
    <MenuItem
      _hover={{ bg: "highlight.standard", borderRadius: "2px" }}
      onClick={handleClick}
    >
      <Flex align="center" justify="space-between" w="full">
        <Text>{label}</Text>
        <Icon as={icon} />
      </Flex>
    </MenuItem>
  );
}

export function StyledRedMenuItem({ label, icon, handleClick }) {
  return (
    <MenuItem
      _hover={{ bg: "menuRed", color: "#fff", borderRadius: "2px" }}
      onClick={handleClick}
    >
      <Flex align="center" justify="space-between" w="full">
        <Text>{label}</Text>
        <Icon as={icon} />
      </Flex>
    </MenuItem>
  );
}
