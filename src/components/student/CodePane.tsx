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

interface Props {}
interface State {
  fileName: string;
  updatedTime: string;
  codeString: string;
  codeStatus: string;
  syntaxStyle: string;
}

class CodePange extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fileName: "hello.html",
      updatedTime: "2020-05-02 14:20",
      codeString: "",
      codeStatus: "ok",
      syntaxStyle: darcula,
    };
  }

  public componentDidMount() {
    // fetch sudent data with the student_id
    // ...
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

    this.setState((state) => {
      return {
        codeString: codeString,
      };
    });
  }

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
          <button type="button" className="btn btn-outline-secondary">
            {"<"}
          </button>
          <span className="badge badge-secondary ml-4 mr-4">
            {this.state.updatedTime}
          </span>
          <button type="button" className="btn btn-outline-secondary">
            {">"}
          </button>
        </div>
      </div>
    );
    // return (
    //   <div>
    //     <div className="bg-info p-1 text-white font-weight-bold">Code Pane</div>
    //     <pre className="prettyprint">{code}</pre>
    //   </div>
    // );
  }
}

export default CodePange;
