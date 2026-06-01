"use client";

import { useState, useEffect, useCallback } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, FileText } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/admin/data-table";
import { RequireRole } from "@/components/admin/require-role";
import { StatusBadge } from "@/components/admin/status-badge";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { useAdmin } from "@/components/admin/admin-context";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useAdmin();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function togglePublished(id: string, current: boolean) {
    await fetch(`/api/admin/blog/${id}/publish`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !current }),
    });
    fetchPosts();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "--";
    return new Date(dateStr).toLocaleDateString();
  }

  const columns: ColumnDef<BlogPost>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-medium max-w-[250px] truncate block">
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">{row.original.slug}</span>
      ),
    },
    {
      accessorKey: "author",
      header: "Author",
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
      accessorKey: "is_published",
      header: "Published",
      cell: ({ row }) => (
        <StatusBadge
          status={row.original.is_published ? "published" : "draft"}
        />
      ),
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.published_at || row.original.created_at),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          {role === "admin" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => togglePublished(row.original.id, row.original.is_published)}
            >
              {row.original.is_published ? "Unpublish" : "Publish"}
            </Button>
          )}
          <Link href={`/admin/blog/${row.original.id}/edit`}>
            <Button variant="ghost" size="icon-sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          {role === "admin" && (
            <ConfirmDialog
              title="Delete blog post?"
              description="This will permanently remove this blog post. This action cannot be undone."
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
    <RequireRole minimum="editor">
      <div className="p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Blog Posts</h1>
            <p className="mt-1 text-muted-foreground">
              Manage articles and content
            </p>
          </div>
          <Link href="/admin/blog/new">
            <Button>
              <Plus className="mr-1.5 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              </div>
            ) : posts.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No blog posts"
                description="Create your first blog post to get started."
                actionLabel="New Post"
                onAction={() => {
                  window.location.href = "/admin/blog/new";
                }}
              />
            ) : (
              <DataTable
                columns={columns}
                data={posts}
                searchKey="title"
                searchPlaceholder="Search posts..."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </RequireRole>
  );
}
