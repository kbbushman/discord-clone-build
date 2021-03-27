import React, { useEffect, useState } from "react";
import { Flex, Icon, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import { FaHashtag, FaUserLock } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import userStore from "stores/userStore";
import ChannelSettingsModal from "components/modals/ChannelSettingsModal";
import useGetCurrentGuild from "hooks/useGetCurrentGuild";
import { ChannelNotificationIndicator } from "components/shared/GuildPills";
import { useQueryClient } from "react-query";
import { cKey } from "utils/querykeys";

export default function ChannelListItem({ channel, guildId }) {
  const currentPath = `/channels/${guildId}/${channel.id}`;
  const location = useLocation();
  const isActive = location.pathname === currentPath;
  const [showSettings, setShowSettings] = useState(false);

  const current = userStore((state) => state.current);
  const guild = useGetCurrentGuild(guildId);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cache = useQueryClient();

  useEffect(() => {
    if (channel.hasNotification && isActive) {
      cache.setQueryData(cKey(guildId), (d) => {
        const index = d?.findIndex((c) => c.id === channel.id);
        if (index !== -1) {
          d[index] = { ...d[index], hasNotification: false };
        }
        return d;
      });
    }
  });

  return (
    <Link to={currentPath}>
      <ListItem
        p="5px"
        m="0 10px"
        color={
          isActive || channel.hasNotification ? "#fff" : "brandGray.accent"
        }
        _hover={{
          bg: "brandGray.light",
          borderRadius: "5px",
          cursor: "pointer",
          color: "#fff",
        }}
        bg={isActive ? "brandGray.active" : undefined}
        mb="2px"
        onMouseLeave={() => setShowSettings(false)}
        onMouseEnter={() => setShowSettings(true)}
      >
        {channel.hasNotification && <ChannelNotificationIndicator />}
        <Flex align="center" justify={"space-between"}>
          <Flex align="center">
            <Icon
              as={channel.isPublic ? FaHashtag : FaUserLock}
              color={"brandGray.accent"}
            />
            <Text ml="2">{channel.name}</Text>
          </Flex>
          {current?.id === guild?.ownerId && (showSettings || isOpen) && (
            <>
              <Icon
                as={MdSettings}
                color={"brandGray.accent"}
                fontSize={"12px"}
                _hover={{ color: "#fff" }}
                onClick={(e) => {
                  e.preventDefault();
                  onOpen();
                }}
              />
              {isOpen && (
                <ChannelSettingsModal
                  guildId={guildId}
                  channelId={channel.id}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              )}
            </>
          )}
        </Flex>
      </ListItem>
    </Link>
  );
}
