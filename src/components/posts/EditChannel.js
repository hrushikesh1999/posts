import React, { useEffect, useState } from "react";
import history from "../history";
import Header from "../Header";
import { TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchChannel } from "../actions";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { editChannel } from "../actions";

const useStyles = makeStyles((theme) => ({
  actions: {
    marginTop: "25px",
  },
  btns: {
    padding: "15px",
    width: "300px",
    marginLeft: "50px",
    marginTop: "15px",
  },
  textField: {
    width: "400px",
    marginTop: "20px",
  },
}));
const EditChannel = ({ channel, fetchChannel, editChannel }) => {
  const [editedName, setEditedName] = useState("");
  const [nameError, setNameError] = useState(false);

  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    fetchChannel(id);
  }, [fetchChannel, id]);
  const renderEditChannel = () => {
    const onDoneClick = () => {
      setNameError(false);
      if (editedName === "") {
        setNameError(true);
      }
      if (editedName) {
        editChannel(id, editedName);
      }
    };
    return (
      <div>
        <Typography variant="h3">Edit channel name:</Typography>
        <form noValidate autoComplete="off">
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="channel name"
            variant="outlined"
            value={editedName}
            error={nameError}
            onChange={(e) => {
              setEditedName(e.target.value);
            }}
          ></TextField>
        </form>
        <div className={classes.actions}>
          <Button
            onClick={onDoneClick}
            variant="outlined"
            color="primary"
            className={classes.btns}
          >
            Done
          </Button>
          <br></br>
          <Button
            variant="outlined"
            color="primary"
            className={classes.btns}
            onClick={() => history.push(`/channel/${id}`)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header></Header>
      {channel ? renderEditChannel() : null}
      {}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.channels[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchChannel, editChannel })(
  EditChannel
);
