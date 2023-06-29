import Modal from "./Modal";
import Button from "../Button/Button";
import classes from "./ConfirmModal.module.css";

const ConfirmModal = (props) => {
  return (
    <Modal>
      <div className={classes.confirmModal}>
        <h1>{props.title}</h1>
        <p>{props.message}</p>
        <div className={classes.buttonContainer}>
          <Button
            className={`${classes["cancel-btn"]} ${classes.btn}`}
            onClick={props.onCancel}
          >
            Cancel
          </Button>
          <Button
            className={`${classes["confirm-btn"]} ${classes.btn}`}
            onClick={() => props.onConfirm()}
          >
            {props.btnText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
