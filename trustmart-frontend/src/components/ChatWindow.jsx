import { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import OfferModal from "./OfferModal";
import MeetingForm from "./MeetingForm";

function ChatWindow({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setMessages([
        { text: selectedUser.lastMessage || "Hello!", sender: "other", time: selectedUser.time || "12:00 PM" },
        { text: "Deal! Can I pick it up tomorrow?", sender: "other", time: "2:41 PM" }
      ]);
    }
  }, [selectedUser]);

  const sendTextMessage = (text) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { text, sender: "me", time: timeNow }]);
  };

  //  Safety Guard #1: If selectedUser is completely null/undefined, show a placeholder screen
  if (!selectedUser) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FFF", color: "#6B7280" }}>
        <h2>Select a conversation to start message negotiation</h2>
      </div>
    );
  }

  return (
    <div style={{ 
      flex: 1, 
      display: "flex", 
      flexDirection: "column", 
      height: "100%", 
      backgroundColor: "#FFF" 
    }}>
      
      {/* Top Profile Header and Active Deal Card */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", borderBottom: "1px solid #E5E7EB" }}>
        <div>
          <h3 style={{ margin: "0 0 2px 0", fontSize: "16px", fontWeight: "600", color: "#111827" }}>{selectedUser.name}</h3>
          <span style={{ fontSize: "12px", color: selectedUser.status === "Online" ? "#10B981" : "#9CA3AF" }}>
            ● {selectedUser.status || "Offline"}
          </span>
        </div>
        
        {/* Upper-Right Item Badge */}
        <div style={{ display: "flex", alignItems: "center", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "6px 12px", backgroundColor: "#FAFAFA" }}>
          {/*  Safety Guard #2: Check if item AND item.image exist before rendering <img> */}
          {selectedUser.item && selectedUser.item.image ? (
            <img 
              src={selectedUser.item.image} 
              alt="item" 
              style={{ width: "32px", height: "32px", borderRadius: "4px", objectFit: "cover", marginRight: "10px" }} 
            />
          ) : (
            <div style={{ width: "32px", height: "32px", borderRadius: "4px", backgroundColor: "#E5E7EB", marginRight: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>📦</div>
          )}
          
          <div style={{ marginRight: "16px" }}>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "#111827" }}>
              {selectedUser.item?.title || "No Item Listed"}
            </div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#2563EB" }}>
              {selectedUser.item?.price || ""}
            </div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#6B7280" }}>⋮</button>
        </div>
      </div>

      {/* Message Feed Canvas Area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "#FFF" }}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} partnerAvatar={selectedUser.avatar} />
        ))}
      </div>

      {/* Transaction Action Panel Bar */}
      <div style={{ display: "flex", gap: "12px", padding: "8px 24px" }}>
        <button onClick={() => setIsOfferOpen(true)} style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #2563EB", backgroundColor: "#FFF", color: "#2563EB", fontWeight: "600", cursor: "pointer", fontSize: "13px" }}>
           Make an Offer
        </button>
        <button onClick={() => setIsMeetingOpen(true)} style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #10B981", backgroundColor: "#FFF", color: "#10B981", fontWeight: "600", cursor: "pointer", fontSize: "13px" }}>
          Schedule Safe Meet-up
        </button>
      </div>

      {/* Bottom Text Inputs */}
      <MessageInput sendMessage={sendTextMessage} />

      {/* Pop-up Modals */}
      {isOfferOpen && <OfferModal onClose={() => setIsOfferOpen(false)} onSubmitOffer={(price) => { sendTextMessage(`Sent offer: $${price}`); setIsOfferOpen(false); }} />}
      {isMeetingOpen && <MeetingForm onClose={() => setIsMeetingOpen(false)} onSubmitMeeting={(d) => { sendTextMessage(`Proposing meet-up at ${d.location} on ${d.date} at ${d.time}`); setIsMeetingOpen(false); }} />}
    </div>
  );
}

export default ChatWindow;