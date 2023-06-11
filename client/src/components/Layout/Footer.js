import Navigation from "../UI/Navigation";
import classes from "./Footer.module.css";
import LayoutComponent from "./LayoutComponent";

const Footer = () => {
  return (
    <LayoutComponent>
      <Navigation />
      <div>
        <span className={classes.span}>Copyright TicketBlaster 2023</span>
      </div>
    </LayoutComponent>
  );
};

export default Footer;
