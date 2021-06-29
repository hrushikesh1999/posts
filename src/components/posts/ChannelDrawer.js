import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import channelsImage from "../../css/channelsImage.png";
import { Typography } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: "595px",
    marginTop: "64px",
    backgroundColor: "#e3f2fd",
    color: "#424242",
    marginLeft: "90px",
  },

  heading: {
    paddingLeft: "40px",
    marginTop: "30px",
  },
  image: {
    marginTop: "50px",
    marginLeft: "20px",
    width: "200px",
  },
  signIn: {
    marginTop: "20px",
    marginLeft: "15px",
    fontFamily: "comic sans ms",
    color: "#7986cb",
  },
}));
const ChannelDrawer = ({ renderItems, heading, isSignedIn, path }) => {
  const classes = useStyles();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        {renderItems.length !== 0 && renderItems[0] ? (
          <div>
            <h1 className={classes.heading}>{heading}</h1>
            <List>{renderItems}</List>
          </div>
        ) : (
          <div>
            <Typography variant="h3" className={classes.signIn}>
              Create your own Hashtag
            </Typography>
            <img
              className={classes.image}
              src={channelsImage}
              alt="hashtag"
            ></img>
          </div>
        )}
      </Drawer>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps)(ChannelDrawer);
