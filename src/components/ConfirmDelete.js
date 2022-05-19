import React from "react";

const ConfirmDelete = React.forwardRef((props, ref) => {
  const { handleClick, show, post } = props;
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
          minWidth: "clamp(250px, 35vw, 500px)",
          minHeight: "clamp(200px, 35vh, 350px)",
          top: "20%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        ref={ref}
        open={show}
      >
        <p>Are you sure you want to delete this post?</p>
        <div style={{ display: "flex", gap: "20px" }}>
          <button onClick={() => handleClick("deleteConfirm", post)}>Confirm</button>
          <button onClick={() => handleClick("deleteCancel")}>Cancel</button>
        </div>
      </dialog>
    </div>
  );
});
export default ConfirmDelete;
