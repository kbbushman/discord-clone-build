import React from "react";
import settingsStore from "stores/settingsStore";
import AppLayout from "components/layouts/AppLayout";
import ChannelHeader from "components/layouts/guild/ChannelHeader";
import Channels from "components/layouts/guild/Channels";
import ChatScreen from "components/layouts/guild/chat/ChatScreen";
import MessageInput from "components/layouts/guild/chat/MessageInput";
import GuildList from "components/layouts/guild/GuildList";
import MemberList from "components/layouts/guild/MemberList";

export default function ViewGuild() {
  const showMemberList = settingsStore((state) => state.showMembers);

  return (
    <AppLayout showLastColumn={showMemberList}>
      <GuildList />
      <Channels />
      <ChannelHeader />
      <ChatScreen />
      <MessageInput />
      {showMemberList && <MemberList />}
    </AppLayout>
  );
}
