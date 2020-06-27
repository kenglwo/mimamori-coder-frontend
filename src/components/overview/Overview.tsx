import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Toolbar from "./Toolbar";
import StudentsTable from "./StudentsTable";
import { DisplayOption } from "../models/Types";

interface Props {}
interface State {
  displayStyle: string;
  displayOrder: string;
}

class TopPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      displayStyle: "table",
      displayOrder: "studentID",
    };

    this.changeDisplayOrder = this.changeDisplayOrder.bind(this);
    this.changeDisplayStyle = this.changeDisplayStyle.bind(this);
  }

  public changeDisplayOrder(eventKey: string) {
    let order: DisplayOption["order"] = eventKey as DisplayOption["order"];
    this.setState({ displayOrder: order });
  }

  public changeDisplayStyle(value: string) {
    let style: DisplayOption["style"] = value as DisplayOption["style"];
    this.setState({ displayStyle: style });
  }

  public render() {
    return (
      <Container fluid>
        <Row>
          <Toolbar
            onSelectDisplayOrder={this.changeDisplayOrder}
            onChangeDisplayStyle={this.changeDisplayStyle}
          />
        </Row>
        <Row className="mr-3">
          <StudentsTable
            displayStyle={this.state.displayStyle}
            displayOrder={this.state.displayOrder}
          />
        </Row>
      </Container>
    );
  }
}

export default TopPage;
