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

import { commit_log_seed } from "./commit_log_seed";

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

interface File {
  fileName: string;
  updatedTime: string;
  code: string;
  codeStatus: "ok" | "error" | "warning";
  errorMessages: DebugMessage[];
  warningMessages: DebugMessage[];
  commitIndex: number;
  commitId: string;
}

interface CommitInfo {}

interface Props
  extends RouteComponentProps<{ student_id: string; student_name: string }> {}
interface State {
  student_id: string;
  student_name: string;
  currentCommitIndex: number;
  commitTotalNum: number;
  filename: string;
  updated_time: string;
}

class StudentView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      student_id: this.props.match.params.student_id,
      student_name: this.props.match.params.student_name,
      currentCommitIndex: 0,
      commitTotalNum: 0,
      filename: "",
      updated_time: "",
    };

    this.showOlderCommit = this.showOlderCommit.bind(this);
    this.showNewerCommit = this.showNewerCommit.bind(this);
  }

  public showOlderCommit() {
    // 1. set currentCommitIndex
    // 2. fetch file name with the new currentCommitIndex
    // 3. fetch updated time with the new currentCommitIndex

    this.setState((state) => {
      return {
        currentCommitIndex: state.currentCommitIndex - 1,
      };
    });
  }

  public showNewerCommit() {
    console.log("show next commit");

    this.setState((state) => {
      return {
        currentCommitIndex: state.currentCommitIndex + 1,
      };
    });
  }

  public componentDidMount() {
    // TODO: fetch sudent data with the student_id using API

    // 1. commitTotalNum
    const commitTotalNum: number = commit_log_seed.length;

    // 2. fetch filename of the latest commit
    const filename = "";

    // 3. fetch updated_time of the filename
    const updated_time = "";

    this.setState((state) => {
      return {
        currentCommitIndex: commitTotalNum,
        commitTotalNum: commitTotalNum,
        filename: filename,
        updated_time: updated_time,
      };
    });
  }

  public render() {
    return (
      <Container fluid>
        <Row>
          <Col md={3} className="p-0">
            <StudentInfo
              student_id={this.state.student_id}
              student_name={this.state.student_name}
            />
            <FileListPane student_id={this.state.student_id} />
            <CommitLog
              student_id={this.state.student_id}
              currentCommitIndex={this.state.currentCommitIndex}
              commitTotalNum={this.state.commitTotalNum}
            />
          </Col>
          <Col md={9} className="pl-0 pr-4">
            <Container fluid>
              <Row>
                <Col md={6} className="p-0">
                  <CodePane
                    student_id={this.state.student_id}
                    currentCommitIndex={this.state.currentCommitIndex}
                    commitTotalNum={this.state.commitTotalNum}
                    showOlderCommit={this.showOlderCommit}
                    showNewerCommit={this.showNewerCommit}
                  />
                  <ConsolePane />
                </Col>
                <Col md={6} className="p-0">
                  <PreviewPane />
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
