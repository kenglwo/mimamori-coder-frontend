import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import "../../stylesheets/PreviewPane.scss";

interface Props {
  studentID: string;
  currentCommitIndex: number;
  showRightColumn: boolean;
  isSupervisor: boolean;
}
interface State {
  studentID: string;
  currentCommitIndex: number;
  filename: string;
  createdAt: string;
  fileArrays: {
    [key: string]: string;
  }[];
  showRightColumn: boolean;
  commentDisabled: boolean;
  isSupervisor: boolean;
  comment: string;
  saveCommentStatus: string;
  showAlert: boolean;
}

class PreviewPane extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      studentID: this.props.studentID,
      currentCommitIndex: this.props.currentCommitIndex,
      filename: "",
      createdAt: "",
      fileArrays: [],
      showRightColumn: this.props.showRightColumn,
      commentDisabled: true,
      isSupervisor: this.props.isSupervisor,
      comment: "",
      saveCommentStatus: "",
      showAlert: false,
    };

    this.loadCodeStrings = this.loadCodeStrings.bind(this);
    this.onClickEditButton = this.onClickEditButton.bind(this);
    this.onChangeCommnet = this.onChangeCommnet.bind(this);
    this.onSaveComment = this.onSaveComment.bind(this);
    this.fetchComment = this.fetchComment.bind(this);
    this.onCloseAlert = this.onCloseAlert.bind(this);
  }

  public loadCodeStrings(currentCommitIndex: number) {
    const url = `${process.env.REACT_APP_API_URL}/api/student_view/code_string?student_id=${this.state.studentID}&current_commit_index=${currentCommitIndex}`;
    console.log(url);

    fetch(url, { mode: "cors" })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            fileArrays: result,
          });
          // this.fetchComment()
        },
        (error) => {
          console.log("Error: loadAllStudentTableItems");
        }
      );
  }

  public fetchComment(studentID: string, currentCommitIndex: number) {
    // const student_id =
    const url = `${process.env.REACT_APP_API_URL}/api/comment_fetch?student_id=${studentID}&commit_index=${currentCommitIndex}`;

    fetch(url, { mode: "cors" })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            comment: result["comment"],
          });
        },
        (error) => {
          console.log("Error: fetch comment");
        }
      );
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.currentCommitIndex !== prevProps.currentCommitIndex) {
      this.setState({
        currentCommitIndex: this.props.currentCommitIndex,
        comment: "",
      });
      this.loadCodeStrings(this.props.currentCommitIndex);
      this.fetchComment(this.props.studentID, this.props.currentCommitIndex);
    }

    if (this.props.studentID !== prevProps.studentID) {
      this.setState({ studentID: this.props.studentID, comment: "" });
      const url = `${process.env.REACT_APP_API_URL}/api/student_view/code_string?student_id=${this.props.studentID}&current_commit_index=${this.state.currentCommitIndex}`;

      fetch(url, { mode: "cors" })
        .then((res) => res.json())
        .then(
          (jsonData) => {
            this.setState({
              fileArrays: jsonData,
            });
          },
          (error) => {
            console.log("Error: loadAllStudentTableItems");
          }
        );
      this.fetchComment(this.props.studentID, this.props.currentCommitIndex);
    }

    if (this.props.showRightColumn !== prevProps.showRightColumn) {
      this.setState({ showRightColumn: this.props.showRightColumn });
    }

    if (this.props.isSupervisor !== prevProps.isSupervisor) {
      this.setState({ isSupervisor: this.props.isSupervisor });
    }
  }

  public onClickEditButton() {
    this.setState((prevState: State, nextProps: Props) => {
      return {
        commentDisabled: !prevState.commentDisabled,
      };
    });
  }

  public onChangeCommnet(e: React.ChangeEvent<HTMLInputElement>) {
    const comment: string = e.target.value;
    this.setState({ comment: comment });
  }

  public onSaveComment() {
    const url = `${process.env.REACT_APP_API_URL}/api/comment_save`;

    const commentData = {
      student_id: this.state.studentID,
      commit_index: this.state.currentCommitIndex,
      comment: this.state.comment,
    };

    const method = "POST";
    const mode = "cors";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(commentData);

    fetch(url, { method, mode, headers, body })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          this.setState({ saveCommentStatus: "success", showAlert: true });
        } else {
          this.setState({ saveCommentStatus: "failed", showAlert: true });
        }
      })
      .catch(console.error);
  }

  public onCloseAlert() {
    this.setState({ showAlert: false });
  }
  public render() {
    const iframes = this.state.fileArrays.map((item, i) => (
      <iframe
        key={i}
        title={"Code Preview"}
        className="bg-white w-100"
        srcDoc={item.codeString}
        frameBorder={"no"}
      ></iframe>
    ));

    const editButton = this.state.commentDisabled ? (
      <EditIcon id="not_editing" onClick={this.onClickEditButton} />
    ) : (
      <EditIcon id="editing" onClick={this.onClickEditButton} />
    );

    return (
      <div
        id="preview_pane_wrapper"
        className={this.state.showRightColumn ? "" : "d-none"}
      >
        <div className="bg-success p-1 text-white font-weight-bold">
          Preview Pane
        </div>
        <div>
          <div className="p-4 mt-3 mb-3 d-flex justify-content-start">
            <span className="mr-5 text-white font-weight-bold">Comment</span>
            {this.state.isSupervisor && (
              <div>
                {editButton}
                <SaveIcon
                  id={"save"}
                  className="ml-3"
                  onClick={this.onSaveComment}
                />
              </div>
            )}
            {this.state.saveCommentStatus === "success" && (
              <Alert
                className="m-0 ml-4"
                variant="success"
                dismissible
                show={this.state.showAlert}
                onClose={this.onCloseAlert}
              >
                Success!
              </Alert>
            )}
          </div>
          <Form.Group>
            <Form.Control
              disabled={this.state.commentDisabled}
              as="textarea"
              rows={5}
              onChange={this.onChangeCommnet}
              value={this.state.comment}
            />
          </Form.Group>
        </div>
        )}
        {iframes}
      </div>
    );
  }
}

export default PreviewPane;
