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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2, ShoppingBag, Pencil, Plus } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { RequireRole } from "@/components/admin/require-role";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { useAdmin } from "@/components/admin/admin-context";

type MarketplaceItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  seller_name: string;
  is_available: boolean;
};

const emptyForm = {
  name: "",
  description: "",
  price: 0,
  category: "",
  image_url: "",
  seller_name: "",
  is_available: true,
};

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<MarketplaceItem | null>(null);
  const [createMode, setCreateMode] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { role } = useAdmin();

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/marketplace");
      if (res.ok) setItems(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function openEdit(item: MarketplaceItem) {
    setEditItem(item);
    setForm({
      name: item.name,
      description: item.description ?? "",
      price: item.price,
      category: item.category,
      image_url: item.image_url ?? "",
      seller_name: item.seller_name ?? "",
      is_available: item.is_available,
    });
  }

  function openCreate() {
    setEditItem(null);
    setCreateMode(true);
    setForm(emptyForm);
  }

  async function handleSave() {
    setSaving(true);
    if (createMode) {
      await fetch("/api/admin/marketplace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setCreateMode(false);
    } else if (editItem) {
      await fetch(`/api/admin/marketplace/${editItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditItem(null);
    }
    setSaving(false);
    fetchItems();
  }

  async function toggleAvailable(id: string, current: boolean) {
    await fetch(`/api/admin/marketplace/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_available: !current }),
    });
    fetchItems();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/marketplace/${id}`, { method: "DELETE" });
    fetchItems();
  }

  const columns: ColumnDef<MarketplaceItem>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <button
          className="font-medium text-left hover:text-primary hover:underline transition-colors"
          onClick={() => openEdit(row.original)}
        >
          {row.original.name}
        </button>
      ),
    },
    {
      accessorKey: "price",
      header: "Price (Rs)",
      cell: ({ row }) => `Rs ${row.original.price?.toLocaleString() ?? 0}`,
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
      accessorKey: "seller_name",
      header: "Seller",
    },
    {
      accessorKey: "is_available",
      header: "Available",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() =>
            toggleAvailable(row.original.id, row.original.is_available)
          }
        >
          <Badge variant={row.original.is_available ? "default" : "outline"}>
            {row.original.is_available ? "Yes" : "No"}
          </Badge>
        </button>
      ),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => openEdit(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <ConfirmDialog
            title="Delete item?"
            description="This will permanently remove this marketplace listing."
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
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Marketplace</h1>
              <p className="text-sm text-muted-foreground">
                Manage marketplace items and listings
              </p>
            </div>
          </div>
          <Button onClick={openCreate}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add Item
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="No items"
            description="There are no marketplace listings yet."
          />
        ) : (
          <DataTable
            columns={columns}
            data={items}
            searchKey="name"
            searchPlaceholder="Search items..."
          />
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editItem || createMode} onOpenChange={(open) => { if (!open) { setEditItem(null); setCreateMode(false); } }}>
          <DialogContent className="sm:max-w-lg">
            <DialogTitle>{createMode ? "Add Item" : "Edit Item"}</DialogTitle>
            <DialogDescription>{createMode ? "Create a new marketplace listing." : "Update marketplace listing details."}</DialogDescription>
            <div className="mt-4 space-y-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Price (Rs)</Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Input
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Seller</Label>
                  <Input
                    value={form.seller_name}
                    onChange={(e) =>
                      setForm({ ...form, seller_name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Image URL</Label>
                  <Input
                    value={form.image_url}
                    onChange={(e) =>
                      setForm({ ...form, image_url: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setForm({ ...form, is_available: !form.is_available })
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    form.is_available ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      form.is_available ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <Label>Available</Label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setEditItem(null); setCreateMode(false); }}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={saving || !form.name || !form.seller_name}>
                  {saving ? "Saving..." : createMode ? "Create Item" : "Save Changes"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </RequireRole>
  );
}
