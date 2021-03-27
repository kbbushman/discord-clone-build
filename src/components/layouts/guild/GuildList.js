import { Box, GridItem, UnorderedList, useDisclosure } from "@chakra-ui/react";
import { getUserGuilds } from "api/handler/guilds";
import useGuildSocket from "api/ws/useGuildSocket";
import GuildListItem from "components/items/GuildListItem";
import AddGuildModal from "components/modals/AddGuildModal";
import AddGuildIcon from "components/sections/AddGuildIcon";
import HomeIcon from "components/sections/HomeIcon";
import React from "react";
import { useQuery } from "react-query";
import { gKey } from "utils/querykeys";
import guildScrollbarCss from "./css/GuildScrollerCSS";

export default function GuildList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useGuildSocket();

  return (
    <GridItem
      gridColumn={1}
      gridRow={"1 / 4"}
      bg="brandGray.darker"
      overflowY="auto"
      css={guildScrollbarCss}
      zIndex={2}
    >
      <HomeIcon />
      <UnorderedList listStyleType="none" ml="0">
        guilds
      </UnorderedList>
      <AddGuildIcon onOpen={onOpen} />
      {isOpen && <AddGuildModal isOpen={isOpen} onClose={onClose} />}
      <Box h="20px" />
    </GridItem>
  );
}
