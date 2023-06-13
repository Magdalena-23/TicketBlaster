import React from "react";
import classes from "./LayoutComponent.module.css";

function LayoutComponent(props) {
  return (
    <div className={`${classes["layout-container"]} ${props.styles}`}>
      <div className={`${classes.width} ${props.layout}`}>{props.children}</div>
    </div>
  );
}

export default LayoutComponent;
