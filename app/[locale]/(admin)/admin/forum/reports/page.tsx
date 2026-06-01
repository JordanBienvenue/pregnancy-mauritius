"use client";

import { useState, useEffect, useCallback } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowLeft, Flag } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/admin/data-table";
import { RequireRole } from "@/components/admin/require-role";
import { StatusBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/empty-state";
import { useAdmin } from "@/components/admin/admin-context";

type ForumReport = {
  id: string;
  post_title: string;
  reason: string;
  reporter_name: string;
  status: string;
  created_at: string;
};

export default function ForumReportsPage() {
  const [reports, setReports] = useState<ForumReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewReport, setViewReport] = useState<ForumReport | null>(null);
  const { role } = useAdmin();

  const fetchReports = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/forum/reports");
      if (res.ok) {
        const data = await res.json();
        setReports(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  async function updateReportStatus(id: string, status: string) {
    await fetch(`/api/admin/forum/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setViewReport((prev) => prev && prev.id === id ? { ...prev, status } : prev);
    fetchReports();
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString();
  }

  const columns: ColumnDef<ForumReport>[] = [
    {
      accessorKey: "post_title",
      header: "Post Title",
      cell: ({ row }) => (
        <button
          type="button"
          className="font-medium max-w-[200px] truncate block text-left hover:underline"
          onClick={() => setViewReport(row.original)}
        >
          {row.original.post_title || "Deleted Post"}
        </button>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => (
        <span className="max-w-[300px] truncate block">
          {row.original.reason}
        </span>
      ),
    },
    {
      accessorKey: "reporter_name",
      header: "Reporter",
      cell: ({ row }) => row.original.reporter_name || "Anonymous",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          {row.original.status === "pending" && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={() => updateReportStatus(row.original.id, "resolved")}
              >
                Resolve
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateReportStatus(row.original.id, "dismissed")}
              >
                Dismiss
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <RequireRole minimum="moderator">
      <div className="p-6 lg:p-8">
        <div className="mb-6">
          <Link
            href="/admin/forum"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Forum
          </Link>
          <h1 className="text-3xl font-bold">Forum Reports</h1>
          <p className="mt-1 text-muted-foreground">
            Review and manage reported forum posts
          </p>
        </div>

        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              </div>
            ) : reports.length === 0 ? (
              <EmptyState
                icon={Flag}
                title="No reports"
                description="There are no forum reports to review."
              />
            ) : (
              <DataTable
                columns={columns}
                data={reports}
                searchKey="post_title"
                searchPlaceholder="Search reports..."
              />
            )}
          </CardContent>
        </Card>

        <Dialog open={!!viewReport} onOpenChange={(open) => !open && setViewReport(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>
              Full details for this forum report.
            </DialogDescription>
            {viewReport && (
              <div className="grid gap-3 text-sm">
                <div className="grid grid-cols-[100px_1fr] gap-1">
                  <span className="text-muted-foreground">Post Title</span>
                  <span className="font-medium">{viewReport.post_title || "Deleted Post"}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-1">
                  <span className="text-muted-foreground">Reason</span>
                  <span className="whitespace-pre-wrap">{viewReport.reason}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-1">
                  <span className="text-muted-foreground">Reporter</span>
                  <span>{viewReport.reporter_name || "Anonymous"}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-1">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge status={viewReport.status} />
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-1">
                  <span className="text-muted-foreground">Date</span>
                  <span>{formatDate(viewReport.created_at)}</span>
                </div>
                {viewReport.status === "pending" && (
                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => updateReportStatus(viewReport.id, "resolved")}
                    >
                      Resolve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateReportStatus(viewReport.id, "dismissed")}
                    >
                      Dismiss
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </RequireRole>
  );
}
