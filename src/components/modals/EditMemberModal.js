import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import {
  changeGuildMemberSettings,
  getGuildMemberSettings,
} from "api/handler/guilds";
import { Form, Formik } from "formik";
import React from "react";
import { TwitterPicker } from "react-color";
import { useQuery } from "react-query";
import userStore from "stores/userStore";
import toErrorMap from "utils/toErrorMap";
import { MemberSchema } from "validation/member.schema";
import InputField from "components/shared/InputField";

export default function EditMemberModal({ guildId, isOpen, onClose }) {
  async function handleEditMemberAppearance() {}

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="brandGray.light">
        <Formik
          initialValues={{
            color: "",
            nickname: "",
          }}
          validationSchema={MemberSchema}
          onSubmit={handleEditMemberAppearance}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <ModalHeader fontWeight="bold" pb={0}>
                Change Appearance
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <InputField
                  color={values.color ?? undefined}
                  label="nickname"
                  name="nickname"
                  value={values.nickname}
                />
                <Text
                  mt={"2"}
                  ml={"1"}
                  color={"brandGray.accent"}
                  _hover={{
                    cursor: "pointer",
                    color: "highlight.standard",
                  }}
                  fontSize={"14px"}
                  onClick={() => setFieldValue("nickname", null)}
                >
                  Reset Nickname
                </Text>

                <Divider my={"4"} />

                <TwitterPicker
                  color={values.color || "#fff"}
                  onChangeComplete={(color) => {
                    if (color) setFieldValue("color", color.hex);
                  }}
                  className={"picker"}
                />

                <Text
                  mt={"2"}
                  ml={"1"}
                  color={"brandGray.accent"}
                  _hover={{
                    cursor: "pointer",
                    color: "highlight.standard",
                  }}
                  fontSize={"14px"}
                  onClick={() => setFieldValue("color", "#fff")}
                >
                  Reset Color
                </Text>
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
                  Save
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
