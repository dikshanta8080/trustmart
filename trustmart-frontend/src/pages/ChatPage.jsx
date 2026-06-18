import { useState } from "react";
import ConversationList from "../components/ConversationList";
import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div style={{ 
      display: "flex", 
      width: "100%", 
      height: "100%", 
      backgroundColor: "#FFF",
      boxSizing: "border-box",
      overflow: "hidden"
    }}>
      {/* Left Sidebar Frame Container column */}
      <div style={{ width: "340px", height: "100%", flexShrink: 0 }}>
        <ConversationList 
          setSelectedUser={setSelectedUser} 
          activeUserId={selectedUser?.id} 
        />
      </div>
      
      {/* Right Chat feed stream container layout */}
      <div style={{ flex: 1, height: "100%", minWidth: 0 }}>
        <ChatWindow selectedUser={selectedUser} />
      </div>
    </div>
  );
}