import React from "react";

export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header>
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </header>
  );
}
