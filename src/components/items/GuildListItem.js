import { Avatar, Flex } from "@chakra-ui/react";
import StyledTooltip from "components/sections/StyledTooltip";
import {
  ActiveGuildPill,
  HoverGuildPill,
  NotificationIndicator,
} from "components/shared/GuildPills";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { gKey } from "utils/querykeys";

export default function GuildListItem({ guild }) {
  const location = useLocation();
  const isActive = location.pathname.includes(guild.id);
  const [isHover, setHover] = useState(false);
  const cache = useQueryClient();

  useEffect(() => {
    if (guild.hasNotification && isActive) {
      cache.setQueryData(gKey, (d) => {
        const index = d?.findIndex((c) => c.id === guild.id);
        if (index !== -1) {
          d[index] = { ...d[index], hasNotification: false };
        }
        return d;
      });
    }
  });

  return (
    <Flex mb={"2"} justify={"center"}>
      {isActive && <ActiveGuildPill />}
      {isHover && <HoverGuildPill />}
      {guild.hasNotification && <NotificationIndicator />}
      <StyledTooltip label={guild.name} position={"right"}>
        <Link to={`/channels/${guild.id}/${guild.default_channel_id}`}>
          {guild.icon ? (
            <Avatar
              src={guild.icon}
              borderRadius={isActive ? "35%" : "50%"}
              _hover={{ borderRadius: "35%" }}
              name={guild.name}
              color={"#fff"}
              bg={"brandGray.light"}
              onMouseLeave={() => setHover(false)}
              onMouseEnter={() => setHover(true)}
            />
          ) : (
            <Flex
              justify={"center"}
              align={"center"}
              bg={isActive ? "highlight.standard" : "brandGray.light"}
              borderRadius={isActive ? "35%" : "50%"}
              h={"48px"}
              w={"48px"}
              color={isActive ? "white" : undefined}
              fontSize="20px"
              _hover={{
                borderRadius: "35%",
                bg: "highlight.standard",
                color: "white",
              }}
              onMouseLeave={() => setHover(false)}
              onMouseEnter={() => setHover(true)}
            >
              {guild.name[0]}
            </Flex>
          )}
        </Link>
      </StyledTooltip>
    </Flex>
  );
}
