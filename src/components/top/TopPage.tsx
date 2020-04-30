import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Content from "./Content";

interface Props {}
interface State {}

class TopPage extends React.Component<Props, State> {
  public render() {
    return <Content />;
  }
}

export default TopPage;
