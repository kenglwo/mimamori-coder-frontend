export type DisplayOption = {
  style: "table" | "card";
  order:
    | "studentID"
    | "studentName"
    | "lastUpdatedTime"
    | "warnings"
    | "errors";
};

export type CodeStatus = "ok" | "warning" | "error";

export type FileInfo = {
  fileName: string;
  lastUpdatedTime: string;
  codeStatus: CodeStatus[];
  warningsCount: number;
  errorsCount: number;
};

export type StudentTableItem = {
  studentID: string;
  studentName: string;
  workingFiles: FileInfo[];
};
