import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import { commit_log_seed } from "./commit_log_seed";

interface CommitLog {
  filename: string;
  committed_time: string;
}

interface Props {
  student_id: string;
  currentCommitIndex: number;
  commitTotalNum: number;
}
interface State {
  student_id: string;
  commit_logs: CommitLog[];
}

class CommitLog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      student_id: this.props.student_id,
      commit_logs: [],
    };
  }

  public componentDidMount() {
    // TODO: fetch commit log (filename, commit time) with student_id via API
    // this.setState((state) => {
    //   return {
    //     commit_logs: ?,
    //   };
    // });
  }

  public render() {
    // commit_logs should be order by desc
    const commit_logs = commit_log_seed.map((item, i) =>
      this.props.commitTotalNum - i == this.props.currentCommitIndex ? (
        <tr key={i} className="bg-info text-dark">
          <td>{this.props.commitTotalNum - i}</td>
          <td>{item.file_name}</td>
          <td>{item.updated_time}</td>
        </tr>
      ) : (
        <tr key={i}>
          <td>{this.props.commitTotalNum - i}</td>
          <td>{item.file_name}</td>
          <td>{item.updated_time}</td>
        </tr>
      )
    );

    return (
      <div>
        <div className="bg-secondary p-1 text-white font-weight-bold">
          Commit Log
        </div>
        <Table striped bordered hover variant="dark">
          <tbody>{commit_logs}</tbody>
        </Table>
      </div>
    );
  }
}

export default CommitLog;
