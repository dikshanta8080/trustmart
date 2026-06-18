import React from "react";
// Import the clean dataset from your data file
import { users } from "../data/dummyData"; 

export default function ConversationList({ setSelectedUser, activeUserId }) {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      borderRight: "1px solid #E5E7EB",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#FFF"
    }}>
      {/* Search Header Area */}
      <div style={{ padding: "20px 24px 12px 24px" }}>
        <h2 style={{ margin: "0 0 14px 0", fontSize: "22px", fontWeight: "700", color: "#111827" }}>Messages</h2>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: "14px", top: "10px", color: "#9CA3AF" }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search conversations..." 
            style={{
              width: "100%",
              padding: "10px 12px 10px 38px",
              boxSizing: "border-box",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#F9FAFB",
              fontSize: "14px",
              outline: "none"
            }}
          />
        </div>
      </div>

      {/* Conversations Stream */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Loop through the imported "users" array directly */}
        {users.map((user) => {
          const isActive = user.id === activeUserId;
          return (
            <div 
              key={user.id}
              onClick={() => setSelectedUser(user)}
              style={{
                display: "flex",
                padding: "16px 24px",
                cursor: "pointer",
                backgroundColor: isActive ? "#EFF6FF" : "transparent",
                borderBottom: "1px solid #F3F4F6",
                transition: "background-color 0.2s"
              }}
            >
              {/* Profile Image View */}
              <div style={{ position: "relative", marginRight: "12px", flexShrink: 0 }}>
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }} 
                  />
                ) : (
                  <div style={{ 
                    width: "48px", 
                    height: "48px", 
                    borderRadius: "50%", 
                    backgroundColor: "#E5E7EB", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontWeight: "bold", 
                    color: "#4B5563" 
                  }}>
                    {user.name ? user.name[0] : "?"}
                  </div>
                )}
                
                {user.status === "Online" && (
                  <div style={{
                    position: "absolute", bottom: "2px", right: "2px",
                    width: "12px", height: "12px", borderRadius: "50%",
                    backgroundColor: "#10B981", border: "2px solid #FFF"
                  }} />
                )}
              </div>

              {/* Information Row Text elements */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "600", color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {user.name}
                    </h4>
                    <span style={{ fontSize: "11px", color: "#2563EB", fontWeight: "600" }}>{user.item?.price}</span>
                  </div>
                  <span style={{ fontSize: "12px", color: "#9CA3AF", whiteSpace: "nowrap", marginLeft: "8px" }}>
                    {user.time}
                  </span>
                </div>

                <p style={{ margin: "0 0 6px 0", fontSize: "13px", color: user.unreadCount > 0 ? "#111827" : "#6B7280", fontWeight: user.unreadCount > 0 ? "500" : "400", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.lastMessage}
                </p>

                {/* Subtag item badges */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {user.item?.image && (
                    <img 
                      src={user.item.image} 
                      alt="item thumbnail" 
                      style={{ width: "16px", height: "16px", borderRadius: "4px", objectFit: "cover" }} 
                    />
                  )}
                  <span style={{ fontSize: "12px", color: "#4B5563", fontWeight: "500" }}>{user.item?.title || "Item"}</span>
                </div>
              </div>

              {/* Notification Badge Circle */}
              {user.unreadCount > 0 && (
                <div style={{
                  marginLeft: "8px", alignSelf: "center",
                  backgroundColor: "#2563EB", color: "#FFF",
                  fontSize: "11px", fontWeight: "700",
                  borderRadius: "50%", width: "18px", height: "18px",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {user.unreadCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}