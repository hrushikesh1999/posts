import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "./actions";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btn: {
    position: "relative",
    left: "500px",
  },
}));

const GoogleAuth = (props) => {
  const classes = useStyles();

  const onSuccess = async (response) => {
    props.signIn(response.googleId, response.profileObj.name);
  };
  const logout = () => {
    props.signOut();
  };
  const renderAuthButton = () => {
    if (props.isSignedIn) {
      return (
        <GoogleLogout
          className={classes.btn}
          clientId="600077029362-0ftqed77of9k196ja463k7kq209ob2av.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        ></GoogleLogout>
      );
    } else {
      return (
        <GoogleLogin
          className={classes.btn}
          clientId="600077029362-0ftqed77of9k196ja463k7kq209ob2av.apps.googleusercontent.com"
          buttonText="Login In with Google"
          onSuccess={onSuccess}
          isSignedIn={true}
          cookiePolicy={"single_host_origin"}
        />
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
