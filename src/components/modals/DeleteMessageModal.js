import {
  Avatar,
  Box,
  Button,
  Flex,
  LightMode,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { deleteMessage } from "api/handler/messages";
import React from "react";
import { getTime } from "utils/dateUtils";

export default function DeleteMessageModal({ message, isOpen, onClose }) {
  async function handleDeleteMessage() {}

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent bg="brandGray.light">
        <ModalHeader fontWeight="bold" mb={0} pb={0}>
          Delete Message
        </ModalHeader>
        <ModalBody>
          <Text mb={"4"}>Are you sure you want to delete this message?</Text>

          <Flex
            alignItems="center"
            my="2"
            mr="1"
            justify="space-between"
            boxShadow={"dark-lg"}
            py={2}
          >
            <Flex>
              <Avatar h="40px" w="40px" ml="4" mt={"1"} src="" />
              <Box ml="3">
                <Flex alignItems="center">
                  <Text>message user username</Text>
                  <Text fontSize="12px" color="brandGray.accent" ml="3">
                    createdAt
                  </Text>
                </Flex>
                <Text>text</Text>
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
              colorScheme="red"
              fontSize={"14px"}
              onClick={handleDeleteMessage}
            >
              Delete
            </Button>
          </LightMode>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
