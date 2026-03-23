import React from "react";

export default function HeaderLogin({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <header className="text-center mb-10">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-600 text-white font-bold text-2xl shadow-lg shadow-indigo-200 mb-6">
        {icon}
      </div>
      <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">
        {title}
      </h1>
      <p className="text-slate-500">{description}</p>
    </header>
  );
}
