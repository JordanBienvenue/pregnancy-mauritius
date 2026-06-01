"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/stat-card";
import {
  Users,
  MessageSquare,
  Gift,
  CalendarCheck,
  Stethoscope,
  FileText,
  Megaphone,
  Activity,
  AlertTriangle,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardStats = {
  totalUsers: number;
  activeProviders: number;
  pendingBookings: number;
  flaggedPPD: number;
  unresolvedReports: number;
  publishedPosts: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of the Manman Moris platform
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : stats ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Total Users" value={stats.totalUsers} icon={Users} />
            <StatCard label="Active Providers" value={stats.activeProviders} icon={Stethoscope} />
            <StatCard label="Published Posts" value={stats.publishedPosts} icon={FileText} />
            <StatCard label="Pending Bookings" value={stats.pendingBookings} icon={CalendarCheck} />
            <StatCard
              label="Flagged PPD"
              value={stats.flaggedPPD}
              icon={Activity}
              className={stats.flaggedPPD > 0 ? "border-red-200" : ""}
            />
            <StatCard
              label="Unresolved Reports"
              value={stats.unresolvedReports}
              icon={AlertTriangle}
              className={stats.unresolvedReports > 0 ? "border-amber-200" : ""}
            />
          </div>

          {/* Alerts */}
          {(stats.flaggedPPD > 0 || stats.unresolvedReports > 0) && (
            <div className="mt-6 space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground">Alerts</h2>
              {stats.flaggedPPD > 0 && (
                <Card className="border-red-200 bg-red-50/50">
                  <CardContent className="flex items-center gap-3 p-4">
                    <Activity className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        {stats.flaggedPPD} PPD check-in(s) scored 13+
                      </p>
                      <p className="text-xs text-red-600/80">
                        Review in PPD Monitor for potential intervention
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {stats.unresolvedReports > 0 && (
                <Card className="border-amber-200 bg-amber-50/50">
                  <CardContent className="flex items-center gap-3 p-4">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        {stats.unresolvedReports} unresolved forum report(s)
                      </p>
                      <p className="text-xs text-amber-600/80">
                        Review in Forum moderation
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-muted-foreground">Failed to load stats.</p>
      )}
    </div>
  );
}
