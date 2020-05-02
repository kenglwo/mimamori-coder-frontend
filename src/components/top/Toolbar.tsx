import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

interface Props {}
interface State {}

class Toolbal extends React.Component<Props, State> {
  public render() {
    return (
      <div className="mt-4 ml-2 p-2 bg-dark">
        <ButtonGroup aria-label="Basic example" className="float-left mr-4">
          <Button variant="secondary" active>
            Table
          </Button>
          <Button variant="secondary">Card</Button>
        </ButtonGroup>
        <Dropdown className="float-left">
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            Display Order
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Student ID</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Recent Upload Time</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Latest Upload Time</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Grammatical erros</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default Toolbal;
