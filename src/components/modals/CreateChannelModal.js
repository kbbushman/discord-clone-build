import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
} from "@chakra-ui/react";
import { createChannel } from "api/handler/channel";
import { getGuildMembers } from "api/handler/guilds";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useQuery } from "react-query";
import { mKey } from "utils/querykeys";
import toErrorMap from "utils/toErrorMap";
import { ChannelSchema } from "validation/channel.schema";
import InputField from "components/shared/InputField";

export default function CreateChannelModal({ guildId, isOpen, onClose }) {
  const key = mKey(guildId);

  async function handleCreateChannel() {}

  const members = [];
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCreateItem = (item) => {
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  const ListItem = (selected) => {
    return (
      <Flex align="center">
        <Avatar mr={2} size="sm" src={selected.image} />
        <Text textColor={"#000"}>{selected.label}</Text>
      </Flex>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="brandGray.light">
        <Formik
          initialValues={{
            name: "",
            isPublic: true,
          }}
          validationSchema={ChannelSchema}
          onSubmit={handleCreateChannel}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <ModalHeader textAlign="center" fontWeight="bold">
                Create Text Channel
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <InputField label="channel name" name="name" />

                <FormControl
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt="4"
                >
                  <FormLabel htmlFor="email-alerts" mb="0">
                    <Flex align="center">
                      <AiOutlineLock />
                      <Text ml="2">Private Channel</Text>
                    </Flex>
                  </FormLabel>
                  <Switch
                    onChange={(e) => {
                      setFieldValue("isPublic", !e.target.checked);
                    }}
                  />
                </FormControl>
                <Text mt="4" fontSize="14px" textColor="brandGray.accent">
                  By making a channel private, only selected members will be
                  able to view this channel
                </Text>
                {!values.isPublic && (
                  <Box mt={"2"} pb={0}>
                    <CUIAutoComplete
                      label="Who can access this channel"
                      placeholder=""
                      onCreateItem={handleCreateItem}
                      items={members}
                      selectedItems={selectedItems}
                      itemRenderer={ListItem}
                      onSelectedItemsChange={(changes) =>
                        handleSelectedItemsChange(changes.selectedItems)
                      }
                    />
                  </Box>
                )}
              </ModalBody>

              <ModalFooter bg="brandGray.dark">
                <Button
                  onClick={onClose}
                  fontSize={"14px"}
                  mr={6}
                  variant="link"
                >
                  Cancel
                </Button>
                <Button
                  background="highlight.standard"
                  color="white"
                  type="submit"
                  fontSize={"14px"}
                  _hover={{ bg: "highlight.hover" }}
                  _active={{ bg: "highlight.active" }}
                  _focus={{ boxShadow: "none" }}
                  isLoading={isSubmitting}
                >
                  Create Channel
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
