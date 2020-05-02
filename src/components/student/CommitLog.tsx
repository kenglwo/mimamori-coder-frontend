import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import { commit_log_seed } from "./commit_log_seed";

interface Props {}
interface State {}

class CommitLog extends React.Component<Props, State> {
  // constructor(props: Props) {
  //   super(props);

  // this.state = {
  //   student_id: student_id,
  //   student_name: "",
  //     // };
  //   }

  public componentDidMount() {
    // fetch sudent data with the student_id
    // ...
    // const student_name = "John";
    //
    // this.setState((state) => {
    //   return {
    //     student_name: student_name,
    //   };
    // });
  }

  public render() {
    const commit_logs = commit_log_seed.map((item, i) => (
      <tr key={i}>
        <td>{item.file_name}</td>
        <td>{item.updated_time}</td>
      </tr>
    ));

    return (
      <div>
        <div className="bg-secondary p-1 text-white font-weight-bold">
          Commit Log
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Updated Time</th>
            </tr>
          </thead>
          <tbody>{commit_logs}</tbody>
        </Table>
      </div>
    );
  }
}

export default CommitLog;
