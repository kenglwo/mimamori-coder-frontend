import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Toolbar from "./Toolbar";
import StudentsTable from "./StudentsTable";

interface Props {}
interface State {}

class TopPage extends React.Component<Props, State> {
  public render() {
    return (
      <Container fluid>
        <Row>
          <Toolbar />
        </Row>
        <Row>
          <StudentsTable />
        </Row>
      </Container>
    );
  }
}

export default TopPage;
