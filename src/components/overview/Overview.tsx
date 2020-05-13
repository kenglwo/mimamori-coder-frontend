import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Toolbar from "./Toolbar";
import StudentsTable from "./StudentsTable";
import { DisplayOption } from "../models/Types";

interface Props {}
interface State {
  displayOption: DisplayOption;
}

class TopPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      displayOption: {
        style: "table",
        order: "studentID",
      },
    };

    this.changeDisplayOrder = this.changeDisplayOrder.bind(this);
    this.changeDisplayStyle = this.changeDisplayStyle.bind(this);
  }

  public changeDisplayOrder(eventKey: string) {
    let order: DisplayOption["order"] = eventKey as DisplayOption["order"];
    this.setState((state) => {
      return {
        displayOption: {
          style: state.displayOption.style,
          order: order,
        },
      };
    });
  }

  public changeDisplayStyle(value: string) {
    let style: DisplayOption["style"] = value as DisplayOption["style"];
    this.setState((state) => {
      return {
        displayOption: {
          style: style,
          order: state.displayOption.order,
        },
      };
    });
  }

  public render() {
    return (
      <Container fluid>
        <Row>
          <Toolbar
            onSelectDisplayOrder={this.changeDisplayOrder}
            onChangeDisplayStyle={this.changeDisplayOrder}
          />
        </Row>
        <Row className="mr-3">
          <StudentsTable displayOption={this.state.displayOption} />
        </Row>
      </Container>
    );
  }
}

export default TopPage;
