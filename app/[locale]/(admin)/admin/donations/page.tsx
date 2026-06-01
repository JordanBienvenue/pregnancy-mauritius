"use client";

import { useState, useEffect, useCallback } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Gift, Eye, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/admin/data-table";
import { RequireRole } from "@/components/admin/require-role";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { useAdmin } from "@/components/admin/admin-context";

type Donation = {
  id: string;
  item_name: string;
  description?: string;
  category: string;
  district: string;
  condition: string;
  is_available: boolean;
  is_hygiene_verified: boolean;
  donor_name?: string;
  images?: string[];
};

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState<Donation | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    item_name: "",
    description: "",
    condition: "good",
    category: "clothing",
    district: "",
  });
  const [creating, setCreating] = useState(false);
  const { role } = useAdmin();

  const fetchDonations = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/donations");
      if (res.ok) {
        const data = await res.json();
        setDonations(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  async function toggleField(id: string, field: string, value: boolean) {
    await fetch(`/api/admin/donations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !value }),
    });
    fetchDonations();
  }

  async function toggleViewField(field: "is_available" | "is_hygiene_verified") {
    if (!viewItem) return;
    const newValue = !viewItem[field];
    await fetch(`/api/admin/donations/${viewItem.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: newValue }),
    });
    setViewItem({ ...viewItem, [field]: newValue });
    fetchDonations();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/donations/${id}`, { method: "DELETE" });
    fetchDonations();
  }

  async function handleCreate() {
    setCreating(true);
    await fetch("/api/admin/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createForm),
    });
    setCreating(false);
    setCreateOpen(false);
    setCreateForm({ item_name: "", description: "", condition: "good", category: "clothing", district: "" });
    fetchDonations();
  }

  const columns: ColumnDef<Donation>[] = [
    {
      accessorKey: "item_name",
      header: "Item Name",
      cell: ({ row }) => (
        <button
          type="button"
          className="font-medium text-left hover:underline"
          onClick={() => setViewItem(row.original)}
        >
          {row.original.item_name}
        </button>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.category?.replace(/_/g, " ")}
        </Badge>
      ),
    },
    {
      accessorKey: "district",
      header: "District",
    },
    {
      accessorKey: "condition",
      header: "Condition",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.condition}</Badge>
      ),
    },
    {
      accessorKey: "is_available",
      header: "Available",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() =>
            toggleField(row.original.id, "is_available", row.original.is_available)
          }
        >
          <Badge variant={row.original.is_available ? "default" : "outline"}>
            {row.original.is_available ? "Yes" : "No"}
          </Badge>
        </button>
      ),
    },
    {
      accessorKey: "is_hygiene_verified",
      header: "Hygiene Verified",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() =>
            toggleField(
              row.original.id,
              "is_hygiene_verified",
              row.original.is_hygiene_verified
            )
          }
        >
          <Badge variant={row.original.is_hygiene_verified ? "default" : "outline"}>
            {row.original.is_hygiene_verified ? "Verified" : "Unverified"}
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
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setViewItem(row.original)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <ConfirmDialog
            title="Delete donation?"
            description="This will permanently remove this donation listing. This action cannot be undone."
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
    <RequireRole minimum="moderator">
      <div className="p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Donations</h1>
            <p className="mt-1 text-muted-foreground">
              View and manage donation listings
            </p>
          </div>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add Donation
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              </div>
            ) : donations.length === 0 ? (
              <EmptyState
                icon={Gift}
                title="No donations"
                description="There are no donation listings yet."
              />
            ) : (
              <DataTable
                columns={columns}
                data={donations}
                searchKey="item_name"
                searchPlaceholder="Search donations..."
              />
            )}
          </CardContent>
        </Card>

        {/* Create Dialog */}
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Donation</DialogTitle>
              <DialogDescription>Create a new donation listing.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label>Item Name</Label>
                <Input
                  value={createForm.item_name}
                  onChange={(e) => setCreateForm({ ...createForm, item_name: e.target.value })}
                  placeholder="e.g. Baby clothes 0-3 months"
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  rows={3}
                  placeholder="Describe the item condition and contents"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Condition</Label>
                  <Select value={createForm.condition} onValueChange={(val) => val && setCreateForm({ ...createForm, condition: val })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like_new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select value={createForm.category} onValueChange={(val) => val && setCreateForm({ ...createForm, category: val })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="feeding">Feeding</SelectItem>
                      <SelectItem value="maternity">Maternity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>District</Label>
                <Input
                  value={createForm.district}
                  onChange={(e) => setCreateForm({ ...createForm, district: e.target.value })}
                  placeholder="e.g. Port Louis"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setCreateOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={handleCreate} disabled={creating || !createForm.item_name || !createForm.district}>
                  {creating ? "Creating..." : "Create Donation"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={!!viewItem} onOpenChange={(open) => !open && setViewItem(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{viewItem?.item_name}</DialogTitle>
              <DialogDescription>Donation details and management</DialogDescription>
            </DialogHeader>
            {viewItem && (
              <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto">
                <div className="grid gap-1">
                  <Label className="text-muted-foreground">Item Name</Label>
                  <p className="text-sm font-medium">{viewItem.item_name}</p>
                </div>
                {viewItem.description && (
                  <div className="grid gap-1">
                    <Label className="text-muted-foreground">Description</Label>
                    <p className="text-sm">{viewItem.description}</p>
                  </div>
                )}
                <div className="grid gap-1">
                  <Label className="text-muted-foreground">Condition</Label>
                  <div>
                    <Badge variant="outline">{viewItem.condition}</Badge>
                  </div>
                </div>
                <div className="grid gap-1">
                  <Label className="text-muted-foreground">Category</Label>
                  <div>
                    <Badge variant="secondary">
                      {viewItem.category?.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
                <div className="grid gap-1">
                  <Label className="text-muted-foreground">District</Label>
                  <p className="text-sm">{viewItem.district}</p>
                </div>
                {viewItem.donor_name && (
                  <div className="grid gap-1">
                    <Label className="text-muted-foreground">Donor</Label>
                    <p className="text-sm">{viewItem.donor_name}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1">
                    <Label className="text-muted-foreground">Available</Label>
                    <button
                      type="button"
                      className="w-fit"
                      onClick={() => toggleViewField("is_available")}
                    >
                      <Badge variant={viewItem.is_available ? "default" : "outline"}>
                        {viewItem.is_available ? "Yes" : "No"}
                      </Badge>
                    </button>
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-muted-foreground">Hygiene Verified</Label>
                    <button
                      type="button"
                      className="w-fit"
                      onClick={() => toggleViewField("is_hygiene_verified")}
                    >
                      <Badge
                        variant={viewItem.is_hygiene_verified ? "default" : "outline"}
                      >
                        {viewItem.is_hygiene_verified ? "Verified" : "Unverified"}
                      </Badge>
                    </button>
                  </div>
                </div>
                {viewItem.images && viewItem.images.length > 0 && (
                  <div className="grid gap-1">
                    <Label className="text-muted-foreground">Images</Label>
                    <div className="flex flex-wrap gap-2">
                      {viewItem.images.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={`${viewItem.item_name} image ${i + 1}`}
                          className="h-24 w-24 rounded-md border object-cover"
                        />
                      ))}
                    </div>
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
