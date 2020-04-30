import React from "react";
import Button from "react-bootstrap/Button";
import "../../stylesheets/sidebar.scss";

interface Props {}
interface State {}

class Sidebar extends React.Component<Props, State> {
  public render() {
    return (
      <div className="bg-dark" id="sidebar">
        <Button variant="dark" block href="#">
          Overview
        </Button>
      </div>
    );
  }
}

export default Sidebar;
