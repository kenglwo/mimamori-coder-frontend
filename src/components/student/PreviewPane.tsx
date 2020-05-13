import React from "react";
// import { RouteComponentProps } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";

interface Props {}
interface State {}

class PreviewPane extends React.Component<Props, State> {
  // constructor(props: Props) {
  //   super(props);

  // this.state = {
  //   student_id: student_id,
  //   student_name: "",
  //     // };
  //   }

  public componentDidMount() {
    // fetch sudent data with the student_id
    // ...
    // const student_name = "John";
    //
    // this.setState((state) => {
    //   return {
    //     student_name: student_name,
    //   };
    // });
  }

  public render() {
    const code: string = `
			<html>
				<head>
				<meta charset="utf-8" />
				<title>タイトル</title>
				</head>
				<body>
					<h1>Hello World!</h1>
					<h2>Hello World!</h2>
					<h3>Hello World!</h3>
					<h4>Hello World!</h4>
					<h5>Hello World!</h5>
				</body>
			</html>
			`;

    return (
      <div>
        <div className="bg-success p-1 text-white font-weight-bold">
          Preview Pane
        </div>
        <iframe
          title={"Code Preview"}
          className="bg-white w-100"
          srcDoc={code}
          frameBorder={"no"}
        ></iframe>
      </div>
    );
  }
}

export default PreviewPane;
