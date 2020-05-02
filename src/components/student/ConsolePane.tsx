import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

interface Props {}
interface State {
  is_ok: boolean;
  error_messages: string[];
  warning_messages: string[];
}

class ConsolePane extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      is_ok: false,
      error_messages: ["error message", "error message", "error message"],
      warning_messages: ["warning message"],
    };
  }

  public componentDidMount() {}

  public render() {
    const errorMessages = this.state.error_messages.map((item, i) => (
      <div key={i} className="alert alert-danger" role="alert">
        {i + 1}.&nbsp; {item}
      </div>
    ));

    const warningMessages = this.state.warning_messages.map((item, i) => (
      <div key={i} className="alert alert-warning" role="alert">
        {i + 1}.&nbsp; {item}
      </div>
    ));

    return (
      <div>
        <div className="bg-info p-1 text-white font-weight-bold">Console</div>
        <div className="p-3" id="console">
          {this.state.is_ok && (
            <div className="alert alert-primary" role="alert">
              OK
            </div>
          )}
          {errorMessages}
          {warningMessages}
        </div>
      </div>
    );
  }
}

export default ConsolePane;
