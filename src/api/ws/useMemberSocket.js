import { useEffect } from "react";
import { useQueryClient } from "react-query";
import getSocket from "../getSocket";

export default function useMemberSocket(guildId, key) {
  const cache = useQueryClient();

  useEffect(() => {
    const socket = getSocket();
    socket.emit("joinGuild", guildId);
    socket.on("add_member", (newMember) => {
      cache.setQueryData(key, (data) => {
        return [...data, newMember].sort((a, b) =>
          a.username.localeCompare(b.username)
        );
      });
    });

    socket.on("remove_member", (memberId) => {
      cache.setQueryData(key, (data) => {
        return [...data?.filter((m) => m.id !== memberId)];
      });
    });

    socket.on("toggle_online", (memberId) => {
      cache.setQueryData(key, (data) => {
        const index = data?.findIndex((m) => m.id === memberId);
        if (index !== -1) {
          data[index].isOnline = true;
        }
        return data;
      });
    });

    socket.on("toggle_offline", (memberId) => {
      cache.setQueryData(key, (data) => {
        const index = data?.findIndex((m) => m.id === memberId);
        if (index !== -1) {
          data[index].isOnline = false;
        }
        return data;
      });
    });

    return () => {
      socket.emit("leaveRoom", guildId);
      socket.disconnect();
    };
  }, [key, cache, guildId]);
}
