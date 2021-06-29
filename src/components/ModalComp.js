import React from "react";
import ReactDOM from "react-dom";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ModalClose } from "./actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #64b5f6 ",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  btns: {
    marginLeft: "300px",
    marginTop: "30px",
  },
}));

const ModalComp = (props) => {
  const classes = useStyles();

  return ReactDOM.createPortal(
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.ModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{props.title}</h2>
            <div id="transition-modal-description">{props.content}</div>
            <div className={classes.btns}>{props.actions}</div>
          </div>
        </Fade>
      </Modal>
    </div>,
    document.querySelector("#modal")
  );
};
const mapStateToProps = (state) => {
  return {
    open: state.open,
  };
};

export default connect(mapStateToProps, { ModalClose })(ModalComp);
