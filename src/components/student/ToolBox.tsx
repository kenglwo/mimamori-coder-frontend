import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

interface Props {
  showLeftColumn: boolean;
  showMiddleColumn: boolean;
  showRightColumn: boolean;
  onChangeShowLeft: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeShowMiddle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeShowRight: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
            <span className="mr-3">Panes</span>
            <Form.Group className="mr-3 mt-3">
              <Form.Check
                type="checkbox"
                label="Left"
                checked={this.props.showLeftColumn}
                onChange={this.props.onChangeShowLeft}
              />
            </Form.Group>
            <Form.Group className="mr-3 mt-3">
              <Form.Check
                type="checkbox"
                label="Code"
                checked={this.props.showMiddleColumn}
                onChange={this.props.onChangeShowMiddle}
              />
            </Form.Group>
            <Form.Group className="mr-3 mt-3">
              <Form.Check
                type="checkbox"
                label="Preview"
                checked={this.props.showRightColumn}
                onChange={this.props.onChangeShowRight}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default ToolBox;
