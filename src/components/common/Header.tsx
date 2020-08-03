import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import logo from "../../images/logo.svg";
import "../../stylesheets/header.scss";

interface Props extends RouteComponentProps {}
interface State {
  headerSelectorValue: string;
  headerInputValue: string;
  overviewUrl: string;
}

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      headerSelectorValue: "studentID",
      headerInputValue: "all",
      overviewUrl: "/overview/studentID/all",
    };
    this.onHeaderSelectorChanged = this.onHeaderSelectorChanged.bind(this);
    this.onHeaderInputChanged = this.onHeaderInputChanged.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
  }
  public onHeaderSelectorChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = e.target.value;
    this.setState({ headerSelectorValue: value });
  }
  public onHeaderInputChanged(e: React.ChangeEvent<HTMLInputElement>) {
    let value: string = e.target.value.replace(/s+/g, "");
    value = value === "" ? "all" : value;
    this.setState({ headerInputValue: value });
  }

  public onClickSearch() {
    // show  overview ? student view?
    this.props.history.push(
      `/overview/${this.state.headerSelectorValue}/${this.state.headerInputValue}`
    );
  }

  public render() {
    return (
      <Container fluid>
        <Navbar className="p-1" bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top ml-3"
              alt="React"
            />
          </Navbar.Brand>
          <Nav className="mr-0">
            <Nav.Link className="font-weight-bold" id="home" href="/">
              Home
            </Nav.Link>
            <Nav.Link
              className="font-weight-bold mr-5"
              id="overview"
              href={this.state.overviewUrl}
            >
              Overview
            </Nav.Link>
            <Form inline>
              <Form.Group className="mr-3" controlId="exampleForm.SelectCustom">
                <Form.Control
                  as="select"
                  custom
                  onChange={this.onHeaderSelectorChanged}
                >
                  <option value="studentID">Student ID</option>
                  <option value="fileName">File Name</option>
                </Form.Control>
              </Form.Group>
              <FormControl
                type="text"
                placeholder="Search Value"
                className="mr-sm-2"
                onChange={this.onHeaderInputChanged}
              />
              <Button variant="outline-info" onClick={this.onClickSearch}>
                Search
              </Button>
            </Form>
          </Nav>
        </Navbar>
      </Container>
    );
  }
}

export default withRouter(Header);
