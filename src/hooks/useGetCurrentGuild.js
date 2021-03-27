import { useQuery } from "react-query";
import { gKey } from "utils/querykeys";

export default function useGetCurrentGuild(guildId) {
  const { data } = useQuery(gKey);
  return data?.find((g) => g.id === guildId);
}
