import {
  Flex,
  GridItem,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";
import { leaveGuild } from "api/handler/guilds";
import React from "react";
import { FaUserEdit, FaUserPlus } from "react-icons/fa";
import { FiChevronDown, FiX } from "react-icons/fi";
import { HiLogout } from "react-icons/hi";
import { MdAddCircle } from "react-icons/md";
import { RiSettings5Fill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import userStore from "stores/userStore";
import useGetCurrentGuild from "hooks/useGetCurrentGuild";
import { gKey } from "utils/querykeys";
import EditMemberModal from "components/modals/EditMemberModal";
import GuildSettingsModal from "components/modals/GuildSettingsModal";
import { StyledMenuItem, StyledRedMenuItem } from "./StyledMenuItem";
import StyledMenuList from "./StyledMenuList";

export default function GuildMenu({ channelOpen, inviteOpen }) {
  const { guildId } = useParams();
  const guild = useGetCurrentGuild(guildId);
  const history = useHistory();
  const cache = useQueryClient();

  const user = userStore((state) => state.current);
  const isOwner = guild?.ownerId === user?.id;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: memberOpen,
    onOpen: memberOnOpen,
    onClose: memberOnClose,
  } = useDisclosure();

  const handleLeave = async () => {
    const { data } = await leaveGuild(guildId);
    if (data) {
      cache.setQueryData(gKey, (d) => {
        return d.filter((g) => g.id !== guild?.id);
      });
      history.replace("/channels/me");
    }
  };

  return (
    <GridItem
      gridColumn={2}
      gridRow={"1"}
      bg="brandGray.light"
      padding="10px"
      zIndex="2"
      boxShadow="md"
    >
      <Menu placement="bottom-end" isLazy>
        {({ isOpen }) => (
          <>
            <Flex justify="space-between" align="center">
              <Heading fontSize="20px">{guild?.name}</Heading>
              <MenuButton>
                <Icon as={!isOpen ? FiChevronDown : FiX} />
              </MenuButton>
            </Flex>
            <StyledMenuList>
              <StyledMenuItem
                label={"Invite People"}
                icon={FaUserPlus}
                handleClick={inviteOpen}
              />
              {isOwner && (
                <StyledMenuItem
                  label={"Server Settings"}
                  icon={RiSettings5Fill}
                  handleClick={onOpen}
                />
              )}
              {isOwner && (
                <StyledMenuItem
                  label={"Create Channel"}
                  icon={MdAddCircle}
                  handleClick={channelOpen}
                />
              )}
              <MenuDivider />
              <StyledMenuItem
                label={"Change Appearance"}
                icon={FaUserEdit}
                handleClick={memberOnOpen}
              />
              {!isOwner && (
                <>
                  <MenuDivider />
                  <StyledRedMenuItem
                    label={"Leave Server"}
                    icon={HiLogout}
                    handleClick={handleLeave}
                  />
                </>
              )}
            </StyledMenuList>
          </>
        )}
      </Menu>
      {isOpen && (
        <GuildSettingsModal
          guildId={guildId}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      {memberOpen && (
        <EditMemberModal
          guildId={guildId}
          isOpen={memberOpen}
          onClose={memberOnClose}
        />
      )}
    </GridItem>
  );
}
