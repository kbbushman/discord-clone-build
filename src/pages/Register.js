import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { Link as RLink, useHistory } from "react-router-dom";
import InputField from "components/shared/InputField";
import { register } from "api/handler/auth";
import userStore from "stores/userStore";
import toErrorMap from "utils/toErrorMap";
import { RegisterSchema } from "validation/auth.schema";

export default function Register() {
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box px={4} width="full" maxWidth="500px" textAlign="center">
        <Flex mb="4" justify="center">
          <Image src="/logo.png" w="80px" />
        </Flex>
        <Box p={4} borderRadius={4} background="brandGray.light">
          <Box textAlign="center">
            <Heading fontSize="24px">Welcome to Discord</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Form>
              <InputField
                label="Email"
                name="email"
                autoComplete="email"
                type="email"
              />

              <InputField label="username" name="username" />

              <InputField
                label="password"
                name="password"
                autoComplete="password"
                type="password"
              />

              <Button
                background="highlight.standard"
                color="white"
                width="full"
                mt={4}
                type="submit"
                isLoading={false}
                _hover={{ bg: "highlight.hover" }}
                _active={{ bg: "highlight.active" }}
                _focus={{ boxShadow: "none" }}
              >
                Register
              </Button>
              <Text mt="4">
                Already have an account?{" "}
                <Link as={RLink} to="/login" textColor="highlight.standard">
                  Sign In
                </Link>
              </Text>
            </Form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
