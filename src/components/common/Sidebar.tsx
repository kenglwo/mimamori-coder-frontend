import React from "react";
import Button from "react-bootstrap/Button";
import "../../stylesheets/sidebar.scss";

interface Props {}
interface State {}

class SideBar extends React.Component<Props, State> {
  public render() {
    return (
      <div className="bg-dark" id="sidebar">
        <Button variant="dark" block href="/overview">
          Overview
        </Button>
        <Button variant="dark" block href="#">
          Statistics
        </Button>
      </div>
    );
  }
}

export default SideBar;
