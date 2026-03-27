export type AuditEntry = {
  id: number;
  action: string;
  user: string;
  role: string;
  timestamp: string;
  type: "info" | "warning" | "danger";
};
