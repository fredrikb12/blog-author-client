import React from "react";

const ConfirmDelete = React.forwardRef((props, ref) => {
  const { handleClick, show } = props;
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        position: "absolute",
        top: 0,
      }}
    >
      <dialog
        style={{
          position: "relative",
          minWidth: "clamp(250px, 35vw, 500px)",
          minHeight: "clamp(200px, 35vh, 350px)",
          top: "20%",
        }}
        ref={ref}
        open={show}
      >
        Are you sure you want to delete this post?
        <div style={{ display: "flex", gap: "20px" }}>
          <button onClick={() => handleClick("deleteConfirm")}>Confirm</button>
          <button onClick={() => handleClick("deleteCancel")}>Cancel</button>
        </div>
      </dialog>
    </div>
  );
});
export default ConfirmDelete;
