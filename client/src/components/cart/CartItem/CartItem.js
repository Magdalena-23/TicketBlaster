import React from "react";
import classes from "./CartItem.module.css";
import Button from "../../common/Button/Button";

const CartItem = (props) => {
  const handleRemoveClick = () => {
    props.handleRemove(props.id);
  };

  return (
    <>
      <div className={`${classes["cart-item"]}`}>
        <div
          className={`${classes.flex} ${
            props.smaller ? classes["smaller-gap"] : classes["big-gap"]
          }`}
        >
          <div
            className={
              props.smaller
                ? classes["smaller-img-container"]
                : classes["img-container"]
            }
          >
            <img src={props.img} alt="event" />
          </div>
          <div className={classes.left}>
            <h2>{props.artist}</h2>
            <span className={classes.date}>{props.date}</span>
            <span className={classes.location}>
              {props.city}, {props.country}
            </span>
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.price}>
            ${(props.quantity * props.price).toFixed(2)} USD
          </div>
          <span className={classes.date}>
            {props.quantity} x $
            {props.price !== undefined && props.price !== null
              ? props.price.toFixed(2)
              : ""}{" "}
            USD
          </span>
          {!props.button && (
            <Button className={classes.btn} onClick={handleRemoveClick}>
              Remove
            </Button>
          )}
          {props.children}
        </div>
      </div>
    </>
  );
};

export default CartItem;
