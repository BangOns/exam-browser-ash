import { ArrowDownToLine, Database, DatabaseBackup, Trash } from "lucide-react";

export default function DataManagement() {
  return (
    <div className="glass-card p-6 animate-slide-up">
      <h3 className="text-base font-semibold text-slate-800 mb-5 flex items-center gap-2">
        <Database />
        Data Management
      </h3>
      <div className="space-y-3">
        <button className="w-full py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left px-4 flex items-center justify-between">
          <span>Export All Data</span>
          <ArrowDownToLine />
        </button>
        <button className="w-full py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left px-4 flex items-center justify-between">
          <span>Backup Database</span>
          <DatabaseBackup />
        </button>
        <button className="w-full py-3 rounded-xl border border-red-200 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left px-4 flex items-center justify-between">
          <span>Clear Audit Logs</span>
          <Trash />
        </button>
      </div>
    </div>
  );
}
