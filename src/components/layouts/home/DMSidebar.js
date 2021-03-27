import { Box, GridItem, Text, UnorderedList } from "@chakra-ui/react";
import { getUserDMs } from "api/handler/dm";
import useDMSocket from "api/ws/useDMSocket";
import DMListItem from "components/items/DMListItem";
import DMPlaceholder from "components/sections/DMPlaceholder";
import FriendsListButton from "components/sections/FriendsListButton";
import React from "react";
import { useQuery } from "react-query";
import { dmKey } from "utils/querykeys";
import AccountBar from "../AccountBar";
import dmScrollerCss from "./css/dmScrollerCSS";

export default function DMSidebar() {
  useDMSocket();

  return (
    <GridItem
      gridColumn={"2"}
      gridRow={"1 / 4"}
      bg="brandGray.dark"
      overflowY="hidden"
      _hover={{ overflowY: "auto" }}
      css={dmScrollerCss}
    >
      <FriendsListButton />
      <Text
        ml="4"
        textTransform="uppercase"
        fontSize="12px"
        fontWeight="semibold"
        color="brandGray.accent"
      >
        DIRECT MESSAGES
      </Text>
      <UnorderedList listStyleType="none" ml="0" mt="4">
        {"no data" && (
          <Box>
            <DMPlaceholder />
            <DMPlaceholder />
            <DMPlaceholder />
            <DMPlaceholder />
            <DMPlaceholder />
          </Box>
        )}
      </UnorderedList>
      <AccountBar />
    </GridItem>
  );
}
