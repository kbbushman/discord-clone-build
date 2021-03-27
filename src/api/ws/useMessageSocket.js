import { useEffect } from "react";
import { useQueryClient } from "react-query";
import channelStore from "stores/channelStore";
import userStore from "stores/userStore";
import getSocket from "../getSocket";

export default function useMessageSocket(channelId, key) {
  const current = userStore((state) => state.current);
  const store = channelStore();
  const cache = useQueryClient();

  useEffect(() => {
    store.reset();
    const socket = getSocket();
    socket.emit("joinChannel", channelId);

    socket.on("new_message", (newMessage) => {
      cache.setQueryData(key, (d) => {
        d?.pages[0].unshift(newMessage);
        return d;
      });
    });

    socket.on("edit_message", (editMessage) => {
      cache.setQueryData(key, (d) => {
        let index = -1;
        let editId = -1;
        d?.pages.forEach((p, i) => {
          editId = p.findIndex((m) => m.id === editMessage.id);
          if (editId !== -1) index = i;
        });

        if (index !== -1 && editId !== -1) {
          d.pages[index][editId] = editMessage;
        }
        return d;
      });
    });

    socket.on("delete_message", (toBeRemoved) => {
      cache.setQueryData(key, (d) => {
        let index = -1;
        d?.pages.forEach((p, i) => {
          if (p.findIndex((m) => m.id === toBeRemoved.id) !== -1) index = i;
        });
        if (index !== -1) {
          d.pages[index] = d?.pages[index].filter(
            (m) => m.id !== toBeRemoved.id
          );
        }
        return d;
      });
    });

    socket.on("addToTyping", (username) => {
      if (username !== current?.username) {
        store.addTyping(username);
      }
    });

    socket.on("removeFromTyping", (username) => {
      if (username !== current?.username) {
        store.removeTyping(username);
      }
    });

    return () => {
      socket.emit("leaveRoom", channelId);
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [channelId, cache, key, current]);
}
