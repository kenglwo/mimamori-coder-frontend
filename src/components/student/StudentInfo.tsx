import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

interface Props {}
interface State {}

class StudentInfo extends React.Component<Props, State> {
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
    return (
      <div>
        <div className="bg-secondary p-1 text-white font-weight-bold">
          Student Info Pane
        </div>
        <Table bordered hover variant="dark">
          <tbody>
            <tr>
              <td>Student ID</td>
              <td>185c124c</td>
            </tr>
            <tr>
              <td>Student Name</td>
              <td>John Rock</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default StudentInfo;
