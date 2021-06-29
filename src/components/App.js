import { Router, Route } from "react-router-dom";
import Home from "./posts/Home";
import history from "./history";
import { makeStyles } from "@material-ui/core/styles";
import Explore from "./posts/Explore";
import EditChannel from "./posts/EditChannel";
import DeleteChannel from "./posts/DeleteChannel";

const useStyles = makeStyles((theme) => ({
  app: {
    marginLeft: "370px",
    marginRight: "40px",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Router history={history}>
        <div>
          <Route path="/" exact component={Home}></Route>
          <Route path="/explore" exact component={Explore}></Route>
          <Route
            path="/channels/edit/:id"
            exact
            component={EditChannel}
          ></Route>
          <Route
            path="/channels/delete/:id"
            exact
            component={DeleteChannel}
          ></Route>
        </div>
      </Router>
    </div>
  );
};

export default App;
