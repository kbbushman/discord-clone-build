import { Box, Button, Flex, Heading, Image, useToast } from "@chakra-ui/react";
import { forgotPassword } from "api/handler/auth";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import toErrorMap from "utils/toErrorMap";
import InputField from "components/shared/InputField";
import { ForgotPasswordSchema } from "validation/auth.schema";

export default function ForgotPassword() {
  async function handleSubmit() {}

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box px={4} width="full" maxWidth="500px" textAlign="center">
        <Flex mb="4" justify="center">
          <Image src="/logo.png" w="80px" />
        </Flex>
        <Box p={4} borderRadius={4} background="brandGray.light">
          <Box textAlign="center">
            <Heading fontSize="24px">Forgot Password</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik>
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    label="Email"
                    name="email"
                    autoComplete="email"
                    type="email"
                  />

                  <Button
                    background="highlight.standard"
                    color="white"
                    width="full"
                    mt={4}
                    type="submit"
                    isLoading={isSubmitting}
                    _hover={{ bg: "highlight.hover" }}
                    _active={{ bg: "highlight.active" }}
                    _focus={{ boxShadow: "none" }}
                    fontSize={"14px"}
                  >
                    Send Mail
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
