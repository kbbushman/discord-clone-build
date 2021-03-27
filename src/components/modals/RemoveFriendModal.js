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
import { removeFriend } from "api/handler/account";
import React from "react";
import { useQueryClient } from "react-query";
import useGetFriend from "hooks/useGetFriend";
import { fKey } from "utils/querykeys";

export default function RemoveFriendModal({ id, isOpen, onClose }) {
  async function handleRemoveFriend() {}

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent bg="brandGray.light">
        <ModalHeader
          textTransform={"uppercase"}
          fontWeight="bold"
          mb={0}
          pb={0}
        >
          Remove 'user.username'
        </ModalHeader>
        <ModalBody>
          <Text mb={"4"}>
            Are you sure you want to permanently remove <b>user.username</b>{" "}
            from your friends?
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
              onClick={handleRemoveFriend}
            >
              Remove Friend
            </Button>
          </LightMode>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
