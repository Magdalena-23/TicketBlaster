import React from "react";
import classes from "./CartItem.module.css";
import Button from "../../common/Button/Button";

const CartItem = () => {
  return (
    <>
      <div className={`${classes["cart-item"]}`}>
        <div className={classes.flex}>
          <div className={classes["img-container"]}>
            <img
              src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
              alt="event"
            />
          </div>
          <div className={classes.left}>
            <h2>Incubus</h2>
            <span className={classes.date}>June 9th, 2023</span>
            <span className={classes.location}>Zagreb, Croatia</span>
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.price}>$120.00 USD</div>
          <span className={classes.date}>2 x $60.00 USD</span>
          <Button className={classes.btn}>Remove</Button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
