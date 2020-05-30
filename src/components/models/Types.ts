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
  workingFiles: FileInfo[];
};

export type StudentViewItem = {
  studentID: string;
  commitTotalNum: number;
  currentCommitIndex: number;
};

export type FileStatus = "A" | "M" | "D";
export type CommitFile = {
  fileName: string;
  fileStatus: FileStatus;
};

export type CommitLogInfo = {
  commitTime: string;
  commitFile: CommitFile[];
};
