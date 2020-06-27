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

import { StudentViewItem } from "../models/Types";

interface DebugMessage {
  fileName: string;
  messages: string[];
}

interface Commit {
  fileName: string;
  updatedTime: string;
  commitId: string;
  commitIndex: number;
}

interface CommitInfo {}

interface Props extends RouteComponentProps<{ studentID: string }> {}
interface State extends StudentViewItem {}

class StudentView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      studentID: this.props.match.params.studentID,
      commitTotalNum: 0,
      currentCommitIndex: 0,
    };

    this.showOlderCommit = this.showOlderCommit.bind(this);
    this.showNewerCommit = this.showNewerCommit.bind(this);
    this.setCurrentCommitIndex = this.setCurrentCommitIndex.bind(this);
    this.loadStudentItem = this.loadStudentItem.bind(this);
  }

  public showOlderCommit() {
    this.setState((state) => {
      return {
        currentCommitIndex: state.currentCommitIndex - 1,
      };
    });
  }

  public showNewerCommit() {
    this.setState((state) => {
      return {
        currentCommitIndex: state.currentCommitIndex + 1,
      };
    });
  }

  public setCurrentCommitIndex(commitIndex: number) {
    const newCurrentCommitIndex = this.state.commitTotalNum - commitIndex;
    this.setState({ currentCommitIndex: newCurrentCommitIndex });
  }

  public loadStudentItem() {
    const url = `${process.env.REACT_APP_API_URL}/api/student_view?student_id=${this.state.studentID}`;

    fetch(url, { mode: "cors" })
      .then((res) => res.json())
      .then(
        (jsonData) => {
          this.setState({
            commitTotalNum: jsonData["commitTotalNum"],
            currentCommitIndex: jsonData["commitTotalNum"],
          });
        },
        (error) => {
          console.log("Error: loadAllStudentTableItems");
        }
      );
  }

  public componentDidMount() {
    this.loadStudentItem();
  }

  public render() {
    return (
      <Container fluid>
        <Row>
          <Col md={3} className="pr-0">
            <StudentInfo studentID={this.state.studentID} />
            <FileListPane studentID={this.state.studentID} />
            <CommitLog
              studentID={this.state.studentID}
              currentCommitIndex={this.state.currentCommitIndex}
              commitTotalNum={this.state.commitTotalNum}
              setCurrentCommitIndex={this.setCurrentCommitIndex}
            />
          </Col>
          <Col md={9} className="pl-0 pr-1">
            <Container fluid>
              <Row>
                <Col md={6} className="p-0">
                  <CodePane
                    studentID={this.state.studentID}
                    currentCommitIndex={this.state.currentCommitIndex}
                    commitTotalNum={this.state.commitTotalNum}
                    showOlderCommit={this.showOlderCommit}
                    showNewerCommit={this.showNewerCommit}
                  />
                  <ConsolePane />
                </Col>
                <Col md={6} className="p-0">
                  <PreviewPane
                    studentID={this.state.studentID}
                    currentCommitIndex={this.state.currentCommitIndex}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default StudentView;
