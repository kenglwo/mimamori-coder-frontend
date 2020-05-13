import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import Table from "react-bootstrap/Table";

import { DisplayOption, StudentTableItem } from "../models/Types";

import "../../stylesheets/StudentsTable.scss";

interface Props
  extends RouteComponentProps<{ studentID: string; studentName: string }> {
  displayOption: DisplayOption;
}
interface State {
  studentsTableItems: StudentTableItem[];
}

class StudentsTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      studentsTableItems: [],
    };

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
    const url = "http://localhost:3001/api/students_table_items";
    fetch(url, { mode: "cors" })
      .then((res) => res.json())
      .then(
        (jsonData) => {
          this.setState({ studentsTableItems: jsonData });
          console.log(this.state.studentsTableItems);
        },
        (error) => {
          console.log("Error: loadAllStudentTableItems");
          // this.setState({
          //   // error,
          //   isLoaded: true
          /// });
        }
      );
  }

  public componentDidMount() {
    this.loadAllStudentTableItems();
  }

  public render() {
    const table_rows = this.state.studentsTableItems.map((item, i) => {
      const checkCodeStatus = (codeStatus: string): string => {
        if (codeStatus === "error") {
          return "code_error";
        } else if (codeStatus === "warning") {
          return "code_warning";
        } else if (codeStatus === "ok") {
          return "code_ok";
        } else {
          return "unknown";
        }
      };

      return item.workingFiles.map((file, fileIndex) => {
        if (fileIndex === 0) {
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
              <td>{file.commitIndex}</td>
              <td>{file.updatedTime}</td>
              <td>{file.fileName}</td>
              <td>{file.warningNum}</td>
              <td>{file.errorNum}</td>
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
              <td></td>
              <td></td>
              <td>{file.fileName}</td>
              <td>{file.warningNum}</td>
              <td>{file.errorNum}</td>
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
            <th>Commits</th>
            <th>Last Updated Time</th>
            <th>Working File Name</th>
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
