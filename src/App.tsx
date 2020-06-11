import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./components/common/Header";
import TopPage from "./components/top/TopPage";
import Overview from "./components/overview/Overview";
import StudentView from "./components/student/StudentView";

import "./stylesheets/App.scss";

interface Props {}
interface State {}

class App extends React.Component<Props, State> {
  public render() {
    return (
      <div className="App">
        <Container fluid>
          <Row className="mb-3">
            <Header />
          </Row>
          <Row>
            <Col>
              <BrowserRouter>
                <Switch>
                  <Route exact={true} path={"/"} component={TopPage} />
                  <Route path={"/overview"} component={Overview} />
                  <Route path={"/student/:studentID"} component={StudentView} />
                </Switch>
              </BrowserRouter>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
