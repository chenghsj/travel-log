import React from "react";

function PopupContent({ entry, setShowPopup, viewport, handleDelete }) {
  return (
    <div>
      <img
        className="closeBtn"
        src="close.svg"
        alt="close button"
        onClick={() => setShowPopup({})}
      />
      <div
        className="popup-container"
        style={{
          minWidth: "200px",
          maxWidth: `calc(4vmin * ${viewport.zoom})`,
        }}
      >
        <h4 style={{ margin: "2px" }}>{entry.title}</h4>
        {entry?.image && (
          <img
            className="logImage"
            style={{
              minWidth: "200px",
              minHeight: "100px",
              width: `calc(4vmin * ${viewport.zoom})`,
              height: `calc(2.5vmin * ${viewport.zoom})`,
            }}
            src={entry.image}
            alt="view"
          />
        )}
        <p style={{ margin: "2px", alignSelf: "baseline" }}>
          {entry?.comments}
        </p>
        <small style={{ alignSelf: "flex-end" }}>
          <i>
            <p style={{ margin: "2px" }}>
              {new Date(entry.visitDate).toLocaleDateString()}
            </p>
          </i>
        </small>
      </div>
      <button
        className="deleteBtn"
        onClick={(e) => {
          handleDelete(e, entry._id);
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default PopupContent;
