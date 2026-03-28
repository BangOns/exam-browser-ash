import { Question } from "@/types/question";

export function questionColumns() {
  return [
    {
      key: "question",
      label: "Question",
      render: (row: Question) => <p>{row.question}</p>,
    },
    {
      key: "subject",
      label: "Subject",
      render: (row: Question) => <p>{row.subject}</p>,
    },
    {
      key: "type",
      label: "Type",
      render: (row: Question) => (
        <span className="badge badge-neutral">{row.type}</span>
      ),
    },
  ];
}
