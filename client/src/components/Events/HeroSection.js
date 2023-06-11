import classes from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <>
      <div className={classes.container}>
        <img
          src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
          alt="concert"
        />
        <div className={classes["event-info"]}>
          <div>
            <h3>Rage Against The Machine</h3>
            <div>
              <span>June 9th 2023, </span>
              <span>Vienna, Austria</span>
            </div>
          </div>
          <button>Get tickets</button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
