import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import logo from "../../images/logo.svg";
import "../../stylesheets/header.scss";

interface Props {}
interface State {}

class Header extends React.Component<Props, State> {
  public render() {
    return (
      <Container fluid>
        <Navbar className="p-3" bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React"
            />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link id="home" href="#home">
              Home
            </Nav.Link>
            <Form inline>
              <Form.Group className="mr-3" controlId="exampleForm.SelectCustom">
                <Form.Control as="select" custom>
                  <option>Student ID</option>
                  <option>Student Name</option>
                  <option>File Name</option>
                </Form.Control>
              </Form.Group>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Nav>
        </Navbar>
      </Container>
    );
  }
}

export default Header;
