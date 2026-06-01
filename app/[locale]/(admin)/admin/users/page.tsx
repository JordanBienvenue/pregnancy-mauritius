"use client";

import { useState, useEffect, useCallback } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Users, Trash2 } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { RequireRole } from "@/components/admin/require-role";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { useAdmin } from "@/components/admin/admin-context";

type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  locale?: string;
  role: string;
  due_date: string | null;
  is_postpartum?: boolean;
  is_solo_mother: boolean;
  created_at: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewUser, setViewUser] = useState<Profile | null>(null);
  const { role } = useAdmin();

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function changeRole(userId: string, newRole: string) {
    await fetch(`/api/admin/users?id=${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    fetchUsers();
    if (viewUser && viewUser.id === userId) {
      setViewUser((prev) => prev ? { ...prev, role: newRole } : null);
    }
  }

  async function handleDelete(userId: string) {
    await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
    setViewUser(null);
    fetchUsers();
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "--";
    return new Date(dateStr).toLocaleDateString();
  }

  const columns: ColumnDef<Profile>[] = [
    {
      accessorKey: "full_name",
      header: "Name",
      cell: ({ row }) => (
        <button
          type="button"
          className="font-medium hover:underline text-left"
          onClick={() => setViewUser(row.original)}
        >
          {row.original.full_name || "--"}
        </button>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.email || "--"}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Select
          value={row.original.role || "user"}
          onValueChange={(val) => val && changeRole(row.original.id, val)}
        >
          <SelectTrigger className="w-[120px]" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => formatDate(row.original.due_date),
    },
    {
      accessorKey: "is_solo_mother",
      header: "Solo Mother",
      cell: ({ row }) =>
        row.original.is_solo_mother ? (
          <Badge variant="default">Yes</Badge>
        ) : (
          <span className="text-muted-foreground">No</span>
        ),
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <ConfirmDialog
            title="Delete user?"
            description="This will permanently remove this user profile. This action cannot be undone."
            confirmLabel="Delete"
            onConfirm={() => handleDelete(row.original.id)}
          >
            <Button variant="destructive" size="icon-sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </ConfirmDialog>
        </div>
      ),
    },
  ];

  return (
    <RequireRole minimum="admin">
      <div className="p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage user accounts
          </p>
        </div>

        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              </div>
            ) : users.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No users found"
                description="There are no registered users yet."
              />
            ) : (
              <DataTable
                columns={columns}
                data={users}
                searchKey="full_name"
                searchPlaceholder="Search users..."
              />
            )}
          </CardContent>
        </Card>

        <Dialog open={!!viewUser} onOpenChange={(open) => !open && setViewUser(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Full profile information for this user.
            </DialogDescription>
            {viewUser && (
              <div className="grid gap-3 text-sm">
                <div className="grid grid-cols-[120px_1fr] gap-1">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{viewUser.full_name || "--"}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-1">
                  <span className="text-muted-foreground">Email</span>
                  <span>{viewUser.email || "--"}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-1">
                  <span className="text-muted-foreground">Phone</span>
                  <span>{viewUser.phone || "--"}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-1">
                  <span className="text-muted-foreground">Locale</span>
                  <span>{viewUser.locale || "--"}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-1">
                  <span className="text-muted-foreground">Role</span>
                  <Select
                    value={viewUser.role || "user"}
                    onValueChange={(val) => val && changeRole(viewUser.id, val)}
                  >
                    <SelectTrigger className="w-[140px]" size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-1">
                  <span className="text-muted-foreground">Due Date</span>
                  <span>{formatDate(viewUser.due_date)}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-1">
                  <span className="text-muted-foreground">Postpartum</span>
                  <span>{viewUser.is_postpartum ? "Yes" : "No"}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-1">
                  <span className="text-muted-foreground">Solo Mother</span>
                  <span>{viewUser.is_solo_mother ? "Yes" : "No"}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-1">
                  <span className="text-muted-foreground">Created</span>
                  <span>{formatDate(viewUser.created_at)}</span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </RequireRole>
  );
}
