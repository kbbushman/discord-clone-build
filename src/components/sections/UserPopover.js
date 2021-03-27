import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function UserPopover({ member, children }) {
  return (
    <Popover isLazy placement={"right-start"}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent w={"80%"}>
        <PopoverHeader bg={"brandGray.darker"} borderRadius={"md"}>
          <Flex mt={2} align={"center"} justify={"center"}>
            <Box>
              <Avatar src={member.image} size={"xl"}>
                <AvatarBadge
                  boxSize="0.9em"
                  bg={member.isOnline ? "green.500" : "gray.500"}
                />
              </Avatar>
              <Text
                mt={2}
                textAlign={"center"}
                color={"#fff"}
                fontWeight={"semibold"}
              >
                {member.nickname ?? member.username}
              </Text>
              {member.nickname && (
                <Text textAlign={"center"}>{member.username}</Text>
              )}
            </Box>
          </Flex>
        </PopoverHeader>
        <PopoverFooter bg={"brandGray.dark"}>
          <Text
            textColor={"brandGray.accent"}
            fontSize={"12px"}
            textAlign={"center"}
          >
            Right click user for more actions
          </Text>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
