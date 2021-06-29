import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

import { fade, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExploreIcon from "@material-ui/icons/Explore";
import TextField from "@material-ui/core/TextField";
import ModalComp from "./ModalComp";
import { connect } from "react-redux";
import { ModalOpen, ModalClose, createChannel } from "./actions";

const drawerWidth = 90;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#009688",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#009688",
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
  listItem: {
    padding: "30px",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.15),
    },
  },
  actionBtn: {
    marginLeft: "15px",
    fontSize: "17px",
  },

  navIcon: {
    color: "#ede7f6",
  },
  activeListItem: {
    padding: "30px",
    backgroundColor: "#80cbc4",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.5),
    },
  },
  textField: {
    width: "50ch",
    marginTop: "15px",
  },
}));

const Header = (props) => {
  const [channelName, setChannelName] = useState("");
  const [channelNameError, setChannelNameError] = useState(false);
  const location = useLocation();
  const classes = useStyles();

  const onAddChannelClick = () => {
    if (props.isSignedIn) {
      props.ModalOpen();
    }
  };
  const renderTitleM = () => {
    return "Create a #channel";
  };
  const renderContentM = () => {
    return (
      <React.Fragment>
        <form noValidate autoComplete="off">
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="channel name"
            variant="outlined"
            value={channelName}
            error={channelNameError}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </form>
      </React.Fragment>
    );
  };
  const renderActionsM = () => {
    const onAddActionClick = () => {
      setChannelNameError(false);
      if (channelName === "") {
        setChannelNameError(true);
      }
      if (channelName) {
        props.createChannel(channelName);
      }
    };
    return (
      <React.Fragment>
        <Button
          className={classes.actionBtn}
          variant="outlined"
          color="primary"
          onClick={onAddActionClick}
        >
          Add
        </Button>
        <Button
          className={classes.actionBtn}
          variant="outlined"
          color="primary"
          onClick={() => props.ModalClose()}
        >
          cancel
        </Button>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <GoogleAuth></GoogleAuth>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />

        <List style={{ marginTop: "20px", marginLeft: "-10px" }}>
          <Link to="/">
            <ListItem
              button
              className={
                location.pathname === "/"
                  ? classes.activeListItem
                  : classes.listItem
              }
            >
              <HomeIcon style={{ fontSize: 50 }} className={classes.navIcon} />
            </ListItem>
          </Link>
          <ListItem
            button
            onClick={onAddChannelClick}
            className={classes.listItem}
          >
            <div>
              <AddCircleOutlineIcon
                style={{ fontSize: 50 }}
                className={classes.navIcon}
              />
            </div>
          </ListItem>
          <Link to="/explore">
            <ListItem
              button
              className={
                location.pathname === "/explore"
                  ? classes.activeListItem
                  : classes.listItem
              }
            >
              <ExploreIcon
                style={{ fontSize: 50 }}
                className={classes.navIcon}
              />
            </ListItem>
          </Link>
          <ListItem button className={classes.listItem}>
            <SearchIcon style={{ fontSize: 50 }} className={classes.navIcon} />
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
      <ModalComp
        title={renderTitleM()}
        content={renderContentM()}
        actions={renderActionsM()}
      ></ModalComp>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    open: state.open,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  ModalOpen,
  ModalClose,
  createChannel,
})(Header);
