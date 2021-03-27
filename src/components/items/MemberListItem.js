import { Avatar, AvatarBadge, Flex, ListItem, Text } from "@chakra-ui/react";
import MemberContextMenu from "components/menus/MemberContextMenu";
import useGetCurrentGuild from "hooks/useGetCurrentGuild";
import React from "react";
import { useContextMenu } from "react-contexify";
import { useParams } from "react-router-dom";
import userStore from "stores/userStore";

export default function MemberListItem({ member }) {
  const { show } = useContextMenu({
    id: member.id,
  });

  return (
    <>
      <ListItem
        p="2"
        mx="10px"
        color={"brandGray.accent"}
        _hover={{
          bg: "brandGray.light",
          borderRadius: "5px",
          cursor: "pointer",
          color: "#fff",
        }}
        onContextMenu={show}
      >
        <Flex align="center">
          <Avatar size="sm" src="">
            <AvatarBadge
              boxSize="1.25em"
              bg={"isOnline" ? "green.500" : "gray.500"}
            />
          </Avatar>
          <Text ml="2">username</Text>
        </Flex>
      </ListItem>
      {"is not current user" && (
        <MemberContextMenu member={member} id={member.id} />
      )}
    </>
  );
}
