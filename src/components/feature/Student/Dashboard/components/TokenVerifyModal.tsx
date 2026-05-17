import React from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TokenVerifyModal({
  verifyModal,
  setVerifyModal,
  tokenInput,
  setTokenInput,
  handleVerifyToken,
  errorMsg,
  loading,
}: {
  verifyModal: boolean;
  setVerifyModal: (value: boolean) => void;
  tokenInput: string;
  setTokenInput: (value: string) => void;
  handleVerifyToken: () => void;
  errorMsg: string;
  loading: boolean;
}) {
  return (
    <Modal
      isOpen={verifyModal}
      onClose={() => setVerifyModal(false)}
      title="Enter Access Token"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-500">
          Please enter the access token provided by the administrator to begin
          this exam.
        </p>
        {errorMsg && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl border border-red-100">
            {errorMsg}
          </div>
        )}
        <Input
          type="text"
          className="h-12 w-full px-4 rounded-xl border-slate-200 focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 tracking-widest font-mono text-center uppercase"
          placeholder="XXXXXX"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
        />
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Button
            variant="ghost"
            onClick={() => setVerifyModal(false)}
            className="px-5 py-2.5 h-10 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={handleVerifyToken}
            disabled={!tokenInput || loading}
            className="px-5 py-2.5 h-10 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50"
          >
            Verify & Start
          </Button>
        </div>
      </div>
    </Modal>
  );
}
