import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import logo from "../../images/logo.svg";
import "../../stylesheets/header.scss";

interface Props extends RouteComponentProps {}
interface State {
  headerSelectorValue: string;
  headerInputValue: string;
  overviewUrl: string;
  isSupervisor: boolean;
  supervisorPassword: string;
  isModalShow: boolean;
  authMessage: string;
  authFailed: boolean;
}

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      headerSelectorValue: "studentID",
      headerInputValue: "all",
      overviewUrl: "/overview/studentID/all",
      isSupervisor: false,
      supervisorPassword: "",
      isModalShow: false,
      authMessage: "Please input Supervisor Password.",
      authFailed: false,
    };
    this.onHeaderSelectorChanged = this.onHeaderSelectorChanged.bind(this);
    this.onHeaderInputChanged = this.onHeaderInputChanged.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.onChangeSupervisorPassword = this.onChangeSupervisorPassword.bind(
      this
    );
    this.onSubmitSupervisorPassword = this.onSubmitSupervisorPassword.bind(
      this
    );
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

  public handleModalShow() {
    const currentIsSupervisor: boolean = this.state.isSupervisor;
    if (currentIsSupervisor) {
      this.setState({ isModalShow: false, isSupervisor: false });
    } else {
      this.setState({ isModalShow: true, isSupervisor: false });
    }
  }

  public handleModalClose() {
    this.setState({
      isModalShow: false,
      authMessage: "Please input Supervisor Password.",
      authFailed: false,
    });
  }

  public onChangeSupervisorPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const password: string = e.target.value;
    this.setState({ supervisorPassword: password });
  }

  public onSubmitSupervisorPassword() {
    console.log(this.state.supervisorPassword);
    //TODO: check password via API
    const url = `${process.env.REACT_APP_API_URL}/api/auth_supervisor`;

    const authInfo = {
      supervisor_password: this.state.supervisorPassword,
    };

    const method = "POST";
    const mode = "cors";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(authInfo);
    console.log(body);

    fetch(url, { method, mode, headers, body })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          this.setState({
            isSupervisor: true,
            authMessage: "Authentication Success!",
          });
        } else {
          this.setState({
            authMessage: "Please input correct password",
            authFailed: true,
          });
        }
      })
      .catch(console.error);
  }

  public render() {
    return (
      <Container fluid>
        <Navbar
          className="p-1"
          bg="dark"
          variant="dark"
          expand="lg"
          sticky="top"
        >
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top ml-3"
              alt="React"
            />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link className="font-weight-bold" id="home" href="/">
              Home
            </Nav.Link>
            <Nav.Link
              className="font-weight-bold"
              id="overview"
              href={this.state.overviewUrl}
            >
              Overview
            </Nav.Link>
            <Nav.Link className="font-weight-bold mr-5" id="overview" href="#">
              Statistics
            </Nav.Link>
          </Nav>
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
          {this.state.isSupervisor ? (
            <SupervisorAccountIcon
              id="isSupervisor"
              className="ml-4"
              fontSize="large"
              color="action"
              onClick={this.handleModalShow}
            />
          ) : (
            <SupervisorAccountIcon
              id="isNotSupervisor"
              className="ml-4"
              fontSize="large"
              color="action"
              onClick={this.handleModalShow}
            />
          )}
        </Navbar>
        <Modal show={this.state.isModalShow} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Supervisor Authentication</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.isSupervisor ? (
              <p className="mb-2 text-primary font-weight-bold">
                {this.state.authMessage}
              </p>
            ) : (
              <div>
                {this.state.authFailed ? (
                  <p className="mb-2 text-danger font-weight-bold">
                    {this.state.authMessage}
                  </p>
                ) : (
                  <p className="mb-2 font-weight-bold">
                    {this.state.authMessage}
                  </p>
                )}
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Password</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="password"
                    id="supervisorPassword"
                    onChange={this.onChangeSupervisorPassword}
                  />
                </InputGroup>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {this.state.isSupervisor ? (
              <Button variant="primary" onClick={this.handleModalClose}>
                OK
              </Button>
            ) : (
              <div>
                <Button variant="secondary" onClick={this.handleModalClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={this.onSubmitSupervisorPassword}
                >
                  Submit
                </Button>
              </div>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default withRouter(Header);
