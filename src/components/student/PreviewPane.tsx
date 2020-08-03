import React from "react";
import "../../stylesheets/PreviewPane.scss";

interface Props {
  studentID: string;
  currentCommitIndex: number;
}
interface State {
  studentID: string;
  currentCommitIndex: number;
  codeStrings: {
    [key: string]: string;
  }[];
}

class PreviewPane extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      studentID: this.props.studentID,
      currentCommitIndex: this.props.currentCommitIndex,
      codeStrings: [],
    };

    this.loadCodeStrings = this.loadCodeStrings.bind(this);
  }

  public loadCodeStrings(currentCommitIndex: number) {
    const url = `${process.env.REACT_APP_API_URL}/api/student_view/code_string?student_id=${this.state.studentID}&current_commit_index=${currentCommitIndex}`;

    fetch(url, { mode: "cors" })
      .then((res) => res.json())
      .then(
        (jsonData) => {
          this.setState({
            codeStrings: jsonData,
          });
        },
        (error) => {
          console.log("Error: loadAllStudentTableItems");
        }
      );
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.currentCommitIndex !== prevProps.currentCommitIndex) {
      this.setState({ currentCommitIndex: this.props.currentCommitIndex });
      this.loadCodeStrings(this.props.currentCommitIndex);
    }

    if (this.props.studentID !== prevProps.studentID) {
      this.setState({ studentID: this.props.studentID });
      const url = `${process.env.REACT_APP_API_URL}/api/student_view/code_string?student_id=${this.props.studentID}&current_commit_index=${this.state.currentCommitIndex}`;
      console.log(url);

      fetch(url, { mode: "cors" })
        .then((res) => res.json())
        .then(
          (jsonData) => {
            console.log(jsonData);
            this.setState({
              codeStrings: jsonData,
            });
          },
          (error) => {
            console.log("Error: loadAllStudentTableItems");
          }
        );
    }
  }

  public render() {
    const iframes = this.state.codeStrings.map((item, i) => (
      <iframe
        key={i}
        title={"Code Preview"}
        className="bg-white w-100"
        srcDoc={item.codeString}
        frameBorder={"no"}
      ></iframe>
    ));

    return (
      <div id="preview_pane_wrapper">
        <div className="bg-success p-1 text-white font-weight-bold">
          Preview Pane
        </div>
        {iframes}
      </div>
    );
  }
}

export default PreviewPane;
