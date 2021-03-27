import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { sendFriendRequest } from "api/handler/account";
import { Form, Formik } from "formik";
import React from "react";
import { useQueryClient } from "react-query";
import userStore from "stores/userStore";
import { rKey } from "utils/querykeys";
import toErrorMap from "utils/toErrorMap";
import InputField from "components/shared/InputField";

export default function AddFriendModal({ isOpen, onClose }) {
  const current = userStore((state) => state.current);
  const { hasCopied, onCopy } = useClipboard(current?.id || "");

  async function handleAddFriend() {}

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="brandGray.light">
        <Formik initialValues={{ id: "" }} onSubmit={handleAddFriend}>
          {({ isSubmitting }) => (
            <Form>
              <ModalHeader fontWeight="bold" pb={"0"}>
                ADD FRIEND
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text mb="4">You can add a friend with their UID.</Text>
                <InputGroup mb={2}>
                  <InputLeftAddon
                    bg={"#202225"}
                    borderColor={"black"}
                    children="UID"
                  />
                  <Input
                    bg="brandGray.dark"
                    borderColor={hasCopied ? "brandGreen" : "black"}
                    borderRadius="3px"
                    focusBorderColor="highlight.standard"
                    value={current?.id || ""}
                    isReadOnly
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      bg={hasCopied ? "brandGreen" : "highlight.standard"}
                      color="white"
                      _hover={{ bg: "highlight.hover" }}
                      _active={{ bg: "highlight.active" }}
                      _focus={{ boxShadow: "none" }}
                      onClick={onCopy}
                    >
                      {hasCopied ? "Copied" : "Copy"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <InputField label="Enter a user ID" name="id" />
              </ModalBody>
              <ModalFooter bg="brandGray.dark" mt="2">
                <Button
                  mr={6}
                  variant="link"
                  onClick={onClose}
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
                  Send Friend Request
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
