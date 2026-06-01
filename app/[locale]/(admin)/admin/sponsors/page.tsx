"use client";

import { useState, useEffect, useCallback } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Heart } from "lucide-react";
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
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { useAdmin } from "@/components/admin/admin-context";

type Sponsor = {
  id: string;
  name: string;
  logo_url: string;
  website: string;
  package: string;
  category: string;
  active_from: string;
  active_to: string;
  is_active: boolean;
};

const PACKAGES = ["platinum", "gold", "silver", "bronze", "community"];
const CATEGORIES = [
  "healthcare",
  "baby_products",
  "nutrition",
  "wellness",
  "education",
  "technology",
  "other",
];

const emptySponsor: Omit<Sponsor, "id"> = {
  name: "",
  logo_url: "",
  website: "",
  package: "",
  category: "",
  active_from: "",
  active_to: "",
  is_active: true,
};

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Sponsor | null>(null);
  const [form, setForm] = useState(emptySponsor);
  const { role } = useAdmin();

  const fetchSponsors = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/sponsors");
      if (res.ok) {
        const data = await res.json();
        setSponsors(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);

  function openCreate() {
    setEditing(null);
    setForm(emptySponsor);
    setDialogOpen(true);
  }

  function openEdit(sponsor: Sponsor) {
    setEditing(sponsor);
    setForm({
      name: sponsor.name,
      logo_url: sponsor.logo_url ?? "",
      website: sponsor.website ?? "",
      package: sponsor.package ?? "",
      category: sponsor.category ?? "",
      active_from: sponsor.active_from ?? "",
      active_to: sponsor.active_to ?? "",
      is_active: sponsor.is_active,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (editing) {
      await fetch(`/api/admin/sponsors/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setDialogOpen(false);
    fetchSponsors();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/sponsors/${id}`, { method: "DELETE" });
    fetchSponsors();
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return "--";
    return new Date(dateStr).toLocaleDateString();
  }

  const columns: ColumnDef<Sponsor>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "package",
      header: "Package",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.package?.charAt(0).toUpperCase() +
            row.original.package?.slice(1)}
        </Badge>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) =>
        row.original.category
          ?.replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
    },
    {
      accessorKey: "is_active",
      header: "Active",
      cell: ({ row }) => (
        <Badge variant={row.original.is_active ? "default" : "outline"}>
          {row.original.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "active_from",
      header: "From",
      cell: ({ row }) => formatDate(row.original.active_from),
    },
    {
      accessorKey: "active_to",
      header: "To",
      cell: ({ row }) => formatDate(row.original.active_to),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="icon-sm" onClick={() => openEdit(row.original)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <ConfirmDialog
            title="Delete sponsor?"
            description="This will permanently remove this sponsor. This action cannot be undone."
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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sponsors</h1>
            <p className="mt-1 text-muted-foreground">
              Manage sponsors and partnerships
            </p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add Sponsor
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              </div>
            ) : sponsors.length === 0 ? (
              <EmptyState
                icon={Heart}
                title="No sponsors"
                description="Add your first sponsor or partner."
                actionLabel="Add Sponsor"
                onAction={openCreate}
              />
            ) : (
              <DataTable
                columns={columns}
                data={sponsors}
                searchKey="name"
                searchPlaceholder="Search sponsors..."
              />
            )}
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Sponsor" : "Add Sponsor"}</DialogTitle>
              <DialogDescription>
                {editing ? "Update sponsor details." : "Add a new sponsor or partner."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input id="logo_url" value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Package</Label>
                  <Select value={form.package || undefined} onValueChange={(val) => val && setForm({ ...form, package: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent>
                      {PACKAGES.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select value={form.category || undefined} onValueChange={(val) => val && setForm({ ...form, category: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c.replace(/_/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="active_from">Active From</Label>
                  <Input
                    id="active_from"
                    type="date"
                    value={form.active_from}
                    onChange={(e) => setForm({ ...form, active_from: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="active_to">Active To</Label>
                  <Input
                    id="active_to"
                    type="date"
                    value={form.active_to}
                    onChange={(e) => setForm({ ...form, active_to: e.target.value })}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="rounded"
                />
                Active
              </label>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editing ? "Save Changes" : "Create Sponsor"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </RequireRole>
  );
}
