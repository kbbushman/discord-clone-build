import React from "react";
import { useParams } from "react-router-dom";
import AppLayout from "components/layouts/AppLayout";
import ChatScreen from "components/layouts/guild/chat/ChatScreen";
import MessageInput from "components/layouts/guild/chat/MessageInput";
import GuildList from "components/layouts/guild/GuildList";
import FriendsDashboard from "components/layouts/home/dashboard/FriendsDashboard";
import DMHeader from "components/layouts/home/DMHeader";
import DMSidebar from "components/layouts/home/DMSidebar";

export default function Home() {
  const { channelId } = useParams();

  return (
    <AppLayout>
      <GuildList />
      <DMSidebar />
      {channelId === undefined ? (
        <FriendsDashboard />
      ) : (
        <>
          <DMHeader />
          <ChatScreen />
          <MessageInput />
        </>
      )}
    </AppLayout>
  );
}
