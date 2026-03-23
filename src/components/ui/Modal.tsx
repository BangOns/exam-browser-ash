"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className={`${maxWidth} sm:${maxWidth} max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden`}>
        <DialogHeader className="px-6 py-4 border-b border-slate-100">
          <DialogTitle className="text-lg font-bold text-slate-800">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
