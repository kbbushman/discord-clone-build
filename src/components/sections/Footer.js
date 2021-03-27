import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import StyledTooltip from "./StyledTooltip";

export function FooterLink({ icon, href, label }) {
  return (
    <StyledTooltip label={label} position={"top"}>
      <Link
        display="inline-block"
        href={href}
        aria-label={label}
        isExternal
        mx={2}
      >
        <Box as={icon} width="24px" height="24px" color="gray.400" />
      </Link>
    </StyledTooltip>
  );
}

export default function Footer() {
  return (
    <Flex bottom={0} as="footer" align="center" justify="center" w="100%" p={8}>
      <Box textAlign="center">
        <Text fontSize="xl">
          <span>Discord | 2021</span>
        </Text>
      </Box>
    </Flex>
  );
}
