"use client";

import { useState, useEffect, useCallback } from "react";
import { RequireRole } from "@/components/admin/require-role";
import { useAdmin } from "@/components/admin/admin-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Check } from "lucide-react";

type FeatureFlags = {
  marketplace: boolean;
  donations: boolean;
  forum: boolean;
  blog: boolean;
};

export default function SettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [defaultLocale, setDefaultLocale] = useState("cr");
  const [features, setFeatures] = useState<FeatureFlags>({
    marketplace: true,
    donations: true,
    forum: true,
    blog: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { role } = useAdmin();

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.maintenance_mode !== undefined) {
          setMaintenanceMode(
            data.maintenance_mode === true || data.maintenance_mode === "true"
          );
        }
        if (data.default_locale) {
          setDefaultLocale(
            typeof data.default_locale === "string" ? data.default_locale : "cr"
          );
        }
        if (data.features) {
          setFeatures(data.features as FeatureFlags);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        maintenance_mode: maintenanceMode,
        default_locale: defaultLocale,
        features,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function toggleFeature(key: keyof FeatureFlags) {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <RequireRole minimum="admin">
      <div className="p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Platform configuration and feature flags
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          </div>
        ) : (
          <div className="max-w-2xl space-y-6">
            {/* Maintenance Mode */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">
                      Maintenance Mode
                    </Label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      When enabled, the site shows a maintenance page to
                      non-admin users.
                    </p>
                  </div>
                  <button
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      maintenanceMode ? "bg-red-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        maintenanceMode ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Default Locale */}
            <Card>
              <CardContent className="p-5">
                <Label className="text-sm font-medium">Default Locale</Label>
                <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                  Default language for new users and the root URL redirect.
                </p>
                <Select
                  value={defaultLocale}
                  onValueChange={(val) => val && setDefaultLocale(val)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="cr">Kreol Morisien</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Feature Flags */}
            <Card>
              <CardContent className="p-5">
                <Label className="text-sm font-medium">Feature Flags</Label>
                <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                  Enable or disable platform features.
                </p>
                <div className="space-y-3">
                  {(Object.keys(features) as (keyof FeatureFlags)[]).map(
                    (key) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm capitalize">{key}</span>
                        <button
                          onClick={() => toggleFeature(key)}
                          className={`relative h-6 w-11 rounded-full transition-colors ${
                            features[key] ? "bg-primary" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                              features[key]
                                ? "translate-x-5"
                                : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Save */}
            <div className="flex items-center gap-3">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              {saved && (
                <span className="flex items-center gap-1 text-sm text-emerald-600">
                  <Check className="h-4 w-4" />
                  Saved
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </RequireRole>
  );
}
