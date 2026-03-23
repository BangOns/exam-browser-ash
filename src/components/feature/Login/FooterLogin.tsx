import React from "react";

export default function FooterLogin({ description }: { description: string }) {
  return (
    <section className="mt-8 text-center text-xs text-slate-400">
      <p>{description}</p>
    </section>
  );
}
