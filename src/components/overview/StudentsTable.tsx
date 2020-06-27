import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import Table from "react-bootstrap/Table";

import { DisplayOption, StudentTableItem } from "../models/Types";

import "../../stylesheets/StudentsTable.scss";

interface Props extends RouteComponentProps<{ studentID: string }> {
  displayStyle: string;
  displayOrder: string;
}
interface State {
  studentsTableItems: StudentTableItem[];
  displayStyle: string;
  displayOrder: string;
}

class StudentsTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      studentsTableItems: [],
      displayStyle: this.props.displayStyle,
      displayOrder: this.props.displayOrder,
    };

    this.onTableRowCicked = this.onTableRowCicked.bind(this);
    this.loadAllStudentTableItems = this.loadAllStudentTableItems.bind(this);
  }

  onTableRowCicked = (studentID: string, e: React.MouseEvent<HTMLElement>) => {
    this.props.history.push(`/student/${studentID}`);
  };

  public loadAllStudentTableItems() {
    const url = `${process.env.REACT_APP_API_URL}/api/students_table_items`;
    fetch(url, { mode: "cors" })
      .then((res) => res.json())
      .then(
        (jsonData) => {
          this.setState({ studentsTableItems: jsonData });
        },
        (error) => {
          console.log("Error: loadAllStudentTableItems");
        }
      );
  }

  public componentDidMount() {
    if (this.state.studentsTableItems.length === 0) {
      this.loadAllStudentTableItems();
    }
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.displayOrder !== prevProps.displayOrder) {
      this.setState({ displayOrder: this.props.displayOrder });
    }
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

  public render() {
    let studentsTableItems = this.state.studentsTableItems.filter(
      (item) => item.workingFiles[0].fileName !== "unknown"
    );
    studentsTableItems =
      this.state.displayOrder === "studentID"
        ? studentsTableItems.sort(this.orderByStudentID)
        : studentsTableItems;
    studentsTableItems =
      this.state.displayOrder === "commits_asc"
        ? studentsTableItems.sort(this.orderByCommitNumAsc)
        : studentsTableItems;
    studentsTableItems =
      this.state.displayOrder === "commits_desc"
        ? studentsTableItems.sort(this.orderByCommitNumDesc)
        : studentsTableItems;
    studentsTableItems =
      this.state.displayOrder === "updated_time_asc"
        ? studentsTableItems.sort(this.orderByLastUpdatedTimeAsc)
        : studentsTableItems;
    studentsTableItems =
      this.state.displayOrder === "updated_time_desc"
        ? studentsTableItems.sort(this.orderByLastUpdatedTimeDesc)
        : studentsTableItems;

    const table_rows = studentsTableItems.map((item, i) => {
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
              onClick={this.onTableRowCicked.bind(this, item.studentID)}
              className={checkCodeStatus(file.codeStatus)}
            >
              <td>{i + 1}</td>
              <td>{item.studentID}</td>
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
              onClick={this.onTableRowCicked.bind(this, item.studentID)}
              className={checkCodeStatus(file.codeStatus)}
            >
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
