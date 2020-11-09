import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import "../../stylesheets/ToolBox.scss";

interface Props {
  showLeftColumn: boolean;
  showMiddleColumn: boolean;
  showRightColumn: boolean;
  onChangeShowLeft: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeShowMiddle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeShowRight: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickPreviousStudent: () => void;
  onClickNextStudent: () => void;
  isSupervisor: boolean;
  changeIfSupervisor: (ifIfSupervisor: boolean) => void;
}
interface State {
  supervisorPassword: string;
  isModalShow: boolean;
  authMessage: string;
  authFailed: boolean;
}

class ToolBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      supervisorPassword: "",
      isModalShow: false,
      authMessage: "Please input Supervisor Password.",
      authFailed: false,
    };

    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.onChangeSupervisorPassword = this.onChangeSupervisorPassword.bind(
      this
    );
    this.onSubmitSupervisorPassword = this.onSubmitSupervisorPassword.bind(
      this
    );
  }

  public handleModalShow() {
    if (this.props.isSupervisor) {
      this.setState({ isModalShow: false });
      this.props.changeIfSupervisor(false);
    } else {
      this.setState({ isModalShow: true });
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

    fetch(url, { method, mode, headers, body })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          this.props.changeIfSupervisor(true);
          this.setState({
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
      <div className="ml-2 text-white">
        <Form>
          <Form.Row className="d-flex align-items-center">
            <div className="mr-5">
              <button
                type="button"
                className="btn btn-outline-secondary mr-2"
                onClick={this.props.onClickPreviousStudent}
              >
                {"<"}
              </button>
              学生
              <button
                type="button"
                className="btn btn-outline-secondary ml-2"
                onClick={this.props.onClickNextStudent}
              >
                {">"}
              </button>
            </div>
            <span className="mr-3">Panes</span>
            <Form.Group className="mr-3 mt-3">
              <Form.Check
                type="checkbox"
                label="Left"
                checked={this.props.showLeftColumn}
                onChange={this.props.onChangeShowLeft}
              />
            </Form.Group>
            <Form.Group className="mr-3 mt-3">
              <Form.Check
                type="checkbox"
                label="Code"
                checked={this.props.showMiddleColumn}
                onChange={this.props.onChangeShowMiddle}
              />
            </Form.Group>
            <Form.Group className="mr-auto mt-3">
              <Form.Check
                type="checkbox"
                label="Preview"
                checked={this.props.showRightColumn}
                onChange={this.props.onChangeShowRight}
              />
            </Form.Group>
            {this.props.isSupervisor ? (
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
          </Form.Row>
        </Form>
        <Modal show={this.state.isModalShow} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Supervisor Authentication</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            {this.props.isSupervisor ? (
              <Button variant="primary" onClick={this.handleModalClose}>
                OK
              </Button>
            ) : (
              <div>
                <Button
                  className="mr-3"
                  variant="secondary"
                  onClick={this.handleModalClose}
                >
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
      </div>
    );
  }
}

export default ToolBox;
