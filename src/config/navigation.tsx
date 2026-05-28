import {
  CalendarCheck,
  ChartNoAxesColumnIncreasing,
  FileText,
  LayoutDashboard,
  // Settings,
} from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { NavItem } from "@/types/navigation";

export const navConfig: Record<
  string,
  { items: NavItem[]; accent: string; label: string }
> = {
  admin: {
    label: "Admin",
    accent: "bg-admin",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: (
          <LayoutDashboard size={20} stroke="currentColor" strokeWidth={1.8} />
        ),
      },
      {
        label: "Exams",
        href: "/admin/exams",
        icon: <FileText size={20} stroke="currentColor" strokeWidth={1.8} />,
      },
      {
        label: "Teacher List",
        href: "/admin/users/teachers",
        icon: <FaUsers size={20} stroke="currentColor" strokeWidth={1.8} />,
      },
      {
        label: "Student List",
        href: "/admin/users/students",
        icon: <FaUsers size={20} stroke="currentColor" strokeWidth={1.8} />,
      },
      {
        label: "Exam Schedule",
        href: "/admin/schedule",
        icon: (
          <CalendarCheck size={20} stroke="currentColor" strokeWidth={1.8} />
        ),
      },
      {
        label: "Reports / Audit",
        href: "/admin/reports",
        icon: (
          <ChartNoAxesColumnIncreasing
            size={20}
            stroke="currentColor"
            strokeWidth={1.8}
          />
        ),
      },
      // {
      //   label: "Settings",
      //   href: "/admin/settings",
      //   icon: <Settings size={20} stroke="currentColor" strokeWidth={1.8} />,
      // },
    ],
  },
  teacher: {
    label: "Teacher",
    accent: "bg-teacher",
    items: [
      {
        label: "Dashboard",
        href: "/teacher",
        icon: (
          <LayoutDashboard size={20} stroke="currentColor" strokeWidth={1.8} />
        ),
      },
      {
        label: "Question Bank",
        href: "/teacher/questions",
        icon: <FileText size={20} stroke="currentColor" strokeWidth={1.8} />,
      },
      {
        label: "Exams",
        href: "/teacher/exams",
        icon: (
          <CalendarCheck size={20} stroke="currentColor" strokeWidth={1.8} />
        ),
      },
      // {
      //   label: "Monitoring",
      //   href: "/teacher/monitoring",
      //   icon: (
      //     <MonitorCheck size={20} stroke="currentColor" strokeWidth={1.8} />
      //   ),
      // },
      {
        label: "Exam Results",
        href: "/teacher/results",
        icon: (
          <ChartNoAxesColumnIncreasing
            size={20}
            stroke="currentColor"
            strokeWidth={1.8}
          />
        ),
      },
    ],
  },
  student: {
    label: "Student",
    accent: "bg-student",
    items: [
      {
        label: "Dashboard",
        href: "/student",
        icon: (
          <LayoutDashboard size={20} stroke="currentColor" strokeWidth={1.8} />
        ),
      },
      // {
      //   label: "Exam Results",
      //   href: "/student/results",
      //   icon: (
      //     <ChartNoAxesColumnIncreasing
      //       size={20}
      //       stroke="currentColor"
      //       strokeWidth={1.8}
      //     />
      //   ),
      // },
      // {
      //   label: "Notifications",
      //   href: "/student/notifications",
      //   icon: <Bell size={20} stroke="currentColor" strokeWidth={1.8} />,
      // },
    ],
  },
};
