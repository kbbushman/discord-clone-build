import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  deleteGuild,
  editGuild,
  getBanList,
  invalidateInviteLinks,
  unbanMember,
} from "api/handler/guilds";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { BiUnlink } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { ImHammer2 } from "react-icons/im";
import { IoCheckmarkCircle, IoPersonRemove } from "react-icons/io5";
import { useQuery, useQueryClient } from "react-query";
import useGetCurrentGuild from "hooks/useGetCurrentGuild";
import toErrorMap from "utils/toErrorMap";
import { GuildSchema } from "validation/guild.schema";
import channelScrollbarCss from "../layouts/guild/css/ChannelScrollerCSS";
import InputField from "components/shared/InputField";
import CropImageModal from "./CropImageModal";

export default function GuildSettingsModal({ guildId, isOpen, onClose }) {
  const [screen, setScreen] = useState("START");
  const [isReset, setIsReset] = useState(false);

  const goBack = () => setScreen("START");
  const submitClose = () => {
    setScreen("START");
    onClose();
  };

  const {
    isOpen: cropperIsOpen,
    onOpen: cropperOnOpen,
    onClose: cropperOnClose,
  } = useDisclosure();

  const inputFile = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [cropImage, setCropImage] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);

  async function handleEditGuild() {}

  function applyCrop(file) {}

  async function handleInvalidateInvites() {}

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      {screen === "START" && (
        <ModalContent bg="brandGray.light">
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={GuildSchema}
            onSubmit={handleEditGuild}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalHeader textAlign="center" fontWeight="bold" pb={0}>
                  Server Overview
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Flex mb="4" justify="center">
                    <Box textAlign={"center"}>
                      <Tooltip label="Change Icon" aria-label="Change Icon">
                        <Avatar
                          size="xl"
                          name={"guild name"}
                          bg={"brandGray.darker"}
                          color={"#fff"}
                          src={imageUrl || ""}
                          _hover={{ cursor: "pointer", opacity: 0.5 }}
                          onClick={() => inputFile.current.click()}
                        />
                      </Tooltip>
                      <Text
                        mt={"2"}
                        _hover={{
                          cursor: "pointer",
                          color: "brandGray.accent",
                        }}
                        onClick={() => {
                          setCroppedImage(null);
                          setImageUrl(null);
                        }}
                      >
                        Remove
                      </Text>
                    </Box>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      ref={inputFile}
                      hidden
                      onChange={async (e) => {
                        if (!e.currentTarget.files) return;
                        setCropImage(
                          URL.createObjectURL(e.currentTarget.files[0])
                        );
                        cropperOnOpen();
                      }}
                    />
                  </Flex>

                  <InputField label="server name" name="name" />

                  <Divider my={"4"} />

                  <Text fontWeight={"semibold"} mb={2}>
                    Additional Configuration
                  </Text>

                  <Flex align={"center"} justify={"space-between"} mb={"2"}>
                    <Button
                      onClick={handleInvalidateInvites}
                      fontSize={"14px"}
                      rightIcon={isReset ? <IoCheckmarkCircle /> : <BiUnlink />}
                      colorScheme={isReset ? "green" : "gray"}
                    >
                      Invalidate Links
                    </Button>
                    <Button
                      onClick={() => setScreen("BANLIST")}
                      fontSize={"14px"}
                      rightIcon={<ImHammer2 />}
                    >
                      Bans
                    </Button>
                  </Flex>
                  <Flex align={"center"} justify={"space-between"} mb={"2"}>
                    <LightMode>
                      <Button
                        onClick={() => setScreen("CONFIRM")}
                        colorScheme={"red"}
                        variant="ghost"
                        fontSize={"14px"}
                        textColor={"menuRed"}
                        rightIcon={<FaRegTrashAlt />}
                      >
                        Delete Server
                      </Button>
                    </LightMode>
                  </Flex>
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
          {cropperIsOpen && (
            <CropImageModal
              isOpen={cropperIsOpen}
              onClose={cropperOnClose}
              initialImage={cropImage}
              applyCrop={applyCrop}
            />
          )}
        </ModalContent>
      )}
      {screen === "CONFIRM" && (
        <DeleteGuildModal
          goBack={goBack}
          submitClose={submitClose}
          name={"guild name"}
          guildId={guildId}
        />
      )}
      {screen === "BANLIST" && (
        <BanListModal goBack={goBack} guildId={guildId} />
      )}
    </Modal>
  );
}

function DeleteGuildModal({ goBack, submitClose, name, guildId }) {
  async function handleDeleteGuild() {}

  return (
    <ModalContent bg="brandGray.light">
      <ModalHeader fontWeight="bold" pb="0">
        Delete name
      </ModalHeader>
      <ModalBody pb={3}>
        <Text>
          Are you sure you want to delete <b>name</b>? This cannot be undone.
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
            onClick={handleDeleteGuild}
          >
            Delete Server
          </Button>
        </LightMode>
      </ModalFooter>
    </ModalContent>
  );
}

function BanListModal({ goBack, guildId }) {
  const key = `bans-${guildId}`;
  const { data } = useQuery(key, () =>
    getBanList(guildId).then((response) => response.data)
  );
  const cache = useQueryClient();

  const unbanUser = async (id) => {
    const { data } = await unbanMember(guildId, id);
    if (data) {
      cache.setQueryData(key, (d) => {
        return d?.filter((b) => b.id !== id);
      });
    }
  };

  return (
    <ModalContent bg="brandGray.light" maxH={"500px"}>
      <ModalHeader fontWeight="bold" pb="0">
        {data?.length} Bans
      </ModalHeader>
      <ModalBody pb={3} overflowY={"auto"} css={channelScrollbarCss}>
        <Text mb={2}>Bans are by account. Click on the icon to unban.</Text>

        {data?.map((m) => (
          <Flex
            p={"3"}
            _hover={{
              bg: "brandGray.dark",
              borderRadius: "5px",
            }}
            align="center"
            justify="space-between"
          >
            <Flex align="center" w={"full"}>
              <Avatar size="sm" src={m.image} />
              <Text ml="2">{m.username}</Text>
            </Flex>
            <IconButton
              icon={<IoPersonRemove />}
              borderRadius="50%"
              aria-label="unban user"
              onClick={async (e) => {
                e.preventDefault();
                await unbanUser(m.id);
              }}
            />
          </Flex>
        ))}
        {data?.length === 0 && <Text>No bans yet.</Text>}
      </ModalBody>

      <ModalFooter bg="brandGray.dark">
        <Button mr={6} variant="link" onClick={goBack} fontSize={"14px"}>
          Back
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}
