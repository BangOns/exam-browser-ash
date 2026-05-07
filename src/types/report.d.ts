export type AuditEntry = {
  id: string;
  action: string;
  user: string;
  role: string;
  timestamp: string;
  type: "info" | "warning" | "danger" | "success";
};

export interface ReportList {
  id: string;
  user: User;
  action: string;
  module: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
}
