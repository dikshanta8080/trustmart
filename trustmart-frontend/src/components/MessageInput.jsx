import { useState } from "react";

function MessageInput({ sendMessage }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", padding: "16px 24px", backgroundColor: "#FFF", gap: "12px" }}>
      {/* Attachment Button */}
      <button style={{ background: "none", border: "none", fontSize: "20px", color: "#9CA3AF", cursor: "pointer" }}>🖼️</button>
      
      {/* Text Form Field */}
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        style={{
          flex: 1,
          padding: "12px 18px",
          borderRadius: "24px",
          border: "1px solid #E5E7EB",
          backgroundColor: "#F9FAFB",
          fontSize: "14px",
          outline: "none"
        }}
      />
      
      {/* Emoji Trigger Button */}
      <button style={{ background: "none", border: "none", fontSize: "20px", color: "#9CA3AF", cursor: "pointer" }}>😀</button>
      
      {/* Send Arrow Button */}
      <button 
        onClick={handleSend}
        style={{
          width: "40px", height: "40px", borderRadius: "50%",
          backgroundColor: "#2563EB", border: "none", color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "16px"
        }}
      >
        ➔
      </button>
    </div>
  );
}

export default MessageInput;