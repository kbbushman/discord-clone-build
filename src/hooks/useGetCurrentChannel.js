import { useQuery } from "react-query";

export default function useGetCurrentChannel(channelId, key) {
  const { data } = useQuery(key);
  return data?.find((c) => c.id === channelId);
}
