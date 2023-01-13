import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Cards, Videos, Page404, CustomRoute } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <CustomRoute exact path="/" component={Cards} title="Videos" />
          <CustomRoute exact path="/history" component={Videos} title="History" />
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
