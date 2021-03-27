import {
  Avatar,
  Box,
  Flex,
  IconButton,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { acceptFriendRequest, declineFriendRequest } from "api/handler/account";
import StyledTooltip from "components/sections/StyledTooltip";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { useQueryClient } from "react-query";
import { fKey, rKey } from "utils/querykeys";

export default function RequestListItem({ request }) {
  const cache = useQueryClient();

  const acceptRequest = async () => {
    const { data } = await acceptFriendRequest(request.id);
    if (data) {
      cache.setQueryData(rKey, (d) => {
        return d?.filter((r) => r.id !== request.id);
      });
      await cache.invalidateQueries(fKey);
    }
  };

  const declineRequest = async () => {
    const { data } = await declineFriendRequest(request.id);
    if (data) {
      cache.setQueryData(rKey, (d) => {
        return d?.filter((r) => r.id !== request.id);
      });
    }
  };

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
        <Flex align="center">
          <Avatar size="sm" src={request.image} />
          <Box ml="2">
            <Text>{request.username}</Text>
            <Text fontSize={"12px"}>
              {request.type === 1
                ? "Incoming Friend Request"
                : "Outgoing Friend Request"}
            </Text>
          </Box>
        </Flex>
        <Flex align={"center"}>
          {request.type === 1 && (
            <StyledTooltip label={"Accept"} position={"top"}>
              <IconButton
                icon={<BiCheck />}
                borderRadius="50%"
                aria-label="accept request"
                fontSize={"28px"}
                onClick={acceptRequest}
                mr={"2"}
              />
            </StyledTooltip>
          )}
          <StyledTooltip label={"Decline"} position={"top"}>
            <IconButton
              icon={<AiOutlineClose />}
              borderRadius="50%"
              aria-label="decline request"
              fontSize={"20px"}
              onClick={declineRequest}
            />
          </StyledTooltip>
        </Flex>
      </Flex>
    </ListItem>
  );
}
