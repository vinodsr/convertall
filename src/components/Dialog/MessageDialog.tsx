import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

/** Dialog base */
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "200px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

/**
 * Generic message box
 *
 * @export
 * @param {{
 *   title: string;
 *   content: string;
 *   buttonText: string;
 *   open: boolean;
 *   onClose: () => void;
 * }} props
 * @return {*}
 */
export default function MessageDialog(props: {
  title: string;
  content: string;
  buttonText: string;
  open: boolean;
  onClose: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  /**
   * handle close of the dialog
   *
   */
  const handleClose = () => {
    props.onClose();
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {props.title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{props.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {props.buttonText}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
