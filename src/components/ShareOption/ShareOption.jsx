import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";


export default function Login(props) {
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={props.onSubmit}>
          <DialogTitle id="form-dialog-title">
            Login To Your Account!
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              name="email"
              fullWidth
              onChange={props.onChange}
            />
            <TextField
              margin="dense"
              id="name"
              label="Password"
              type="password"
              name="password"
              fullWidth
              onChange={props.onChange}
            />
          </DialogContent>
          {/* <CustomAlert errMessage={props.errMessage} /> */}
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
