import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { changePassword } from "api/handler/auth";
import React from "react";
import toErrorMap from "utils/toErrorMap";
import { ChangePasswordSchema } from "validation/auth.schema";
import InputField from "components/shared/InputField";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const toast = useToast();

  async function handleSubmit(values, { setErrors }) {
    try {
      const { data } = await changePassword(values);
      if (data) {
        toast({
          title: "Changed Password",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    } catch (err) {
      setErrors(toErrorMap(err));
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent bg="brandGray.light">
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalHeader textAlign="center" fontWeight="bold">
                Change your password
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text>Enter your current password and a new password</Text>
                <InputField
                  label="current password"
                  name="currentPassword"
                  autoComplete="password"
                  type="password"
                />

                <InputField
                  label="new password"
                  name="newPassword"
                  autoComplete="password"
                  type="password"
                />

                <InputField
                  label="confirm new password"
                  name="confirmNewPassword"
                  autoComplete="password"
                  type="password"
                />
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
                  _hover={{ bg: "highlight.hover" }}
                  _active={{ bg: "highlight.active" }}
                  _focus={{ boxShadow: "none" }}
                  isLoading={isSubmitting}
                  fontSize={"14px"}
                >
                  Done
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
