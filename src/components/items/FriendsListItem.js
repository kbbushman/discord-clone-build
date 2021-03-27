import {
  Avatar,
  AvatarBadge,
  Flex,
  IconButton,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { getOrCreateDirectMessage } from "api/handler/dm";
import { dmKey } from "utils/querykeys";
import RemoveFriendModal from "components/modals/RemoveFriendModal";

export default function FriendsListItem({ friend }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function getDMChannel() {}

  return (
    <ListItem
      p="3"
      mx="3"
      _hover={{
        bg: "brandGray.dark",
        borderRadius: "5px",
      }}
    >
      <Flex align="center" justify="space-between">
        <Flex
          align="center"
          w={"full"}
          onClick={getDMChannel}
          _hover={{ cursor: "pointer" }}
        >
          <Avatar size="sm" src={friend.image}>
            <AvatarBadge
              boxSize="1.25em"
              bg={friend.isOnline ? "green.500" : "gray.500"}
            />
          </Avatar>
          <Text ml="2">{friend.username}</Text>
        </Flex>
        <IconButton
          icon={<FaEllipsisV />}
          borderRadius="50%"
          aria-label="remove friend"
          onClick={(e) => {
            e.preventDefault();
            onOpen();
          }}
        />
      </Flex>
      {isOpen && <RemoveFriendModal id={friend.id} isOpen onClose={onClose} />}
    </ListItem>
  );
}
