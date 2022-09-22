import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import "./dailogboses.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogBox(props) {
  const handleClose = () => {
    props.onSetOpenDailog();
  };

  return (
    <Dialog
      className="dialogBox"
      open={props.openDailog}
      TransitionComponent={Transition}
      keepMounted
      // onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <div>{props.title}</div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <span className="children">{props.des}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button type="button" className="btn btn-success" onClick={handleClose}>
          Ok
        </button>
      </DialogActions>
    </Dialog>
  );
}
