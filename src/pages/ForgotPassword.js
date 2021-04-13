import { Box, Button, Flex, Heading, Image, useToast } from '@chakra-ui/react';
import { forgotPassword } from 'api/handler/auth';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import toErrorMap from 'utils/toErrorMap';
import InputField from 'components/shared/InputField';
import { ForgotPasswordSchema } from 'validation/auth.schema';

export default function ForgotPassword() {
  const history = useHistory();
  const toast = useToast();

  async function handleSubmit(values, { setErrors }) {
    try {
      const { data } = await forgotPassword(values);
      if (data) {
        toast({
          title: 'Reset Password',
          description:
            'If an account with that email exists, we sent you an email',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        history.push('/');
      }
    } catch (err) {
      setErrors(toErrorMap(err));
    }
  }

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
            <Formik
              initialValues={{ email: '' }}
              validationSchema={ForgotPasswordSchema}
              onSubmit={handleSubmit}
            >
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
                    _hover={{ bg: 'highlight.hover' }}
                    _active={{ bg: 'highlight.active' }}
                    _focus={{ boxShadow: 'none' }}
                    fontSize={'14px'}
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
