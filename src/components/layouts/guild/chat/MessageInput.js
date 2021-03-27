import { Flex, GridItem, InputGroup, Text, Textarea } from "@chakra-ui/react";
import getSocket from "api/getSocket";
import { sendMessage } from "api/handler/messages";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ResizeTextarea from "react-textarea-autosize";
import channelStore from "stores/channelStore";
import userStore from "stores/userStore";
import { cKey, dmKey } from "utils/querykeys";
import "../css/MessageInput.css";
import FileUploadButton from "./FileUploadButton";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [currentlyTyping, setCurrentlyTyping] = useState(false);
  const inputRef = useRef();

  const { guildId, channelId } = useParams();
  const qKey = guildId === undefined ? dmKey : cKey(guildId);
  const { data } = useQuery(qKey);
  const channel = data?.find((c) => c.id === channelId);

  const socket = getSocket();
  const current = userStore((state) => state.current);
  const isTyping = channelStore((state) => state.typing);

  async function handleAddMessage(event) {}

  const getTypingString = (members) => {
    switch (members.length) {
      case 1:
        return members[0];
      case 2:
        return `${members[0]} and ${members[1]}`;
      case 3:
        return `${members[0]}, ${members[1]} and ${members[2]}`;
      default:
        return "Several people";
    }
  };

  function handleMessageChange(event) {
    const value = event.target.value;
    if (value.trim().length === 1 && !currentlyTyping) {
      socket.emit("startTyping", channelId, current?.username);
      setCurrentlyTyping(true);
    } else if (value.length === 0) {
      socket.emit("stopTyping", channelId, current?.username);
      setCurrentlyTyping(false);
    }
    if (value.length <= 2000) setText(value);
  }

  const getPlaceholder = () => {
    if (channel?.user) {
      return `Message @${channel?.user.username}`;
    }
    return `Message #${channel?.name}`;
  };

  return (
    <GridItem
      gridColumn={3}
      gridRow={3}
      px="20px"
      pb={isTyping.length > 0 ? "0" : "26px"}
      bg="brandGray.light"
    >
      <InputGroup
        size="md"
        bg="messageInput"
        alignItems="center"
        borderRadius="8px"
      >
        <Textarea
          as={ResizeTextarea}
          minH="40px"
          transition="height none"
          overflow="hidden"
          w="100%"
          resize="none"
          minRows={1}
          pl="3rem"
          name={"text"}
          placeholder={getPlaceholder()}
          border="0"
          _focus={{ border: "0" }}
          ref={inputRef}
          isDisabled={isSubmitting}
          value={text}
          onChange={handleMessageChange}
          onKeyDown={handleAddMessage}
        />
        <FileUploadButton />
      </InputGroup>
      {isTyping.length > 0 && (
        <Flex align={"center"} fontSize={"12px"} my={1}>
          <div className="typing-indicator">
            <span />
            <span />
            <span />
          </div>
          <Text ml={"1"} fontWeight={"semibold"}>
            {getTypingString(isTyping)}
          </Text>
          <Text ml={"1"}>
            {isTyping.length === 1 ? "is" : "are"} typing...{" "}
          </Text>
        </Flex>
      )}
    </GridItem>
  );
}
