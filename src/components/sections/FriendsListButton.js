import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FiUsers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import homeStore from "stores/homeStore";
import { PingIcon } from "components/shared/NotificationIcon";

export default function FriendsListButton() {
  const currentPath = `/channels/me`;
  const location = useLocation();
  const isActive = location.pathname === currentPath;
  const requests = homeStore((state) => state.requestCount);

  return (
    <Link to={"/channels/me"}>
      <Flex
        m="2"
        p="3"
        align="center"
        justify={"space-between"}
        color={isActive ? "#fff" : "brandGray.accent"}
        _hover={{
          bg: "brandGray.light",
          borderRadius: "5px",
          cursor: "pointer",
          color: "#fff",
        }}
        bg={isActive ? "brandGray.active" : undefined}
      >
        <Flex align={"center"}>
          <Icon as={FiUsers} fontSize="20px" />
          <Text fontSize="14px" ml="4" fontWeight="semibold">
            Friends
          </Text>
        </Flex>
        {requests > 0 && <PingIcon count={requests} />}
      </Flex>
    </Link>
  );
}
