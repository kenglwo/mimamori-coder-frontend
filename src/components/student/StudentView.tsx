import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToolBox from "./ToolBox";
import StudentInfo from "./StudentInfo";
import FileListPane from "./FileListPane";
import CommitLog from "./CommitLog";
import CodePane from "./CodePane";
import ConsolePane from "./ConsolePane";
import PreviewPane from "./PreviewPane";

import { StudentViewItem, StudentTableItem } from "../models/Types";

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

interface Props
  extends RouteComponentProps<{
    studentID: string;
    currentStudentIDIndex: string;
    displayOrder: string;
  }> {}
interface State extends StudentViewItem {
  studentTableItems: StudentTableItem[];
}

class StudentView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      studentID: this.props.match.params.studentID,
      currentStudentIDIndex: Number(
        this.props.match.params.currentStudentIDIndex
      ),
      studentTableItems: [],
      displayOrder: this.props.match.params.displayOrder,
      commitTotalNum: 0,
      currentCommitIndex: 0,
      showLeftColumn: true,
      showMiddleColumn: true,
      showRightColumn: true,
    };

    this.showOlderCommit = this.showOlderCommit.bind(this);
    this.showNewerCommit = this.showNewerCommit.bind(this);
    this.setCurrentCommitIndex = this.setCurrentCommitIndex.bind(this);
    this.loadStudentItem = this.loadStudentItem.bind(this);
    this.onChangeShowLeft = this.onChangeShowLeft.bind(this);
    this.onChangeShowMiddle = this.onChangeShowMiddle.bind(this);
    this.onChangeShowRight = this.onChangeShowRight.bind(this);
    this.onClickPreviousStudent = this.onClickPreviousStudent.bind(this);
    this.onClickNextStudent = this.onClickNextStudent.bind(this);
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

    const url2 = `${process.env.REACT_APP_API_URL}/api/students_table_items`;
    fetch(url2, { mode: "cors" })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            studentTableItems: result,
          });
        },
        (error) => {
          console.log("API Error");
        }
      );
  }

  public componentDidMount() {
    this.loadStudentItem();
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.studentID !== prevState.studentID) {
      const url = `${process.env.REACT_APP_API_URL}/api/student_view?student_id=${this.state.studentID}`;

      fetch(url, { mode: "cors" })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              commitTotalNum: result["commitTotalNum"],
              currentCommitIndex: result["commitTotalNum"],
            });
          },
          (error) => {
            console.log("Error: loadAllStudentTableItems");
          }
        );
    }
  }

  public onChangeShowLeft(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked;
    this.setState({ showLeftColumn: value });
  }
  public onChangeShowMiddle(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked;
    this.setState({ showMiddleColumn: value });
  }
  public onChangeShowRight(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked;
    this.setState({ showRightColumn: value });
  }

  public orderByStudentID(a: StudentTableItem, b: StudentTableItem) {
    const studentIDA = a.studentID.toUpperCase();
    const studentIDB = b.studentID.toUpperCase();

    let comparison = 0;
    if (studentIDA > studentIDB) {
      comparison = 1;
    } else if (studentIDA < studentIDB) {
      comparison = -1;
    }
    return comparison;
  }
  public orderByCommitNumAsc(a: StudentTableItem, b: StudentTableItem) {
    const studentA = Number(a.workingFiles[0].commitIndex);
    const studentB = Number(b.workingFiles[0].commitIndex);

    let comparison = 0;
    if (studentA > studentB) {
      comparison = 1;
    } else if (studentA < studentB) {
      comparison = -1;
    }
    return comparison;
  }
  public orderByCommitNumDesc(a: StudentTableItem, b: StudentTableItem) {
    const studentA = Number(a.workingFiles[0].commitIndex);
    const studentB = Number(b.workingFiles[0].commitIndex);

    let comparison = 0;
    if (studentA < studentB) {
      comparison = 1;
    } else if (studentA > studentB) {
      comparison = -1;
    }
    return comparison;
  }
  public orderByLastUpdatedTimeAsc(a: StudentTableItem, b: StudentTableItem) {
    const studentA = a.workingFiles[0].updatedTime;
    const studentB = b.workingFiles[0].updatedTime;

    let comparison = 0;
    if (studentA > studentB) {
      comparison = 1;
    } else if (studentA < studentB) {
      comparison = -1;
    }
    return comparison;
  }
  public orderByLastUpdatedTimeDesc(a: StudentTableItem, b: StudentTableItem) {
    const studentA = a.workingFiles[0].updatedTime;
    const studentB = b.workingFiles[0].updatedTime;

    let comparison = 0;
    if (studentA < studentB) {
      comparison = 1;
    } else if (studentA > studentB) {
      comparison = -1;
    }
    return comparison;
  }

  public onClickPreviousStudent() {
    this.setState((prevState: State) => {
      const prevIndex: number = Number(prevState.currentStudentIDIndex);
      const newIndex: number = prevIndex === 0 ? prevIndex : prevIndex - 1;
      const newStudentID: string = this.state.studentTableItems[newIndex][
        "studentID"
      ];

      return {
        currentStudentIDIndex: newIndex,
        studentID: newStudentID,
      };
    });
  }
  public onClickNextStudent() {
    this.setState((prevState: State) => {
      const prevIndex: number = Number(prevState.currentStudentIDIndex);
      const newIndex: number =
        prevIndex === this.state.studentTableItems.length - 1
          ? prevIndex
          : prevIndex + 1;
      const newStudentID: string = this.state.studentTableItems[newIndex][
        "studentID"
      ];

      return {
        currentStudentIDIndex: newIndex,
        studentID: newStudentID,
      };
    });
  }

  public render() {
    let studentTableItems = this.state.studentTableItems.filter(
      (item) => item.workingFiles[0].fileName !== "unknown"
    );

    studentTableItems =
      this.state.displayOrder === "studentID"
        ? studentTableItems.sort(this.orderByStudentID)
        : studentTableItems;
    studentTableItems =
      this.state.displayOrder === "commits_asc"
        ? studentTableItems.sort(this.orderByCommitNumAsc)
        : studentTableItems;
    studentTableItems =
      this.state.displayOrder === "commits_desc"
        ? studentTableItems.sort(this.orderByCommitNumDesc)
        : studentTableItems;
    studentTableItems =
      this.state.displayOrder === "updated_time_asc"
        ? studentTableItems.sort(this.orderByLastUpdatedTimeAsc)
        : studentTableItems;
    studentTableItems =
      this.state.displayOrder === "updated_time_desc"
        ? studentTableItems.sort(this.orderByLastUpdatedTimeDesc)
        : studentTableItems;

    console.log("#################");
    console.log(`showLeft: ${this.state.showLeftColumn}`);
    console.log(`showMiddle: ${this.state.showMiddleColumn}`);
    console.log(`showRight: ${this.state.showRightColumn}`);

    return (
      <Container fluid>
        <Row>
          <Col md={6}>
            <ToolBox
              showLeftColumn={this.state.showLeftColumn}
              showMiddleColumn={this.state.showMiddleColumn}
              showRightColumn={this.state.showRightColumn}
              onChangeShowLeft={this.onChangeShowLeft}
              onChangeShowMiddle={this.onChangeShowMiddle}
              onChangeShowRight={this.onChangeShowRight}
              onClickPreviousStudent={this.onClickPreviousStudent}
              onClickNextStudent={this.onClickNextStudent}
            />
          </Col>
        </Row>
        <Row>
          {this.state.showLeftColumn && (
            <Col md={this.state.showLeftColumn ? 3 : 0} className="pr-0">
              <StudentInfo studentID={this.state.studentID} />
              <FileListPane studentID={this.state.studentID} />
              <CommitLog
                studentID={this.state.studentID}
                currentCommitIndex={this.state.currentCommitIndex}
                commitTotalNum={this.state.commitTotalNum}
                setCurrentCommitIndex={this.setCurrentCommitIndex}
              />
            </Col>
          )}
          <Col md={this.state.showLeftColumn ? 9 : 12} className="pl-0 pr-1">
            <Container fluid>
              <Row>
                <Col md={this.state.showRightColumn ? 6 : 12} className="p-0">
                  <CodePane
                    studentID={this.state.studentID}
                    currentCommitIndex={this.state.currentCommitIndex}
                    commitTotalNum={this.state.commitTotalNum}
                    showOlderCommit={this.showOlderCommit}
                    showNewerCommit={this.showNewerCommit}
                    showMiddleColumn={this.state.showMiddleColumn}
                  />
                </Col>
                <Col md={this.state.showMiddleColumn ? 6 : 12} className="p-0">
                  <PreviewPane
                    studentID={this.state.studentID}
                    currentCommitIndex={this.state.currentCommitIndex}
										showRightColumn={this.state.showRightColumn}
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
