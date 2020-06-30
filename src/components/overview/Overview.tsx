import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Toolbar from "./Toolbar";
import StudentsTable from "./StudentsTable";
import { DisplayOption } from "../models/Types";

interface Props
  extends RouteComponentProps<{
    headerSelectorValue: string;
    headerInputValue: string;
  }> {}
interface State {
  displayStyle: string;
  displayOrder: string;
  headerSelectorValue: string;
  headerInputValue: string;
  showUnknownStudents: boolean;
}

class Overview extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      displayStyle: "table",
      displayOrder: "studentID",
      headerSelectorValue: this.props.match.params.headerSelectorValue,
      headerInputValue: this.props.match.params.headerInputValue,
      showUnknownStudents: false,
    };

    this.changeDisplayOrder = this.changeDisplayOrder.bind(this);
    this.changeDisplayStyle = this.changeDisplayStyle.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  public changeDisplayOrder(eventKey: string) {
    let order: DisplayOption["order"] = eventKey as DisplayOption["order"];
    this.setState({ displayOrder: order });
  }

  public changeDisplayStyle(value: string) {
    let style: DisplayOption["style"] = value as DisplayOption["style"];
    this.setState({ displayStyle: style });
  }

  public onChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const showUnknownStudents = e.target.checked;
    this.setState({ showUnknownStudents: showUnknownStudents });
  }

  public componentDidUpdate(prevProps: Props) {
    if (
      this.props.match.params.headerSelectorValue !==
        prevProps.match.params.headerSelectorValue ||
      this.props.match.params.headerInputValue !==
        prevProps.match.params.headerInputValue
    ) {
      this.setState({
        headerSelectorValue: this.props.match.params.headerSelectorValue,
        headerInputValue: this.props.match.params.headerInputValue,
      });
    }
  }

  public render() {
    return (
      <Container fluid>
        <Row>
          <Toolbar
            displayOrder={this.state.displayOrder}
            onSelectDisplayOrder={this.changeDisplayOrder}
            onChangeDisplayStyle={this.changeDisplayStyle}
            onChangeCheckbox={this.onChangeCheckbox}
          />
        </Row>
        <Row className="mr-3">
          <StudentsTable
            displayStyle={this.state.displayStyle}
            displayOrder={this.state.displayOrder}
            headerSelectorValue={this.state.headerSelectorValue}
            headerInputValue={this.state.headerInputValue}
            showUnknownStudents={this.state.showUnknownStudents}
          />
        </Row>
      </Container>
    );
  }
}

export default withRouter(Overview);
