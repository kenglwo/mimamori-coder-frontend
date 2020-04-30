import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Content from "./Content";

interface Props {}
interface State {}

class TopPage extends React.Component<Props, State> {
  public render() {
    return (
      <Container className="p-0" fluid>
        <Row>
          <Header />
        </Row>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col sm={10}>
            <Content />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TopPage;
