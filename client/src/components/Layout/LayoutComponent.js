import React from "react";
import classes from "./LayoutComponent.module.css";

function LayoutComponent(props) {
  const containerStyles = props.position
    ? `${classes["header-footer"]} ${classes["fixed"]}`
    : `${classes["header-footer"]} ${classes["footer"]}`;

  return <div className={containerStyles}>{props.children}</div>;
}

export default LayoutComponent;
