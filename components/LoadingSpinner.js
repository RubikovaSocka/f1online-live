import React from "react";

const LoadingSpinner = props => (
  <div
    style={{
      width: "100%",
      marginTop: `${props.nomargin ? "0" : "15px"}`,
      display: "flex",
      justifyContent: "center",
      fontFamily: "HK Grotesk",
      fontWeight: "600"
    }}
  >
    <div>
      <i
        style={{ textAlign: "center" }}
        className="fas fa-circle-notch fa-spin"
      />
      &nbsp;&nbsp;
      {props.title === "none" ? "" : props.title ? props.title : "Načítavam..."}
    </div>
  </div>
);

export default LoadingSpinner;
