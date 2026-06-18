import React from "react";

function MessageBubble({ message, partnerAvatar }) {
  const isMe = message.sender === "me";

  return (
    <div style={{
      display: "flex",
      justifyContent: isMe ? "flex-end" : "flex-start",
      alignItems: "flex-end",
      width: "100%",
      margin: "4px 0"
    }}>
      {/* Show partner avatar on the left only if it's from them */}
      {!isMe && (
        <img
          src={partnerAvatar}
          alt="avatar"
          style={{ width: "28px", height: "28px", borderRadius: "50%", marginRight: "8px", marginBottom: "4px", objectFit: "cover" }}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", maxWidth: "60%" }}>
        <div style={{
          backgroundColor: isMe ? "#2563EB" : "#F3F4F6",
          color: isMe ? "#FFF" : "#111827",
          padding: "10px 16px",
          borderRadius: isMe ? "16px 16px 0px 16px" : "16px 16px 16px 0px",
          fontSize: "14px",
          lineHeight: "1.4",
          boxShadow: "0 1px 1px rgba(0,0,0,0.05)"
        }}>
          {message.text}
        </div>
        
        {/* Timestamp */}
        <span style={{
          fontSize: "10px",
          color: "#9CA3AF",
          marginTop: "4px",
          textAlign: isMe ? "right" : "left",
          paddingLeft: isMe ? "0" : "4px"
        }}>
          {message.time}
        </span>
      </div>
    </div>
  );
}

export default MessageBubble;