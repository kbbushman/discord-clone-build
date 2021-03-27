import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  LightMode,
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
import {
  deleteChannel,
  editChannel,
  getPrivateChannelMembers,
} from "api/handler/channel";
import { getGuildMembers } from "api/handler/guilds";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import useGetCurrentChannel from "hooks/useGetCurrentChannel";
import { cKey, mKey } from "utils/querykeys";
import toErrorMap from "utils/toErrorMap";
import { ChannelSchema } from "validation/channel.schema";
import InputField from "components/shared/InputField";

export default function ChannelSettingsModal({
  guildId,
  channelId,
  isOpen,
  onClose,
}) {
  const key = mKey(guildId);

  const channel = useGetCurrentChannel(channelId, cKey(guildId));

  const members = [];
  const [selectedItems, setSelectedItems] = useState([]);
  const [screen, setScreen] = useState("START");

  const goBack = () => setScreen("START");
  const submitClose = () => {
    setScreen("START");
    onClose();
  };

  async function handleEditChannel() {}

  // eslint-disable-next-line
  const { data: current } = useQuery(`${channelId}-members`, async () => {
    const { data } = await getPrivateChannelMembers(channelId);
    const current = members.filter((m) => data.includes(m.value));
    setSelectedItems(current);
    return current;
  });

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

  if (!channel) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      {screen === "START" && (
        <ModalContent bg="brandGray.light">
          <Formik
            initialValues={{
              name: channel.name,
              isPublic: channel.isPublic,
            }}
            validationSchema={ChannelSchema}
            onSubmit={handleEditChannel}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <ModalHeader textAlign="center" fontWeight="bold">
                  Channel Settings
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
                    <FormLabel mb="0">
                      <Flex align="center">
                        <AiOutlineLock />
                        <Text ml="2">Private Channel</Text>
                      </Flex>
                    </FormLabel>
                    <Switch
                      defaultChecked={!values.isPublic}
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

                  <Divider my={"2"} />

                  <LightMode>
                    <Button
                      onClick={() => setScreen("CONFIRM")}
                      colorScheme={"red"}
                      variant="ghost"
                      fontSize={"14px"}
                      rightIcon={<FaRegTrashAlt />}
                    >
                      Delete Channel
                    </Button>
                  </LightMode>
                </ModalBody>

                <ModalFooter bg="brandGray.dark">
                  <Button
                    onClick={onClose}
                    mr={6}
                    variant="link"
                    fontSize={"14px"}
                  >
                    Cancel
                  </Button>
                  <Button
                    background="highlight.standard"
                    color="white"
                    type="submit"
                    _hover={{ bg: "highlight.hover" }}
                    _active={{ bg: "highlight.active" }}
                    _focus={{ boxShadow: "none" }}
                    isLoading={isSubmitting}
                    fontSize={"14px"}
                  >
                    Save Changes
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      )}
      {screen === "CONFIRM" && (
        <DeleteChannelModal
          goBack={goBack}
          submitClose={submitClose}
          name={channel.name}
          channelId={channel.id}
          guildId={guildId}
        />
      )}
    </Modal>
  );
}

function DeleteChannelModal({ goBack, submitClose, name, channelId, guildId }) {
  async function handleDeleteChannel() {}

  return (
    <ModalContent bg="brandGray.light">
      <ModalHeader fontWeight="bold" pb="0">
        Delete Channel
      </ModalHeader>
      <ModalBody pb={3}>
        <Text>
          Are you sure you want to delete #{name}? This cannot be undone.
        </Text>
      </ModalBody>

      <ModalFooter bg="brandGray.dark">
        <Button mr={6} variant="link" onClick={goBack} fontSize={"14px"}>
          Cancel
        </Button>
        <LightMode>
          <Button
            colorScheme="red"
            fontSize={"14px"}
            onClick={handleDeleteChannel}
          >
            Delete Channel
          </Button>
        </LightMode>
      </ModalFooter>
    </ModalContent>
  );
}
