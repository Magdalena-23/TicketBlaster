import Navigation from "../../common/Navigation";
import classes from "./Footer.module.css";
import LayoutComponent from "../LayoutComponent/LayoutComponent";

const Footer = () => {
  return (
    <LayoutComponent styles={classes.styles} layout={classes.layout}>
      <div className={classes.footer}>
        <Navigation />
      </div>
      <div className={classes.footer}>
        <span className={classes.span}>Copyright TicketBlaster 2023</span>
      </div>
    </LayoutComponent>
  );
};

export default Footer;
