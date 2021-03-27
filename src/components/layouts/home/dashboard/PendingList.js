import { Flex, Text, UnorderedList } from "@chakra-ui/react";
import { getPendingRequests } from "api/handler/account";
import RequestListItem from "components/items/RequestListItem";
import OnlineLabel from "components/sections/OnlineLabel";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import homeStore from "stores/homeStore";
import { rKey } from "utils/querykeys";

export default function PendingList() {
  const reset = homeStore((state) => state.resetRequest);

  useEffect(() => {
    reset();
  });

  if ("no pending requests") {
    return (
      <Flex justify={"center"} align={"center"} w={"full"}>
        <Text textColor={"brandGray.accent"}>
          There are no pending friend requests
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <UnorderedList listStyleType="none" ml="0" w="full" mt="2">
        <OnlineLabel label={`Pending — ${0}`} />
        pending friend requests
      </UnorderedList>
    </>
  );
}
