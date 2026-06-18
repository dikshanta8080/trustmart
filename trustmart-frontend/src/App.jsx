import React from "react";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div style={{ 
      margin: 0, 
      padding: 0, 
      width: "100vw", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: "#FFF"
    }}>
      
      {/* 1. TOP NAVIGATION BAR */}
      <div style={{
        height: "70px",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        backgroundColor: "#FFF",
        flexShrink: 0
      }}>
        {/* Brand Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            backgroundColor: "#2563EB",
            color: "#FFF",
            padding: "8px 12px",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "18px"
          }}>
            🛡️
          </div>
          <span style={{ fontSize: "22px", fontWeight: "700", color: "#111827", letterSpacing: "-0.5px" }}>
            TrustMart
          </span>
        </div>

        {/* Search Bar Input */}
        <div style={{ flex: 1, maxWidth: "500px", margin: "0 30px", position: "relative" }}>
          <span style={{ position: "absolute", left: "14px", top: "11px", color: "#9CA3AF" }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search products, brands, categories..." 
            style={{
              width: "100%",
              padding: "10px 16px 10px 40px",
              boxSizing: "border-box",
              borderRadius: "24px",
              border: "1px solid #D1D5DB",
              backgroundColor: "#F9FAFB",
              fontSize: "14px",
              outline: "none"
            }}
          />
        </div>

        {/* Right Side Settings Actions Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button style={{
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "24px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            <span>+</span> Sell
          </button>
          
          <span style={{ fontSize: "20px", cursor: "pointer", color: "#4B5563" }}>💬</span>
          
          <div style={{ position: "relative", cursor: "pointer" }}>
            <span style={{ fontSize: "20px", color: "#4B5563" }}>🔔</span>
            <span style={{
              position: "absolute", top: "-4px", right: "-4px",
              backgroundColor: "#EF4444", color: "white", fontSize: "10px",
              borderRadius: "50%", padding: "2px 5px", fontWeight: "bold"
            }}>3</span>
          </div>

          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" 
            alt="My Profile Pic" 
            style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", cursor: "pointer" }}
          />
        </div>
      </div>

      {/* 2. CHAT PAGE FRAME AREA */}
      <div style={{ flex: 1, width: "100%", minHeight: 0 }}>
        <ChatPage />
      </div>

    </div>
  );
}

export default App;