import path from "path";
import React from "react";
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

import "../../stylesheets/CodePane.scss";

interface Props {
  studentID: string;
  currentCommitIndex: number;
  commitTotalNum: number;
  showOlderCommit: () => void;
  showNewerCommit: () => void;
  showMiddleColumn: boolean;
}

type CodeInfo = {
  fileName: string;
  commitTime: string;
  codeString: string;
  codeDiff: string;
  codeStatus: string;
};
interface State {
  studentID: string;
  syntaxStyle: string;
  currentCommitIndex: number;
  files: CodeInfo[];
  showMiddleColumn: boolean;
}

class CodePane extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      syntaxStyle: darcula,
      studentID: this.props.studentID,
      files: [],
      currentCommitIndex: this.props.currentCommitIndex,
      showMiddleColumn: this.props.showMiddleColumn,
    };

    this.loadCodeInfo = this.loadCodeInfo.bind(this);
  }

  public loadCodeInfo(currentCommitIndex: number) {
    if (currentCommitIndex > 0) {
      const url = `${process.env.REACT_APP_API_URL}/api/student_view/code?student_id=${this.state.studentID}&current_commit_index=${currentCommitIndex}`;

      fetch(url, { mode: "cors" })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              files: result,
            });
          },
          (error) => {
            console.log("Error: loadAllStudentTableItems");
          }
        );
    }
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.currentCommitIndex !== prevProps.currentCommitIndex) {
      this.setState({ currentCommitIndex: this.props.currentCommitIndex });
      this.loadCodeInfo(this.props.currentCommitIndex);
    }

    if (this.props.studentID !== prevProps.studentID) {
      this.setState({ studentID: this.props.studentID });
      const url = `${process.env.REACT_APP_API_URL}/api/student_view/code?student_id=${this.props.studentID}&current_commit_index=${this.state.currentCommitIndex}`;

      fetch(url, { mode: "cors" })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              files: result,
            });
          },
          (error) => {
            console.log("Error: loadAllStudentTableItems");
          }
        );
    }
    if (this.props.showMiddleColumn !== prevProps.showMiddleColumn) {
      this.setState({ showMiddleColumn: this.props.showMiddleColumn });
    }
  }

  public render() {
    if (this.state.files.length === 0) {
      return <div></div>;
    } else {
      const codePanes = this.state.files.map((file, i) => {
        const extName = path.extname(this.state.files[i]["fileName"]).slice(1);

        // TODO: set var below properly
        const codeDiffWithBgColor = this.state.files[i]["codeDiff"];

        if (this.state.files[i]["codeStatus"] !== null) {
          return (
            <div key={i}>
              <div className="m-4">
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
              <div
                className="d-flex justify-content-start m-4"
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
                language={extName}
                showLineNumbers={false}
                style={this.state.syntaxStyle}
              >
                {codeDiffWithBgColor}
              </SyntaxHighlighter>
              <SyntaxHighlighter
                className="m-3"
                language={extName}
                showLineNumbers={true}
                style={this.state.syntaxStyle}
              >
                {this.state.files[i]["codeString"]}
              </SyntaxHighlighter>
            </div>
          );
        } else {
          return (
            <div key={i}>
              <div className="m-4">
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
                <div
                  className="d-flex justify-content-start mt-4"
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
              </div>
              <SyntaxHighlighter
                className="m-3"
                language="html"
                showLineNumbers={true}
                style={this.state.syntaxStyle}
              >
                {"file deleted"}
              </SyntaxHighlighter>
            </div>
          );
        }
      });

      return (
        <div
          id="code_pane_wrapper"
          className={this.state.showMiddleColumn ? "" : "d-none"}
        >
          <div className="bg-info p-1 text-white font-weight-bold">
            Code Pane
          </div>
          {codePanes}
          <div className="mt-5 mb-4">
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
