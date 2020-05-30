import React from "react";
// import Container from "react-bootstrap/Container";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

// import { fileList_seed } from "./fileList_seed";

interface Props {
  studentID: string;
}
interface State {
  studentID: string;
  fileNameList: string[];
}

class FileListPane extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      studentID: this.props.studentID,
      fileNameList: [],
    };

    this.loadFileList = this.loadFileList.bind(this);
  }

  public componentDidMount() {
    this.loadFileList();
  }

  public loadFileList() {
    const url = `${process.env.REACT_APP_API_URL}/api/student_view/file_list?student_id=${this.state.studentID}`;

    fetch(url, { mode: "cors" })
      .then((res) => res.json())
      .then(
        (jsonData) => {
          this.setState({ fileNameList: jsonData["fileNameList"] });
        },
        (error) => {
          console.log("API Error");
          // this.setState({
          //   // error,
          //   isLoaded: true
          /// });
        }
      );
  }

  public render() {
    const fileList = this.state.fileNameList.map((fileName, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{fileName}</td>
      </tr>
    ));

    return (
      <div className="mb-5">
        <div className="bg-secondary p-1 text-white font-weight-bold">
          File List
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>No. </th>
              <th>File Name</th>
            </tr>
          </thead>
          <tbody>{fileList}</tbody>
        </Table>
      </div>
    );
  }
}

export default FileListPane;
