import React from "react";
import Table from "react-bootstrap/Table";

interface Props {
  studentID: string;
}
interface State {}

class StudentInfo extends React.Component<Props, State> {
  public render() {
    return (
      <div>
        <div className="bg-secondary p-1 text-white font-weight-bold">
          Student Info Pane
        </div>
        <Table bordered hover variant="dark">
          <tbody>
            <tr>
              <td>Student ID</td>
              <td>{this.props.studentID}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default StudentInfo;
