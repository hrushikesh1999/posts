import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { createPost, fetchPosts, deletePost } from "../actions";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  heading: {
    backgroundColor: "#e0f7fa",
    padding: "15px",
    marginLeft: "-40px",
    marginRight: "-40px",
    position: "relative",
    top: "-48px",
  },
  menu: {
    float: "right",
    marginTop: "-50px",
    marginRight: "20px",
  },
  btn: {
    marginLeft: "20px",
    marginTop: "-40px",
    padding: "13px",
  },
  textField: {
    width: "800px",
  },
  grid: {
    marginTop: "10px",
  },
}));

const Heading = ({
  id,
  admin,
  channel,
  createPost,
  fetchPosts,
  posts,
  deletePost,
  isSignedIn,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [postMessage, setPostMessage] = useState("");
  useEffect(() => {
    fetchPosts(id);
  }, [fetchPosts, id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onEditActionClick = () => {
    handleClose();
  };
  const renderHeading = () => {
    if (channel) {
      return (
        <div>
          <Typography variant="h3" align="center">
            {channel.nameOfChannel}
          </Typography>
          <div className={classes.menu}>
            {admin === channel.userId ? (
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                anchor="right"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            ) : null}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link
                to={`/channels/edit/${id}`}
                style={{ textDecoration: "none" }}
              >
                <MenuItem onClick={onEditActionClick}>Edit channel </MenuItem>
              </Link>
              <Link
                to={`/channels/delete/${id}`}
                style={{ textDecoration: "none" }}
              >
                <MenuItem onClick={handleClose}>Delete channel</MenuItem>
              </Link>
            </Menu>
          </div>
        </div>
      );
    }
  };
  const renderContent = () => {
    let specificPosts = posts.filter((temp) => {
      return temp.channelId === id;
    });

    return (
      <div>
        {isSignedIn ? (
          <form noValidate autoComplete="off">
            <TextareaAutosize
              value={postMessage}
              onChange={(e) => setPostMessage(e.target.value)}
              className={classes.textField}
              rowsMin={3}
              placeholder="create a post"
            />
            <Button
              onClick={() => createPost(id, postMessage)}
              className={classes.btn}
              variant="outlined"
              color="primary"
            >
              Post
            </Button>
          </form>
        ) : null}
        {console.log(specificPosts)}
        <Grid container spacing={3} className={classes.grid}>
          {specificPosts.map((post) => {
            return (
              <Grid container item xs={12} md={6} lg={4} key={post.id}>
                <Card>
                  <CardHeader
                    avatar={
                      posts.length !== 0 ? (
                        <Avatar className={classes.avatar}>
                          {post.name ? post.name[0] : "u"}
                        </Avatar>
                      ) : null
                    }
                    action={
                      isSignedIn && admin === channel.userId ? (
                        <IconButton onClick={() => deletePost(post.id)}>
                          <DeleteIcon />
                        </IconButton>
                      ) : null
                    }
                    title={post.name}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {post.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  const classes = useStyles();
  return (
    <div>
      <div className={classes.heading}>{renderHeading()}</div>
      <div>{renderContent()}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.channels[ownProps.id],
    admin: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    posts: Object.values(state.posts),
  };
};
export default connect(mapStateToProps, { createPost, fetchPosts, deletePost })(
  Heading
);
