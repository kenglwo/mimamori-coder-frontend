import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import Table from "react-bootstrap/Table";

import { DisplayOption, StudentTableItem } from "../models/Types";
import { student_infos } from "./student_info_seed";

import "../../stylesheets/StudentsTable.scss";

interface Props
  extends RouteComponentProps<{ studentID: string; studentName: string }> {
  displayOption: DisplayOption;
}
// interface State {
// 	studentTableItems: StudentTableItem;
// }
interface State {}

class StudentsTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onTableRowCicked = this.onTableRowCicked.bind(this);
    this.loadAllStudentTableItems = this.loadAllStudentTableItems.bind(this);
  }

  onTableRowCicked = (
    studentID: string,
    studentName: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    this.props.history.push(`/student/${studentID}/${studentName}`);
  };

  public loadAllStudentTableItems() {
    // const url = "localhost:3001/api/fetch-all-student-table-items";
    // fetch(url, { mode: "cors" })
    //   .then(res => res.json())
    //   .then(
    //     jsonData => {
    //       this.setState( { studentTableItems: jsonData };);
    //       console.log(this.state.studentTableItems);
    //     },
    //     error => {
    // 			console.log("Error: loadAllStudentTableItems");
    //       // this.setState({
    //       //   // error,
    //       //   isLoaded: true
    //       // });
    //     }
    //   );
  }

  public componentDidMount() {
    this.loadAllStudentTableItems();
  }

  public render() {
    const table_rows = student_infos.map((item, i) => {
      const checkCodeStatus = (codeStatus: string[]): string => {
        if (codeStatus.includes("error")) {
          return "code_error";
        } else if (codeStatus.includes("warning")) {
          return "code_warning";
        } else {
          return "code_ok";
        }
      };

      return item.workingFiles.map((file, fileIndex) => {
        if (fileIndex == 0) {
          return (
            <tr
              key={`${i}-${fileIndex}`}
              onClick={this.onTableRowCicked.bind(
                this,
                item.studentID,
                item.studentName
              )}
              className={checkCodeStatus(file.codeStatus)}
            >
              <td>{i + 1}</td>
              <td>{item.studentID}</td>
              <td>{item.studentName}</td>
              <td>{file.fileName}</td>
              <td>{file.lastUpdatedTime}</td>
              <td>{file.warningsCount}</td>
              <td>{file.errorsCount}</td>
            </tr>
          );
        } else {
          return (
            <tr
              key={`${i}-${fileIndex}`}
              onClick={this.onTableRowCicked.bind(
                this,
                item.studentID,
                item.studentName
              )}
              className={checkCodeStatus(file.codeStatus)}
            >
              <td></td>
              <td></td>
              <td></td>
              <td>{file.fileName}</td>
              <td>{file.lastUpdatedTime}</td>
              <td>{file.warningsCount}</td>
              <td>{file.errorsCount}</td>
            </tr>
          );
        }
      });
    });

    return (
      <Table striped bordered hover variant="dark" className="mt-3">
        <thead>
          <tr>
            <th>No.</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Working File Name</th>
            <th>Last Updated Time</th>
            <th>Warnings</th>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody>{table_rows}</tbody>
      </Table>
    );
  }
}

export default withRouter(StudentsTable);
