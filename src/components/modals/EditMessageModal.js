import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  LightMode,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { editMessage } from "api/handler/messages";
import React, { useState } from "react";
import { getTime } from "utils/dateUtils";

export default function EditMessageModal({ message, isOpen, onClose }) {
  async function handleEditMessage() {}

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent bg="brandGray.light">
        <ModalHeader fontWeight="bold" mb={0} pb={0}>
          Edit Message
        </ModalHeader>
        <ModalBody>
          <Flex
            alignItems="center"
            my="2"
            mr="1"
            justify="space-between"
            boxShadow={"dark-lg"}
            py={2}
          >
            <Flex alignItems="center">
              <Avatar h="40px" w="40px" ml="4" src="" />
              <Box ml="3">
                <Flex alignItems="center">
                  <Text>message user username</Text>
                  <Text fontSize="12px" color="brandGray.accent" ml="3">
                    createdAt
                  </Text>
                </Flex>
                <Input
                  value="message text"
                  bg="brandGray.dark"
                  borderColor="black"
                  borderRadius="3px"
                  focusBorderColor="none"
                />
              </Box>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter bg="brandGray.dark">
          <Button onClick={onClose} mr={6} variant="link" fontSize={"14px"}>
            Cancel
          </Button>
          <LightMode>
            <Button
              colorScheme="green"
              fontSize={"14px"}
              onClick={handleEditMessage}
            >
              Save
            </Button>
          </LightMode>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
