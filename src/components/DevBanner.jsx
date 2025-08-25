// DevBanner.jsx
import React, { useState } from "react";

const DevBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "12px",
        right: "12px",
        backgroundColor: "#ffcc00",
        color: "#000",
        padding: "6px 12px",
        fontWeight: "bold",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        zIndex: 1100,
        fontSize: "13px",
        cursor: "pointer",
      }}
      onClick={() => setIsVisible(false)}
      title="Click to dismiss"
    >
      ⚠️ Dev Mode
    </div>
  );
};

export default DevBanner;
