import DataManagement from "@/components/feature/Admin/Settings/components/DataManagement";
import GeneralSettings from "@/components/feature/Admin/Settings/components/GeneralSettings";
import NotificationSettings from "@/components/feature/Admin/Settings/components/NotificationSettings";
import SecuritySettings from "@/components/feature/Admin/Settings/components/SecuritySettings";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="System configuration and preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <GeneralSettings />

        {/* Security Settings */}
        <SecuritySettings />

        {/* Notification Settings */}
        <NotificationSettings />

        {/* Data Management */}
        <DataManagement />
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <Button className="px-8 py-3 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors shadow-sm hover:shadow-md">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
