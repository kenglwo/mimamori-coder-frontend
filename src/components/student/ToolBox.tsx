import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

interface Props {
  showLeftColumn: boolean;
  onChangeShowLeft: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickPreviousStudent: () => void;
  onClickNextStudent: () => void;
}
interface State {}

class ToolBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div className="ml-2 text-white">
        <Form>
          <Form.Row className="d-flex align-items-center">
            <div className="mr-5">
              <button
                type="button"
                className="btn btn-outline-secondary mr-2"
                onClick={this.props.onClickPreviousStudent}
              >
                {"<"}
              </button>
              学生
              <button
                type="button"
                className="btn btn-outline-secondary ml-2"
                onClick={this.props.onClickNextStudent}
              >
                {">"}
              </button>
            </div>
            <Form.Group className="mr-3 mt-3">
              <Form.Check
                type="checkbox"
                label="Left Panels"
                checked={this.props.showLeftColumn}
                onChange={this.props.onChangeShowLeft}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default ToolBox;
