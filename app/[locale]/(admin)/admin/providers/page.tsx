"use client";

import { useState, useEffect, useCallback } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

type Provider = {
  id: string;
  name: string;
  type: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  is_verified: boolean;
  is_public: boolean;
  description: string;
};

const PROVIDER_TYPES = [
  "gynecologist",
  "obstetrician",
  "midwife",
  "pediatrician",
  "lactation_consultant",
  "doula",
  "therapist",
  "nutritionist",
  "hospital",
  "clinic",
  "pharmacy",
  "lab",
  "other",
];

const DISTRICTS = [
  "Port Louis",
  "Pamplemousses",
  "Riviere du Rempart",
  "Flacq",
  "Grand Port",
  "Savanne",
  "Black River",
  "Plaines Wilhems",
  "Moka",
  "Rodrigues",
];

const emptyProvider: Omit<Provider, "id"> = {
  name: "",
  type: "",
  district: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  is_verified: false,
  is_public: true,
  description: "",
};

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Provider | null>(null);
  const [form, setForm] = useState(emptyProvider);
  const { role } = useAdmin();

  const fetchProviders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/providers");
      if (res.ok) {
        const data = await res.json();
        setProviders(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  function openCreate() {
    setEditing(null);
    setForm(emptyProvider);
    setDialogOpen(true);
  }

  function openEdit(provider: Provider) {
    setEditing(provider);
    setForm({
      name: provider.name,
      type: provider.type,
      district: provider.district,
      address: provider.address ?? "",
      phone: provider.phone ?? "",
      email: provider.email ?? "",
      website: provider.website ?? "",
      is_verified: provider.is_verified,
      is_public: provider.is_public,
      description: provider.description ?? "",
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (editing) {
      await fetch(`/api/admin/providers/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setDialogOpen(false);
    fetchProviders();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/providers/${id}`, { method: "DELETE" });
    fetchProviders();
  }

  async function toggleField(id: string, field: "is_verified" | "is_public", value: boolean) {
    await fetch(`/api/admin/providers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !value }),
    });
    fetchProviders();
  }

  const columns: ColumnDef<Provider>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.type?.replace(/_/g, " ")}
        </Badge>
      ),
    },
    {
      accessorKey: "district",
      header: "District",
    },
    {
      accessorKey: "is_verified",
      header: "Verified",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() =>
            toggleField(row.original.id, "is_verified", row.original.is_verified)
          }
        >
          <Badge variant={row.original.is_verified ? "default" : "outline"}>
            {row.original.is_verified ? "Yes" : "No"}
          </Badge>
        </button>
      ),
    },
    {
      accessorKey: "is_public",
      header: "Public",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() =>
            toggleField(row.original.id, "is_public", row.original.is_public)
          }
        >
          <Badge variant={row.original.is_public ? "default" : "outline"}>
            {row.original.is_public ? "Yes" : "No"}
          </Badge>
        </button>
      ),
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
          {role === "admin" && (
            <ConfirmDialog
              title="Delete provider?"
              description="This will permanently remove this provider. This action cannot be undone."
              confirmLabel="Delete"
              onConfirm={() => handleDelete(row.original.id)}
            >
              <Button variant="destructive" size="icon-sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </ConfirmDialog>
          )}
        </div>
      ),
    },
  ];

  return (
    <RequireRole minimum="moderator">
      <div className="p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Providers</h1>
            <p className="mt-1 text-muted-foreground">
              Manage healthcare providers and services
            </p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add Provider
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              </div>
            ) : providers.length === 0 ? (
              <EmptyState
                icon={Stethoscope}
                title="No providers found"
                description="Add your first healthcare provider."
                actionLabel="Add Provider"
                onAction={openCreate}
              />
            ) : (
              <DataTable
                columns={columns}
                data={providers}
                searchKey="name"
                searchPlaceholder="Search providers..."
              />
            )}
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Provider" : "Add Provider"}</DialogTitle>
              <DialogDescription>
                {editing ? "Update provider information." : "Add a new healthcare provider."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Type</Label>
                  <Select value={form.type || undefined} onValueChange={(val) => val && setForm({ ...form, type: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROVIDER_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>District</Label>
                  <Select value={form.district || undefined} onValueChange={(val) => val && setForm({ ...form, district: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {DISTRICTS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.is_verified}
                    onChange={(e) => setForm({ ...form, is_verified: e.target.checked })}
                    className="rounded"
                  />
                  Verified
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.is_public}
                    onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
                    className="rounded"
                  />
                  Public
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editing ? "Save Changes" : "Create Provider"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </RequireRole>
  );
}
