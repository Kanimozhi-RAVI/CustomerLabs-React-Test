import React from "react";

const SaveSegmentButton = ({ onClick }) => {
  return (
    <button className="save-btn" onClick={onClick}>
      Save Segment
    </button>
  );
};

export default SaveSegmentButton;
