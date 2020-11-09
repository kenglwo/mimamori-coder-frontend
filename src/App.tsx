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
interface State {
  isSupervisor: boolean;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSupervisor: false,
    };
    this.changeIsSupervisor = this.changeIsSupervisor.bind(this);
  }

  public changeIsSupervisor(ifIsSupervisor: boolean) {
    this.setState({ isSupervisor: ifIsSupervisor });
  }

  public render() {
    return (
      <div className="App">
        <Container fluid>
          <BrowserRouter>
            <Row className="mt-3 mb-3">
              <Header
                isSupervisor={this.state.isSupervisor}
                changeIsSupervisor={this.changeIsSupervisor}
              />
            </Row>
            <Row>
              <Col>
                <Switch>
                  <Route exact={true} path={"/"} component={TopPage} />
                  <Route
                    path={
                      "/overview/:headerSelectorValue/:headerInputValue/:isSupervisor"
                    }
                    component={Overview}
                  />
                  <Route
                    path={
                      "/student/:studentID/:currentStudentIDIndex/:displayOrder/:isSupervisor"
                    }
                    component={StudentView}
                  />
                </Switch>
              </Col>
            </Row>
          </BrowserRouter>
        </Container>
      </div>
    );
  }
}

export default App;
