import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/Components/Header/Index";
import StandardMessageFrom from "@/Components/CustomMessageForm/StandarMessageFrom";
import Ai from "../CustomMessageForm/Ai";

const Chat = ({ user, secret }) => {
  const chatprops = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ flexBasis: "100%" }}>
        <MultiChatSocket {...chatprops} />
        <MultiChatWindow
          {...chatprops}
          style={{ height: "90vh" }}
          renderChatHeader={(chat) => <Header chat={chat} />}
          renderMessageForm={(props) => {
            if (chatprops.chat?.title.startsWith("Bard_Ai")) {
              return <Ai props={props} activeChat={chatprops.chat} />;
            }

            return (
              <StandardMessageFrom props={props} activeChat={chatprops.chat} />
            );
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
