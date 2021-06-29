import React, { useEffect } from "react";
import history from "../history";
import Header from "../Header";
import { fetchChannel, deleteChannel } from "../actions";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  btns: {
    padding: "15px",
    width: "300px",
    marginLeft: "100px",
    marginTop: "15px",
  },
}));

const DeleteChannel = ({ fetchChannel, channel, deleteChannel }) => {
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    fetchChannel(id);
  }, [fetchChannel, id]);

  const renderDeleteChannel = () => {
    const onOkClick = () => {
      deleteChannel(id);
    };
    if (channel) {
      return (
        <div>
          <Typography variant="h3">
            Are you sure you want to delete "{channel.nameOfChannel}" channel ?
          </Typography>
          <Button
            onClick={onOkClick}
            variant="outlined"
            color="primary"
            className={classes.btns}
          >
            ok
          </Button>
          <br></br>
          <Button
            variant="outlined"
            color="primary"
            className={classes.btns}
            onClick={() => history.push(`/channel/${id}`)}
          >
            cancel
          </Button>
        </div>
      );
    }
  };
  return (
    <div>
      <Header></Header>
      {renderDeleteChannel()}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.channels[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchChannel, deleteChannel })(
  DeleteChannel
);
