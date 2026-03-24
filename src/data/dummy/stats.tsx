import { FileText, TriangleAlert, Users, Zap } from "lucide-react";

export const statsData = [
  {
    icon: <FileText />,
    label: "Total Exams",
    value: 142,
    trend: "+12 this month",
    trendUp: true,
  },
  {
    icon: <Users />,
    label: "Active Users",
    value: "1,248",
    trend: "+85 this week",
    trendUp: true,
  },
  {
    icon: <Zap />,
    label: "Ongoing Exams",
    value: 8,
    trend: "3 finishing soon",
    trendUp: true,
  },
  {
    icon: <TriangleAlert />,
    label: "System Alerts",
    value: 3,
    trend: "2 violations",
    trendUp: false,
  },
];
