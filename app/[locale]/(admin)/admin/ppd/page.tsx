"use client";

import { useState, useEffect, useCallback } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { RequireRole } from "@/components/admin/require-role";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { DataTable } from "@/components/admin/data-table";
import { EmptyState } from "@/components/admin/empty-state";
import { useAdmin } from "@/components/admin/admin-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  ClipboardCheck,
  Shield,
  ShieldAlert,
} from "lucide-react";

type PPDStats = {
  totalCheckins: number;
  averageScore: number;
  flaggedCount: number;
  distribution: { normal: number; borderline: number; flagged: number };
};

type FlaggedRecord = {
  id: string;
  user_name: string;
  score: number;
  created_at: string;
  answers_preview: string;
};

export default function PPDPage() {
  const [stats, setStats] = useState<PPDStats | null>(null);
  const [flaggedRecords, setFlaggedRecords] = useState<FlaggedRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useAdmin();

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/ppd");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setFlaggedRecords(data.flaggedRecords ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString();
  }

  const columns: ColumnDef<FlaggedRecord>[] = [
    {
      accessorKey: "user_name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.user_name || "Anonymous"}
        </span>
      ),
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <StatusBadge
            status={row.original.score >= 13 ? "flagged" : "pending"}
          />
          <span className="font-medium">{row.original.score}/30</span>
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      accessorKey: "answers_preview",
      header: "Answers Preview",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm max-w-[300px] truncate block">
          {row.original.answers_preview || "--"}
        </span>
      ),
    },
  ];

  return (
    <RequireRole minimum="moderator">
      <div className="p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">PPD Monitor</h1>
          <p className="mt-1 text-muted-foreground">
            Postpartum depression screening check-in overview
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          </div>
        ) : stats ? (
          <>
            {/* Stat Cards */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <StatCard
                label="Total Check-ins"
                value={stats.totalCheckins}
                icon={ClipboardCheck}
              />
              <StatCard
                label="Average Score"
                value={stats.averageScore.toFixed(1)}
                icon={BarChart3}
              />
              <StatCard
                label="Flagged Count"
                value={stats.flaggedCount}
                icon={AlertTriangle}
                className={stats.flaggedCount > 0 ? "border-red-200" : ""}
              />
            </div>

            {/* Distribution */}
            <Card className="mb-6">
              <CardContent className="p-5">
                <h2 className="text-sm font-medium text-muted-foreground mb-3">
                  Score Distribution
                </h2>
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1"
                  >
                    Normal (&lt;10): {stats.distribution.normal}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1"
                  >
                    Borderline (10-12): {stats.distribution.borderline}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200 px-3 py-1"
                  >
                    Flagged (13+): {stats.distribution.flagged}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Flagged Records - admin only */}
            {role === "admin" && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-4">
                    Flagged Records (Admin Only)
                  </h2>
                  {flaggedRecords.length === 0 ? (
                    <EmptyState
                      icon={ShieldAlert}
                      title="No flagged records"
                      description="There are no flagged PPD check-ins at this time."
                    />
                  ) : (
                    <DataTable
                      columns={columns}
                      data={flaggedRecords}
                      searchKey="user_name"
                      searchPlaceholder="Search records..."
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {/* Privacy Notice */}
            <Card className="border-teal-200 bg-teal-50/50">
              <CardContent className="flex items-start gap-3 p-4">
                <Shield className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-teal-800">
                    Privacy Notice
                  </p>
                  <p className="text-xs text-teal-700/80">
                    This data is sensitive and protected under Mauritius Data
                    Protection Act 2017. Individual records are only visible to
                    admins. Do not share or export individual screening results
                    outside of this system.
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <EmptyState
            icon={Activity}
            title="No PPD data"
            description="No screening data is available yet."
          />
        )}
      </div>
    </RequireRole>
  );
}
