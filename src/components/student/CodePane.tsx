import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula,
  hopscotch,
  cb,
  tomorrow,
  twilight,
  ghcolors,
  vs,
  prism,
  solarizedlight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import "../../stylesheets/StudentView.scss";

interface Props {
  student_id: string;
  currentCommitIndex: number;
  commitTotalNum: number;
  showOlderCommit: () => void;
  showNewerCommit: () => void;
}
interface State {
  student_id: string;
  fileName: string;
  updatedTime: string;
  // currentCommitIndex: number;
  // commitTotalNum: number;
  codeString: string;
  codeStatus: string;
  syntaxStyle: string;
}

class CodePane extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      student_id: this.props.student_id,
      fileName: "",
      updatedTime: "",
      // currentCommitIndex: this.props.currentCommitIndex,
      // commitTotalNum: this.props.commitTotalNum,
      codeString: "",
      codeStatus: "",
      syntaxStyle: darcula,
    };
  }

  public componentDidMount() {
    // TODO: fetch sudent data with the student_id
    // 1. fetch codeString with student_id and currentCommitIndex
    const codeString: string = `
<html>
	<head>
	<meta charset="utf-8" />
	<title>タイトル</title>
	</head>
	<body>
		<h1>Hello World!</h1>
	</body>
</html>
    	`;

    // 2. fetch filename
    // 3. fetch updatedTime
    // 4. fetch codeStatus

    this.setState((state) => {
      return {
        codeString: codeString,
        fileName: "hello.index",
        updatedTime: "2020-05-02 14:50",
        codeStatus: "ok",
      };
    });
  }

  // static getDerivedStateFromProps(nextProps: Props, prevState: State) {
  //   return {
  //     currentCommitIndex: nextProps.currentCommitIndex,
  //   };
  // }

  public render() {
    return (
      <div>
        <div className="bg-info p-1 text-white font-weight-bold">Code Pane</div>
        <div
          className="d-flex justify-content-start pt-4 pl-2"
          id="filename_tag"
        >
          <span className="badge badge-secondary">{this.state.fileName}</span>
          {this.state.codeStatus == "ok" && (
            <span className="badge badge-primary ml-3">OK</span>
          )}
          {this.state.codeStatus == "error" && (
            <span className="badge badge-danger ml-3">Error</span>
          )}
          {this.state.codeStatus == "warning" && (
            <span className="badge badge-warning ml-3">Warning</span>
          )}
        </div>
        <SyntaxHighlighter
          className="m-3"
          language="html"
          style={this.state.syntaxStyle}
        >
          {this.state.codeString}
        </SyntaxHighlighter>

        <div className="mb-4">
          {this.props.currentCommitIndex > 1 && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={this.props.showOlderCommit}
            >
              {"<"}
            </button>
          )}
          <span className="badge badge-secondary ml-4 mr-4">
            {this.state.updatedTime}
          </span>
          {this.props.currentCommitIndex < this.props.commitTotalNum && (
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

export default CodePane;
