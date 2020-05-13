export type DisplayOption = {
  style: "table" | "card";
  order:
    | "studentID"
    | "studentName"
    | "lastUpdatedTime"
    | "warnings"
    | "errors";
};

export type CodeStatus =
  | "ok"
  | "warning"
  | "error"
  | "warning-error"
  | "unknown";

export type FileInfo = {
  fileName: string;
  commitIndex: number;
  updatedTime: string;
  codeStatus: CodeStatus;
  warningNum: number;
  errorNum: number;
};

export type StudentTableItem = {
  studentID: string;
  studentName: string;
  workingFiles: FileInfo[];
};

export type StudentViewItem = {
  studentID: string;
  studentName: string;
  commitTotalNum: number;
  currentCommitIndex: number;
  files: FileInfo[];
};
