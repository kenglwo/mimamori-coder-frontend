import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import Table from "react-bootstrap/Table";

// import { StudentInfo } from "../models/Types";
import { student_infos } from "./student_info_seed";

// interface Props {
// 	student_infos: StudentInfo[]
// }
interface Props extends RouteComponentProps<{ student_id: string }> {}
interface State {}

class StudentsTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // this.keyword = this.props.keyword;
    // this.texture = this.props.texture;

    // this.state = {
    //   isLoaded: false,
    //   items: []
    // };

    this.onTableRowCicked = this.onTableRowCicked.bind(this);
  }

  onTableRowCicked = (student_id: string, e: React.MouseEvent<HTMLElement>) => {
    this.props.history.push(`/student/${student_id}`);
  };

  public render() {
    const table_rows = student_infos.map((item, i) => (
      <tr key={i} onClick={this.onTableRowCicked.bind(this, item.student_id)}>
        <td>{i + 1}</td>
        <td>{item.student_id}</td>
        <td>{item.student_name}</td>
        <td>{item.working_file_name}</td>
        <td>{item.last_update_time}</td>
        <td>{item.grammatical_errors}</td>
      </tr>
    ));

    return (
      <Table striped bordered hover variant="dark" className="mt-3">
        <thead>
          <tr>
            <th>No.</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Working File Name</th>
            <th>Last Update Time</th>
            <th>Grammatical errors</th>
          </tr>
        </thead>
        <tbody>{table_rows}</tbody>
      </Table>
    );
  }
}

export default withRouter(StudentsTable);
