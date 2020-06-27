import React from "react";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Dropdown from "react-bootstrap/Dropdown";

interface Props {
  onSelectDisplayOrder: (eventKey: string) => void;
  onChangeDisplayStyle: (value: string) => void;
}
interface State {}

class Toolbal extends React.Component<Props, State> {
  // constructor(props: Props) {
  //   super(props);
  // }

  public render() {
    return (
      <div className="mt-4 ml-2 p-2 bg-dark">
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue={"table"}
          onChange={this.props.onChangeDisplayStyle}
          className="float-left mr-4"
        >
          <ToggleButton variant="secondary" value={"table"}>
            Table
          </ToggleButton>
          <ToggleButton variant="secondary" value={"card"}>
            Card
          </ToggleButton>
        </ToggleButtonGroup>
        <Dropdown
          className="float-left"
          onSelect={this.props.onSelectDisplayOrder}
        >
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            Display Order
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="studentID">Student ID</Dropdown.Item>
            <Dropdown.Item eventKey="commits_asc">Commits (asc)</Dropdown.Item>
            <Dropdown.Item eventKey="commits_desc">
              Commits (desc)
            </Dropdown.Item>
            <Dropdown.Item eventKey="updated_time_asc">
              Updated Time (asc)
            </Dropdown.Item>
            <Dropdown.Item eventKey="updated_time_desc">
              Updated Time (desc)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default Toolbal;
