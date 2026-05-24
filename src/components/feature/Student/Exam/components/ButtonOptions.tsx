import { Button } from "@/components/ui/button";

interface ButtonOptionsProps {
  idx: number;
  option: {
    label: string;
    text: string;
  };
  selected: boolean;
  onSelect: (value: string) => void;
}

export default function ButtonOptions({
  idx,
  option,
  selected,
  onSelect,
}: ButtonOptionsProps) {
  return (
    <Button
      onClick={() => onSelect(option.label)}
      className={`w-full flex items-center gap-4 p-5 justify-start rounded-xl border-2 transition-all duration-200 text-left ${
        selected
          ? "border-sky-500 bg-sky-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/50"
      }`}
    >
      <span
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
          selected ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500"
        }`}
      >
        {String.fromCharCode(65 + idx)}
      </span>

      <span
        className={`text-sm ${
          selected ? "text-sky-700 font-medium" : "text-slate-600"
        }`}
      >
        {option.text}
      </span>
    </Button>
  );
}
