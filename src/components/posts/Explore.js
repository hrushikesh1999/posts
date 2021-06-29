import React, { useEffect, useState } from "react";
import Header from "../Header";
import ChannelDrawer from "./ChannelDrawer";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchChannels } from "../actions";
import Heading from "./Heading";

const useStyles = makeStyles((theme) => ({
  listItems: {
    paddingLeft: "20px",
    fontSize: "25px",
  },
  activeListItems: {
    paddingLeft: "20px",
    fontSize: "25px",
    backgroundColor: "#f4f4f4",
  },
}));
const Explore = ({ channels, fetchChannels }) => {
  const [selectedChannel, setSelectedChannel] = useState(0);
  const classes = useStyles();
  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);
  const renderChannels = () =>
    channels.map((channel, index) => {
      return (
        <div key={channel.id}>
          <ListItem
            button
            onClick={() => setSelectedChannel(index)}
            className={
              index === selectedChannel
                ? classes.activeListItems
                : classes.listItems
            }
          >
            {channel.nameOfChannel}
          </ListItem>
        </div>
      );
    });
  const renderContent = () => {
    if (channels.length !== 0) {
      return (
        <div>
          <Heading id={channels[selectedChannel].id} path="explore"></Heading>
        </div>
      );
    }
  };

  return (
    <div className="explore">
      <Header></Header>
      <ChannelDrawer
        heading="All channels"
        renderItems={renderChannels()}
      ></ChannelDrawer>
      {renderContent()}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    channels: Object.values(state.channels),
  };
};

export default connect(mapStateToProps, { fetchChannels })(Explore);
