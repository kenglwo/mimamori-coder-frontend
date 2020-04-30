import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TopPage from "./components/top/TopPage";
import "./stylesheets/App.scss";

interface Props {}
interface State {}

class App extends React.Component<Props, State> {
  public render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact={true} path={"/"} component={TopPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
