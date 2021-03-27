import {
  Button,
  LightMode,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { banMember, kickMember } from "api/handler/guilds";
import React from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { mKey } from "utils/querykeys";

export default function ModActionModal({ member, isOpen, onClose, isBan }) {
  const action = isBan ? "Ban " : "Kick ";

  async function handleBanMember() {}

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent bg="brandGray.light">
        <ModalHeader
          textTransform={"uppercase"}
          fontWeight="bold"
          fontSize={"14px"}
          mb={0}
          pb={0}
        >
          {action}'{member.username}'
        </ModalHeader>
        <ModalBody>
          <Text mb={"4"}>
            Are you sure you want to {action.toLocaleLowerCase()} @
            {member.username}?
            {!isBan && " They will be able to rejoin again with a new invite."}
          </Text>
        </ModalBody>

        <ModalFooter bg="brandGray.dark">
          <Button onClick={onClose} mr={6} variant="link" fontSize={"14px"}>
            Cancel
          </Button>
          <LightMode>
            <Button
              colorScheme="red"
              fontSize={"14px"}
              onClick={handleBanMember}
            >
              {action}
            </Button>
          </LightMode>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
