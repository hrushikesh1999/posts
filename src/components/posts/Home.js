import React, { useState, useEffect } from "react";
import Header from "../Header";
import ChannelDrawer from "./ChannelDrawer";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Heading from "./Heading";
import { fetchAdminChannels } from "../actions";
import { Typography } from "@material-ui/core";
import postsImage from "../../css/postsImage.png";

const useStyles = makeStyles(() => ({
  listItems: {
    paddingLeft: "20px",
    fontSize: "25px",
  },
  activeListItems: {
    paddingLeft: "20px",
    fontSize: "25px",
    backgroundColor: "#f4f4f4",
  },
  signIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    fontFamily: "comic sans ms",
    color: "#7986cb",
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));
const Home = ({ adminChannels, fetchAdminChannels, isSignedIn, userId }) => {
  const [selectedChannel, setSelectedChannel] = useState(0);
  const classes = useStyles();
  useEffect(() => {
    fetchAdminChannels();
  }, [fetchAdminChannels, isSignedIn]);

  const renderChannels = () =>
    adminChannels.map((adminChannels, index) => {
      if (adminChannels.userId === userId) {
        return (
          <div key={adminChannels.id}>
            <ListItem
              button
              onClick={() => setSelectedChannel(index)}
              className={
                index === selectedChannel
                  ? classes.activeListItems
                  : classes.listItems
              }
            >
              {adminChannels.nameOfChannel}
            </ListItem>
          </div>
        );
      } else {
        return null;
      }
    });
  const renderContent = () => {
    if (isSignedIn && adminChannels.length !== 0) {
      return (
        <div>
          <Heading id={adminChannels[selectedChannel].id} path="home"></Heading>
        </div>
      );
    } else {
      return (
        <div>
          <Typography variant="h3" className={classes.signIn}>
            Login to write a post
          </Typography>
          <img src={postsImage} alt="post" className={classes.image}></img>
        </div>
      );
    }
  };
  return (
    <div className="Home">
      <Header></Header>
      <ChannelDrawer
        heading="My channels"
        renderItems={renderChannels()}
      ></ChannelDrawer>
      {renderContent()}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    adminChannels: Object.values(state.adminChannels),
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchAdminChannels })(Home);
