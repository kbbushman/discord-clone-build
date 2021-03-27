import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

export default function InputField({ label, ...props }) {
  const [field, { error, touched }] = useField(props);
  return (
    <FormControl mt={4} isInvalid={error != null && touched}>
      <FormLabel htmlFor={field.name}>
        <Text fontSize="12px" textTransform="uppercase">
          {label}
        </Text>
      </FormLabel>
      {/* @ts-ignore */}
      <Input
        bg="brandGray.dark"
        borderColor="black"
        borderRadius="3px"
        focusBorderColor="highlight.standard"
        {...field}
        {...props}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
