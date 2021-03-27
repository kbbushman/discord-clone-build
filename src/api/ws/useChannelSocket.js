import { useEffect } from "react";
import getSocket from "../getSocket";
import { useHistory, useLocation } from "react-router-dom";
import { useQueryClient } from "react-query";
import useGetCurrentGuild from "hooks/useGetCurrentGuild";

export default function useChannelSocket(guildId, key) {
  const location = useLocation();
  const history = useHistory();
  const cache = useQueryClient();
  const guild = useGetCurrentGuild(guildId);

  useEffect(() => {
    const socket = getSocket();
    socket.emit("joinGuild", guildId);

    const disconnect = () => {
      socket.emit("leaveGuild", guildId);
      socket.disconnect();
    };

    socket.on("add_channel", (newChannel) => {
      cache.setQueryData(key, (data) => {
        return [...data, newChannel];
      });
    });

    socket.on("edit_channel", (editedChannel) => {
      cache.setQueryData(key, (d) => {
        const index = d?.findIndex((c) => c.id === editedChannel.id);
        if (index !== -1) {
          d[index] = editedChannel;
        } else if (editedChannel.isPublic) {
          d.push(editedChannel);
        }
        return d;
      });
    });

    socket.on("delete_channel", (deleteId) => {
      cache.setQueryData(key, (d) => {
        const currentPath = `/channels/${guildId}/${deleteId}`;
        if (location.pathname === currentPath && guild) {
          if (deleteId === guild.default_channel_id) {
            history.replace("/channels/me");
          } else {
            history.replace(`${guild.default_channel_id}`);
          }
        }
        return d?.filter((c) => c.id !== deleteId);
      });
    });

    socket.on("new_notification", (id) => {
      const currentPath = `/channels/${guildId}/${id}`;
      if (location.pathname !== currentPath) {
        cache.setQueryData(key, (d) => {
          const index = d?.findIndex((c) => c.id === id);
          if (index !== -1) {
            d[index] = { ...d[index], hasNotification: true };
          }
          return d;
        });
      }
    });

    window.addEventListener("beforeunload", disconnect);

    return () => disconnect();
  }, [guildId, key, cache, history, location, guild]);
}
