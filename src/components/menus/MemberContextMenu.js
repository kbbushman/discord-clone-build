import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { sendFriendRequest } from "api/handler/account";
import { getOrCreateDirectMessage } from "api/handler/dm";
import ModActionModal from "components/modals/ModActionModal";
import RemoveFriendModal from "components/modals/RemoveFriendModal";
import React, { useState } from "react";
import { Item, Menu, theme } from "react-contexify";
import { useHistory } from "react-router-dom";

export default function MemberContextMenu({ member, isOwner, id }) {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modIsOpen,
    onOpen: modOnOpen,
    onClose: modOnClose,
  } = useDisclosure();
  const [isBan, setIsBan] = useState(false);

  const getOrCreateDM = async () => {
    const { data } = await getOrCreateDirectMessage(member.id);
    if (data) {
      history.push(`/channels/me/${data.id}`);
    }
  };

  const handleFriendClick = async () => {
    if (!member.isFriend) {
      await sendFriendRequest(member.id);
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Menu id={id} theme={theme.dark}>
        <Item onClick={getOrCreateDM} className={"menu-item"}>
          <Flex align="center" justify="space-between" w="full">
            <Text>Message</Text>
          </Flex>
        </Item>
        <Item onClick={handleFriendClick} className={"menu-item"}>
          <Flex align="center" justify="space-between" w="full">
            <Text>{member.isFriend ? "Remove" : "Add"} Friend</Text>
          </Flex>
        </Item>
        {isOwner && (
          <>
            <Item
              onClick={() => {
                setIsBan(false);
                modOnOpen();
              }}
              className={"delete-item"}
            >
              <Flex align="center" justify="space-between" w="full">
                <Text>Kick {member.username}</Text>
              </Flex>
            </Item>
            <Item
              onClick={() => {
                setIsBan(true);
                modOnOpen();
              }}
              className={"delete-item"}
            >
              <Flex align="center" justify="space-between" w="full">
                <Text>Ban {member.username}</Text>
              </Flex>
            </Item>
          </>
        )}
      </Menu>
      {isOpen && <RemoveFriendModal id={member.id} isOpen onClose={onClose} />}
      {modIsOpen && (
        <ModActionModal
          member={member}
          isOpen={modIsOpen}
          isBan={isBan}
          onClose={modOnClose}
        />
      )}
    </>
  );
}
