import * as React from "react";
import Button from "@mui/material/Button";

const colors = {
  error: "#EF4444",
  primary: "#006AFE",
  secondary: "#F4F4F5",
};
const MuiButton = (props) => {
  const { children, color = "#4936EF", onClick, className } = props;

  const buttonStyle = {
    backgroundColor: '#4936EF',
    textTransform: "capitalize",
    height: "40px",
    boxShadow: "none",
    marginLeft:"1030Px"
  };

  return (
    <Button className={className}  style={buttonStyle} onClick={onClick} variant="contained" >
      {children}
    </Button>
  );
};

export default MuiButton;
