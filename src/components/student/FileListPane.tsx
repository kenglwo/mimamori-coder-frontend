import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";

import { file_list_seed } from "./file_list_seed";

interface Props {}
interface State {}

class FileListPane extends React.Component<Props, State> {
  // constructor(props: Props) {
  //   super(props);

  // this.state = {
  //   student_id: student_id,
  //   student_name: "",
  //     // };
  //   }

  public componentDidMount() {}

  file_list = file_list_seed.map((item, i) => (
    <ListGroup.Item key={i} variant="dark">
      {item.file_name}
    </ListGroup.Item>
  ));

  public render() {
    return (
      <div className="mb-5">
        <div className="bg-secondary p-1 text-white font-weight-bold">
          File List
        </div>
        <ListGroup>{this.file_list}</ListGroup>
      </div>
    );
  }
}

export default FileListPane;
