import { useState } from "react";

function OfferModal({ onClose, onSubmitOffer }) {
  const [offer, setOffer] = useState("");

  const handleSubmit = () => {
    if (!offer || offer <= 0) return alert("Please enter a valid amount!");
    onSubmitOffer(offer); // Sends the price back to ChatWindow
  };

  return (
    // Backdrop overlay style
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      {/* Modal Contents box */}
      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
        width: "300px",
        textAlign: "center",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>Make Official Offer</h3>

        <div style={{ marginBottom: "20px", position: "relative" }}>
          <span style={{ position: "absolute", left: "12px", top: "10px", color: "#555" }}>$</span>
          <input
            type="number"
            placeholder="Enter amount"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 10px 10px 25px",
              boxSizing: "border-box",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          <button 
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
            onClick={handleSubmit}
            style={{
              flex: 1, padding: "10px", 
              backgroundColor: "#28a745", color: "white",
              border: "none", borderRadius: "6px", cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Send Offer
          </button>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;