import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/Components/Header/Index";
import StandardMessageFrom from "@/Components/CustomMessageForm/StandarMessageFrom";

const Chat = () => {
  const chatprops = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    "test1",
    "1234"
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatprops} />
      <MultiChatWindow
        {...chatprops}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          return (
            <StandardMessageFrom props={props} activeChat={chatprops.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
