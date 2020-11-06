import React from "react";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

interface Props {
  displayOrder: string;
  onSelectDisplayOrder: (eventKey: string) => void;
  onChangeDisplayStyle: (value: string) => void;
  onChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface State {
  displayOrder: string;
}

class Toolbal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      displayOrder: this.props.displayOrder,
    };
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.displayOrder !== prevProps.displayOrder) {
      this.setState({ displayOrder: this.props.displayOrder });
    }
  }

  public render() {
    return (
      <div className="mt-4 ml-2 p-2 bg-dark">
        <Dropdown
          className="float-left mr-4"
          onSelect={this.props.onSelectDisplayOrder}
        >
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            Display Order
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              eventKey="studentID"
              active={this.state.displayOrder === "studentID"}
            >
              Student ID
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="commits_asc"
              active={this.state.displayOrder === "commits_asc"}
            >
              Commits (asc)
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="commits_desc"
              active={this.state.displayOrder === "commits_desc"}
            >
              Commits (desc)
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="updated_time_asc"
              active={this.state.displayOrder === "updated_time_asc"}
            >
              Updated Time (asc)
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="updated_time_desc"
              active={this.state.displayOrder === "updated_time_desc"}
            >
              Updated Time (desc)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form className="mt-1" inline>
          <Form.Group>
            <Form.Check
              className="text-white"
              type="checkbox"
              label="show unkown students"
              onChange={this.props.onChangeCheckbox}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Toolbal;
