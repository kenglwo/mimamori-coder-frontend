import React from "react";
import Table from "react-bootstrap/Table";
import { CommitLogInfo } from "../models/Types";

interface Props {
  studentID: string;
  currentCommitIndex: number;
  commitTotalNum: number;
  setCurrentCommitIndex: (commitIndex: number) => void;
}
interface State {
  currentCommitIndex: number;
  commitLogs: CommitLogInfo[];
}

class CommitLog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentCommitIndex: this.props.currentCommitIndex,
      commitLogs: [],
    };

    this.loadCommitLog = this.loadCommitLog.bind(this);
  }

  public componentDidMount() {
    this.loadCommitLog();
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.currentCommitIndex !== prevProps.currentCommitIndex) {
      this.setState({ currentCommitIndex: this.props.currentCommitIndex });
    }
  }

  public loadCommitLog() {
    const url = `${process.env.REACT_APP_API_URL}/api/student_view/commit_log?student_id=${this.props.studentID}`;

    fetch(url, { mode: "cors" })
      .then((res) => res.json())
      .then(
        (jsonData) => {
          this.setState({ commitLogs: jsonData });
        },
        (error) => {
          console.log("Error: loadAllStudentTableItems");
        }
      );
  }

  public render() {
    const commitLogs = this.state.commitLogs.map((item, i) => {
      if (item.commitFile.length > 1) {
        return item.commitFile.map((file, j) => {
          if (j === 0) {
            return (
              <tr
                key={`${i}-${j}`}
                className={
                  Number(this.state.currentCommitIndex) ===
                  this.props.commitTotalNum - i
                    ? "bg-info text-dark"
                    : ""
                }
                onClick={this.props.setCurrentCommitIndex.bind(this, i)}
              >
                <td>{this.props.commitTotalNum - i}</td>
                <td>{item.commitTime}</td>
                <td>{file.fileName}</td>
                <td>{file.fileStatus}</td>
              </tr>
            );
          } else {
            return (
              <tr
                key={`${i}-${j}`}
                className={
                  Number(this.state.currentCommitIndex) ===
                  this.props.commitTotalNum - i
                    ? "bg-info text-dark"
                    : ""
                }
                onClick={this.props.setCurrentCommitIndex.bind(this, i)}
              >
                <td></td>
                <td></td>
                <td>{file.fileName}</td>
                <td>{file.fileStatus}</td>
              </tr>
            );
          }
        });
      } else {
        return (
          <tr
            key={i}
            className={
              Number(this.state.currentCommitIndex) ===
              this.props.commitTotalNum - i
                ? "bg-info text-dark"
                : ""
            }
            onClick={this.props.setCurrentCommitIndex.bind(this, i)}
          >
            <td>{this.props.commitTotalNum - i}</td>
            <td>{item.commitTime}</td>
            <td>
              {item.commitFile.length !== 0
                ? item.commitFile[0].fileName
                : "unknown"}
            </td>
            <td>
              {item.commitFile.length !== 0
                ? item.commitFile[0].fileStatus
                : "unknown"}
            </td>
          </tr>
        );
      }
    });

    return (
      <div>
        <div className="bg-secondary p-1 text-white font-weight-bold">
          Commit Log
        </div>
        <Table striped bordered hover variant="dark">
          <tbody>{commitLogs}</tbody>
        </Table>
      </div>
    );
  }
}

export default CommitLog;
