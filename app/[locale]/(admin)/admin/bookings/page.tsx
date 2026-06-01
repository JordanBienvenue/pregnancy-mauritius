"use client";

import { useState, useEffect, useCallback } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CalendarCheck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/admin/data-table";
import { RequireRole } from "@/components/admin/require-role";
import { StatusBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/empty-state";
import { useAdmin } from "@/components/admin/admin-context";

type Booking = {
  id: string;
  user_name: string;
  provider_name: string;
  service: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
};

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState<Booking | null>(null);
  const { role } = useAdmin();

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchBookings();
  }

  async function updateViewStatus(status: string) {
    if (!viewItem) return;
    await fetch(`/api/admin/bookings/${viewItem.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setViewItem({ ...viewItem, status });
    fetchBookings();
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return "--";
    return new Date(dateStr).toLocaleDateString();
  }

  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: "user_name",
      header: "User",
      cell: ({ row }) => (
        <button
          type="button"
          className="font-medium text-left hover:underline"
          onClick={() => setViewItem(row.original)}
        >
          {row.original.user_name || "--"}
        </button>
      ),
    },
    {
      accessorKey: "provider_name",
      header: "Provider",
    },
    {
      accessorKey: "service",
      header: "Service",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.date),
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => row.original.time || "--",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setViewItem(row.original)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Select
            value={row.original.status}
            onValueChange={(val) => val && updateStatus(row.original.id, val)}
          >
            <SelectTrigger className="w-[130px]" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ),
    },
  ];

  return (
    <RequireRole minimum="moderator">
      <div className="p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage appointment bookings
          </p>
        </div>

        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              </div>
            ) : bookings.length === 0 ? (
              <EmptyState
                icon={CalendarCheck}
                title="No bookings"
                description="There are no bookings to display."
              />
            ) : (
              <DataTable
                columns={columns}
                data={bookings}
                searchKey="user_name"
                searchPlaceholder="Search bookings..."
              />
            )}
          </CardContent>
        </Card>

        <Dialog open={!!viewItem} onOpenChange={(open) => !open && setViewItem(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                View and manage this booking
              </DialogDescription>
            </DialogHeader>
            {viewItem && (
              <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto">
                <div className="grid gap-1">
                  <Label className="text-muted-foreground">User</Label>
                  <p className="text-sm font-medium">{viewItem.user_name || "--"}</p>
                </div>
                <div className="grid gap-1">
                  <Label className="text-muted-foreground">Provider</Label>
                  <p className="text-sm font-medium">{viewItem.provider_name || "--"}</p>
                </div>
                <div className="grid gap-1">
                  <Label className="text-muted-foreground">Service Type</Label>
                  <p className="text-sm">{viewItem.service || "--"}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1">
                    <Label className="text-muted-foreground">Preferred Date</Label>
                    <p className="text-sm">{formatDate(viewItem.date)}</p>
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-muted-foreground">Preferred Time</Label>
                    <p className="text-sm">{viewItem.time || "--"}</p>
                  </div>
                </div>
                <div className="grid gap-1">
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={viewItem.status} />
                    <Select
                      value={viewItem.status}
                      onValueChange={(val) => val && updateViewStatus(val)}
                    >
                      <SelectTrigger className="w-[140px]" size="sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {viewItem.notes && (
                  <div className="grid gap-1">
                    <Label className="text-muted-foreground">Notes</Label>
                    <p className="text-sm whitespace-pre-wrap">{viewItem.notes}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter showCloseButton />
          </DialogContent>
        </Dialog>
      </div>
    </RequireRole>
  );
}
