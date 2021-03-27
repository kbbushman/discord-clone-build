import { Avatar, Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import useGetCurrentChannel from "hooks/useGetCurrentChannel";
import useGetCurrentDM from "hooks/useGetCurrentDM";
import { cKey } from "utils/querykeys";

export default function StartMessages() {
  const { guildId } = useParams();
  return guildId === undefined ? <DMStartMessages /> : <ChannelStartMessages />;
}

function ChannelStartMessages() {
  const { guildId, channelId } = useParams();
  const channel = useGetCurrentChannel(channelId, cKey(guildId));

  return (
    <Flex alignItems="center" mb="2" justify="center">
      <Box textAlign={"center"}>
        <Heading>Welcome to #{channel?.name}</Heading>
        <Text>This is the start of the #{channel?.name} channel</Text>
      </Box>
    </Flex>
  );
}

function DMStartMessages() {
  const { channelId } = useParams();
  const channel = useGetCurrentDM(channelId);

  return (
    <Box m="4">
      <Box h={"40px"} />
      <Avatar h={"80px"} w={"80px"} src={channel?.user.image} />
      <Heading mt={2}>{channel?.user.username}</Heading>
      <Text textColor={"brandGray.accent"}>
        This is the beginning of your direct message history with @
        {channel?.user.username}
      </Text>
      <Divider mt={2} />
    </Box>
  );
}
