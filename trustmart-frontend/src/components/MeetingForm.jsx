import { useState } from "react";

function MeetingForm({ onClose, onSubmitMeeting }) {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!location.trim() || !date || !time) {
      alert("Please fill out all fields to propose a secure meet-up.");
      return;
    }

    // Pass the safe structured data back up to ChatWindow
    onSubmitMeeting({ location, date, time });
  };

  return (
    // Screen backdrop overlay
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      {/* Form Container */}
      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ margin: "0 0 5px 0", color: "#333", textAlign: "center" }}>🤝 Schedule Meet-up</h3>
        <p style={{ fontSize: "12px", color: "#777", textAlign: "center", marginBottom: "20px" }}>
          Propose a safe, public location to exchange goods.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
          {/* Location Input */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>
              Meeting Location
            </label>
            <input
              type="text"
              placeholder="e.g., Starbucks Downtown / Police Safe Zone"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: "100%", padding: "10px", boxSizing: "border-box",
                borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px"
              }}
            />
          </div>

          {/* Date Input */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%", padding: "10px", boxSizing: "border-box",
                borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px"
              }}
            />
          </div>

          {/* Time Input */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                width: "100%", padding: "10px", boxSizing: "border-box",
                borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px"
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button 
              type="button"
              onClick={onClose}
              style={{
                flex: 1, padding: "10px", 
                backgroundColor: "#6c757d", color: "white",
                border: "none", borderRadius: "6px", cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{
                flex: 1, padding: "10px", 
                backgroundColor: "#17a2b8", color: "white",
                border: "none", borderRadius: "6px", cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Send Proposal
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default MeetingForm;