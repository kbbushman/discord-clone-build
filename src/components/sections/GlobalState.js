import React, { useEffect } from "react";
import userStore from "stores/userStore";
import getSocket from "api/getSocket";
import homeStore from "stores/homeStore";

export default function GlobalState({ children }) {
  const current = userStore((state) => state.current);
  const inc = homeStore((state) => state.increment);

  useEffect(() => {
    if (current) {
      const incrementNotification = () => {
        if (!window.location.pathname.includes("/channels/me")) {
          inc();
        }
      };

      const disconnect = () => {
        socket.emit("toggleOffline");
        socket.disconnect();
      };

      const socket = getSocket();
      socket.emit("toggleOnline");
      socket.emit("joinUser", current?.id);

      socket.on("push_to_top", () => {
        incrementNotification();
      });

      socket.on("send_request", () => {
        incrementNotification();
      });

      window.addEventListener("beforeunload", disconnect);

      return () => disconnect();
    }
  }, [current, inc]);

  return <>{children}</>;
}
