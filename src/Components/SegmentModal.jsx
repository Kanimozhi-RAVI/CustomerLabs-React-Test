import React, { useState } from "react";
import "../App.css";
import { SlArrowLeft } from "react-icons/sl";

const allOptions = [
  { label: "First Name", value: "first_name", type: "user" },
  { label: "Last Name", value: "last_name", type: "user" },
  { label: "Gender", value: "gender", type: "user" },
  { label: "Age", value: "age", type: "user" },
  { label: "Account Name", value: "account_name", type: "group" },
  { label: "City", value: "city", type: "group" },
  { label: "State", value: "state", type: "group" },
];

const SegmentModal = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(allOptions);
  const [currentSelect, setCurrentSelect] = useState("");

  const handleAddSchema = () => {
    if (!currentSelect) return alert("Select a schema first!");

    const selectedOption = availableOptions.find(
      (opt) => opt.value === currentSelect
    );
    setSelectedSchemas([...selectedSchemas, selectedOption]);
    setAvailableOptions(availableOptions.filter((opt) => opt.value !== currentSelect));
    setCurrentSelect("");
  };

  const handleRemoveSchema = (value) => {
    const removed = selectedSchemas.find((s) => s.value === value);
    setSelectedSchemas(selectedSchemas.filter((s) => s.value !== value));
    setAvailableOptions([...availableOptions, removed]);
  };

  const handleChangeSchema = (oldValue, newValue) => {
    const newOpt = availableOptions.find((opt) => opt.value === newValue);
    const oldOpt = selectedSchemas.find((s) => s.value === oldValue);
    if (!newOpt) return;

    const updatedSchemas = selectedSchemas.map((s) =>
      s.value === oldValue ? newOpt : s
    );
    setSelectedSchemas(updatedSchemas);
    setAvailableOptions(
      availableOptions.filter((opt) => opt.value !== newValue).concat(oldOpt)
    );
  };

  const handleSave = async () => {
    if (!segmentName) return alert("Enter segment name!");
    if (selectedSchemas.length === 0) return alert("Add at least one schema!");

    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map((s) => ({ [s.value]: s.label })),
    };

    console.log("Payload to send:", payload);

   try {
  const response = await fetch("api/7ef5b6e7-7e50-4017-bd64-a1e481dfbadd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    alert(`${segmentName} Saved Successfully!`);
    onClose();
  } else {
    alert(`Error saving segment! Status: ${response.status}`);
  }
} catch (err) {
  console.error("Fetch error:", err);
  alert("Error sending request (CORS or network issue)");
}
  }

  return (
    <div className="overlay">
      <div className="segment-modal">
        <div className="modal-header"  style={{display:"flex",alignItems:"center"}}>
          <span className="back-arrow"><SlArrowLeft/></span>
          <h3>Saving Segment</h3>
        </div>

        <div className="modal-body">
          <label>Enter the Name of the Segment</label>
          <input
            type="text"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />

          <p className="info-text">
            To save your segment, you need to add schemas to build the query.
          </p>

          <div className="legend" >
            <span className="dot green"></span> - User Traits &nbsp;
            <span className="dot red"></span> - Group Traits
          </div>

          <div className="schema-box">
            {selectedSchemas.map((s) => (
              <div key={s.value} className="schema-row">
                <span
                  className={`dot ${s.type === "user" ? "green" : "red"}`}
                ></span>

                <select
                  value={s.value}
                  onChange={(e) => handleChangeSchema(s.value, e.target.value)}
                >
                  <option value={s.value}>{s.label}</option>
                  {availableOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <button
                  className="remove-icon"
                  onClick={() => handleRemoveSchema(s.value)}
                >
                  –
                </button>
              </div>
            ))}

            <div className="schema-row">
              <span
                className={`dot ${
                  currentSelect
                    ? allOptions.find((o) => o.value === currentSelect)?.type ===
                      "group"
                      ? "red"
                      : "green"
                    : "gray"
                }`}
              ></span>

              <select
                value={currentSelect}
                onChange={(e) => setCurrentSelect(e.target.value)}
              >
                <option value="">Add schema to segment</option>
                {availableOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <button className="remove-icon disabled">–</button>
            </div>

            <p className="add-new" onClick={handleAddSchema}>
              + Add new schema
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="save-btn" onClick={handleSave}>
            Save the Segment
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SegmentModal;
