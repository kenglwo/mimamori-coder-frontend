import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

interface Props {}
interface State {}

class ConsolePane extends React.Component<Props, State> {
  // constructor(props: Props) {
  //   super(props);

  // this.state = {
  //   student_id: student_id,
  //   student_name: "",
  //     // };
  //   }

  public componentDidMount() {}

  public render() {
    return (
      <div>
        <div className="bg-info p-1 text-white font-weight-bold">Console</div>
      </div>
    );
  }
}

export default ConsolePane;
