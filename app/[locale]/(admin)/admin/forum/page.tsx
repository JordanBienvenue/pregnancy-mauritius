"use client";

import { useState, useEffect, useCallback } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2, Pin, Shield, Flag, MessageSquare } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/admin/data-table";
import { RequireRole } from "@/components/admin/require-role";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { useAdmin } from "@/components/admin/admin-context";

type ForumPost = {
  id: string;
  title: string;
  content?: string;
  category: string;
  author_name: string;
  is_pinned: boolean;
  is_moderated: boolean;
  reply_count: number;
  created_at: string;
};

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [viewPost, setViewPost] = useState<ForumPost | null>(null);
  const { role } = useAdmin();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const filter = activeTab === "all" ? "" : `?filter=${activeTab}`;
      const res = await fetch(`/api/admin/forum/posts${filter}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function toggleField(id: string, field: "is_pinned" | "is_moderated", value: boolean) {
    await fetch(`/api/admin/forum/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !value }),
    });
    fetchPosts();
    if (viewPost && viewPost.id === id) {
      setViewPost((prev) => prev ? { ...prev, [field]: !value } : null);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/forum/posts/${id}`, { method: "DELETE" });
    setViewPost(null);
    fetchPosts();
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString();
  }

  const columns: ColumnDef<ForumPost>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <button
          type="button"
          className="font-medium max-w-[200px] truncate block text-left hover:underline"
          onClick={() => setViewPost(row.original)}
        >
          {row.original.title}
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
      accessorKey: "author_name",
      header: "Author",
      cell: ({ row }) => row.original.author_name || "Anonymous",
    },
    {
      accessorKey: "reply_count",
      header: "Replies",
      cell: ({ row }) => row.original.reply_count ?? 0,
    },
    {
      accessorKey: "is_pinned",
      header: "Pinned",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => toggleField(row.original.id, "is_pinned", row.original.is_pinned)}
        >
          <Badge variant={row.original.is_pinned ? "default" : "outline"}>
            <Pin className="mr-1 h-3 w-3" />
            {row.original.is_pinned ? "Yes" : "No"}
          </Badge>
        </button>
      ),
    },
    {
      accessorKey: "is_moderated",
      header: "Moderated",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => toggleField(row.original.id, "is_moderated", row.original.is_moderated)}
        >
          <Badge variant={row.original.is_moderated ? "default" : "destructive"}>
            <Shield className="mr-1 h-3 w-3" />
            {row.original.is_moderated ? "Yes" : "No"}
          </Badge>
        </button>
      ),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <ConfirmDialog
            title="Delete post?"
            description="This will permanently remove this forum post and all its replies. This action cannot be undone."
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
            <h1 className="text-3xl font-bold">Forum Management</h1>
            <p className="mt-1 text-muted-foreground">
              Moderate forum posts and review reports
            </p>
          </div>
          <Link href="/admin/forum/reports">
            <Button variant="outline">
              <Flag className="mr-1.5 h-4 w-4" />
              Reports
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="reported">Reported</TabsTrigger>
            <TabsTrigger value="moderated">Moderated</TabsTrigger>
            <TabsTrigger value="pinned">Pinned</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <Card className="mt-4">
              <CardContent className="p-4">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                  </div>
                ) : posts.length === 0 ? (
                  <EmptyState
                    icon={MessageSquare}
                    title="No posts found"
                    description="No forum posts match the current filter."
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
          </TabsContent>
        </Tabs>

        <Dialog open={!!viewPost} onOpenChange={(open) => !open && setViewPost(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogTitle>Post Details</DialogTitle>
            <DialogDescription>
              Full details for this forum post.
            </DialogDescription>
            {viewPost && (
              <div className="grid gap-3 text-sm">
                <div className="grid grid-cols-[100px_1fr] gap-1">
                  <span className="text-muted-foreground">Title</span>
                  <span className="font-medium">{viewPost.title}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-1">
                  <span className="text-muted-foreground">Content</span>
                  <span className="whitespace-pre-wrap">{viewPost.content || "--"}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-1">
                  <span className="text-muted-foreground">Author</span>
                  <span>{viewPost.author_name || "Anonymous"}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-1">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="secondary" className="w-fit">
                    {viewPost.category?.replace(/_/g, " ")}
                  </Badge>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-1">
                  <span className="text-muted-foreground">Replies</span>
                  <span>{viewPost.reply_count ?? 0}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-1">
                  <span className="text-muted-foreground">Created</span>
                  <span>{formatDate(viewPost.created_at)}</span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => toggleField(viewPost.id, "is_pinned", viewPost.is_pinned)}
                  >
                    <Badge variant={viewPost.is_pinned ? "default" : "outline"}>
                      <Pin className="mr-1 h-3 w-3" />
                      {viewPost.is_pinned ? "Pinned" : "Not Pinned"}
                    </Badge>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleField(viewPost.id, "is_moderated", viewPost.is_moderated)}
                  >
                    <Badge variant={viewPost.is_moderated ? "default" : "destructive"}>
                      <Shield className="mr-1 h-3 w-3" />
                      {viewPost.is_moderated ? "Moderated" : "Not Moderated"}
                    </Badge>
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </RequireRole>
  );
}
