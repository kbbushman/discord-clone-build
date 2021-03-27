import React from "react";
import { Text } from "@chakra-ui/react";

export default function OnlineLabel({ label }) {
  return (
    <Text
      fontSize="12px"
      color={"brandGray.accent"}
      textTransform={"uppercase"}
      fontWeight={"semibold"}
      mx={"4"}
      mt={"4"}
      mb={"1"}
      w={"50%"}
    >
      {label}
    </Text>
  );
}
