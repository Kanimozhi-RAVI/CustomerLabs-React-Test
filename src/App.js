import React, { useState } from "react";
import SegmentModal from "./Components/SegmentModal";
import "./App.css";
import { SlArrowLeft } from "react-icons/sl";


function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app-container">
      <div className="app-header">
        <span className="back-arrow" style={{marginLeft:'20px'}}><SlArrowLeft/></span>
        <span className="header-title">View Audience</span>
      </div>

      <div className="center-box">
        <button className="open-btn" onClick={() => setShowModal(true)}>
          Save segment
        </button>
      </div>

      {showModal && <SegmentModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
