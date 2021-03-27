import React, { useEffect, useState } from "react";
import { Link as RLink, useHistory, useParams } from "react-router-dom";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { joinGuild } from "api/handler/guilds";
import { gKey } from "utils/querykeys";
import { useQueryClient } from "react-query";

export default function Invite() {
  const [errors, setErrors] = useState(null);

  return (
    <Flex minHeight="100vh" align="center" justify="center" h="full">
      <Box textAlign={"center"}>
        <Flex mb="4" justify="center">
          <Image src="/logo.png" w="80px" />
        </Flex>
        <Text>Fetching server info. Please wait.</Text>
        <Text>You will be automatically redirected.</Text>
        {errors && (
          <Box>
            <Text my="2" textColor="menuRed">
              {errors}
            </Text>
            <Text>
              Click{" "}
              <Link as={RLink} to="/channels/me" color="highlight.standard">
                here
              </Link>{" "}
              to return.
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
}
