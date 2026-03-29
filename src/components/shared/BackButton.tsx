import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BackButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors font-medium"
    >
      <ArrowLeft size={18} />
      Back to Results
    </Link>
  );
}
