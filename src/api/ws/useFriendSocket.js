import { useEffect } from "react";
import { useQueryClient } from "react-query";
import homeStore from "stores/homeStore";
import userStore from "stores/userStore";
import { fKey } from "utils/querykeys";
import getSocket from "../getSocket";

export default function useFriendSocket() {
  const current = userStore((state) => state.current);
  const setRequests = homeStore((state) => state.setRequests);
  const cache = useQueryClient();

  useEffect(() => {
    const socket = getSocket();
    socket.emit("joinUser", current?.id);
    socket.emit("getRequestCount");
    socket.on("add_friend", (newFriend) => {
      cache.setQueryData(fKey, (data) => {
        return [...data, newFriend].sort((a, b) =>
          a.username.localeCompare(b.username)
        );
      });
    });

    socket.on("remove_friend", (memberId) => {
      cache.setQueryData(fKey, (data) => {
        return [...data?.filter((m) => m.id !== memberId)];
      });
    });

    socket.on("toggle_online", (memberId) => {
      cache.setQueryData(fKey, (data) => {
        const index = data?.findIndex((m) => m.id === memberId);
        if (index !== -1) {
          data[index].isOnline = true;
        }
        return data;
      });
    });

    socket.on("toggle_offline", (memberId) => {
      cache.setQueryData(fKey, (data) => {
        const index = data?.findIndex((m) => m.id === memberId);
        if (index !== -1) {
          data[index].isOnline = false;
        }
        return data;
      });
    });

    socket.on("requestCount", (count) => {
      setRequests(count);
    });

    return () => {
      socket.emit("leaveRoom", current?.id);
      socket.disconnect();
    };
  }, [cache, current, setRequests]);
}
