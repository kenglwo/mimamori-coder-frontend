import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import StudentInfo from "./StudentInfo";
import FileListPane from "./FileListPane";
import CommitLog from "./CommitLog";
import CodePane from "./CodePane";
import ConsolePane from "./ConsolePane";
import PreviewPane from "./PreviewPane";

interface Props extends RouteComponentProps<{ student_id: string }> {}
interface State {
  student_id: string;
  student_name: string;
}

class StudentView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    console.log(this.props.match.params.student_id);
    const student_id = this.props.match.params.student_id;

    this.state = {
      student_id: student_id,
      student_name: "",
    };
  }

  public componentDidMount() {
    // fetch sudent data with the student_id
    // ...
    const student_name = "John";

    this.setState((state) => {
      return {
        student_name: student_name,
      };
    });
  }

  public render() {
    return (
      <Container fluid>
        <Row>
          <Col md={3} className="p-0">
            <StudentInfo />
            <FileListPane />
            <CommitLog />
          </Col>
          <Col md={9} className="pl-0 pr-4">
            <Container fluid>
              <Row>
                <Col md={6} className="p-0">
                  <CodePane />
                  <ConsolePane />
                </Col>
                <Col md={6} className="p-0">
                  <PreviewPane />
                </Col>
              </Row>
              <Container></Container>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default StudentView;
