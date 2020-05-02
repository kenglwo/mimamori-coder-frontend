import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";

import TopPage from "./components/top/TopPage";
import StudentView from "./components/student/StudentView";

import "./stylesheets/App.scss";

interface Props {}
interface State {}

class App extends React.Component<Props, State> {
  public render() {
    return (
      <div className="App">
        <Container className="p-0" fluid>
          <Row>
            <Header />
          </Row>
          <Row>
            <Col sm={2} className="p-0">
              <Sidebar />
            </Col>
            <Col sm={10} className="p-0">
              <BrowserRouter>
                <Switch>
                  <Route exact={true} path={"/"} component={TopPage} />
                  <Route
                    path={"/student/:student_id"}
                    component={StudentView}
                  />
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
