import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function NotificationIcon({ count }) {
  return (
    <Flex
      borderRadius={"50%"}
      bg={"menuRed"}
      position={"absolute"}
      bottom={0}
      right={0}
      transform={"translate(25%, 25%)"}
      border={"0.2em solid"}
      borderColor={"brandBorder"}
      w={"1.4em"}
      h={"1.4em"}
      justify={"center"}
      align={"center"}
    >
      <Text fontSize={"11px"} fontWeight={"bold"}>
        {count}
      </Text>
    </Flex>
  );
}

export function PingIcon({ count }) {
  return (
    <Flex
      borderRadius={"50%"}
      bg={"menuRed"}
      w={"1.2em"}
      h={"1.2em"}
      justify={"center"}
      align={"center"}
      ml={2}
    >
      <Text fontSize={"11px"} fontWeight={"bold"}>
        {count}
      </Text>
    </Flex>
  );
}
