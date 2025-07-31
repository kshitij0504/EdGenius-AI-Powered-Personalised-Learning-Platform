const SettingsPage = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-3xl font-bold text-[var(--color-edgenius-text-primary)] mb-2">
        Settings
      </h3>
      <p className="text-[var(--color-edgenius-text-secondary)]">
        Manage your account preferences and platform settings
      </p>
    </div>
    <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
      <Cog6ToothIcon className="h-16 w-16 text-[var(--color-edgenius-accent-medium)] mx-auto mb-4" />
      <h4 className="text-xl font-semibold text-[var(--color-edgenius-text-primary)] mb-2">
        Platform Settings
      </h4>
      <p className="text-[var(--color-edgenius-text-secondary)]">
        Configure your preferences, notifications, and account settings.
      </p>
    </div>
  </div>
);
export default SettingsPage;
