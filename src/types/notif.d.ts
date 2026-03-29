export type Notif = { id: number; message: string; type: string; time: string };
export type NotificationStudent = {
  id: number;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "danger";
  time: string;
  read: boolean;
};
