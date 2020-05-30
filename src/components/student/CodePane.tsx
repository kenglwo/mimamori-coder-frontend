import React from "react";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula,
  // hopscotch,
  // cb,
  // tomorrow,
  // twilight,
  // ghcolors,
  // vs,
  // prism,
  // solarizedlight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import "../../stylesheets/StudentView.scss";

interface Props {
  studentID: string;
  currentCommitIndex: number;
  commitTotalNum: number;
  showOlderCommit: () => void;
  showNewerCommit: () => void;
}

type CodeInfo = {
  fileName: string;
  commitTime: string;
  codeString: string;
  codeStatus: string;
};
interface State {
  studentID: string;
  syntaxStyle: string;
  currentCommitIndex: number;
  files: CodeInfo[];
}

class CodePane extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      syntaxStyle: darcula,
      studentID: this.props.studentID,
      files: [],
      currentCommitIndex: this.props.currentCommitIndex,
    };

    this.loadCodeInfo = this.loadCodeInfo.bind(this);
  }

  public loadCodeInfo(currentCommitIndex: number) {
    if (currentCommitIndex > 0) {
      // const url = `http://localhost:3001/api/student_view/code?student_id=${this.state.studentID}&current_commit_index=${currentCommitIndex}`;
      const url = `${process.env.REACT_APP_API_URL}/api/student_view/code?student_id=${this.state.studentID}&current_commit_index=${currentCommitIndex}`;

      fetch(url, { mode: "cors" })
        .then((res) => res.json())
        .then(
          (jsonData) => {
            this.setState({
              files: jsonData,
            });
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
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.currentCommitIndex !== prevProps.currentCommitIndex) {
      this.setState({ currentCommitIndex: this.props.currentCommitIndex });
      this.loadCodeInfo(this.props.currentCommitIndex);
    }
  }

  public render() {
    if (this.state.files.length === 0) {
      return <div></div>;
    } else {
      const codePanes = this.state.files.map((file, i) => (
        <div key={i}>
          <div
            className="d-flex justify-content-start pt-4 pl-2"
            id="filename_tag"
          >
            <span className="badge badge-secondary">
              {this.state.files[i]["fileName"]}
            </span>
            {this.state.files[i]["codeStatus"] === "ok" && (
              <span className="badge badge-primary ml-3">OK</span>
            )}
            {this.state.files[i]["codeStatus"] === "error" && (
              <span className="badge badge-danger ml-3">Error</span>
            )}
            {this.state.files[i]["codeStatus"] === "warning" && (
              <span className="badge badge-warning ml-3">Warning</span>
            )}
          </div>
          <SyntaxHighlighter
            className="m-3"
            language="html"
            showLineNumbers={true}
            style={this.state.syntaxStyle}
          >
            {this.state.files[i]["codeString"]}
          </SyntaxHighlighter>
        </div>
      ));
      return (
        <div>
          <div className="bg-info p-1 text-white font-weight-bold">
            Code Pane
          </div>
          {codePanes}
          <div className="mb-4">
            {this.state.currentCommitIndex > 1 && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={this.props.showOlderCommit}
              >
                {"<"}
              </button>
            )}
            <span className="badge badge-secondary ml-4 mr-4">
              {this.state.files[0]["commitTime"]}
            </span>
            {this.state.currentCommitIndex < this.props.commitTotalNum && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={this.props.showNewerCommit}
              >
                {">"}
              </button>
            )}
          </div>
        </div>
      );
    }
  }
}

export default CodePane;
