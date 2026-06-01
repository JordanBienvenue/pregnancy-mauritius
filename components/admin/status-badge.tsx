"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  inactive: "bg-gray-100 text-gray-600 border-gray-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  flagged: "bg-red-100 text-red-700 border-red-200",
  resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  dismissed: "bg-gray-100 text-gray-600 border-gray-200",
  published: "bg-emerald-100 text-emerald-700 border-emerald-200",
  draft: "bg-amber-100 text-amber-700 border-amber-200",
  verified: "bg-emerald-100 text-emerald-700 border-emerald-200",
  unverified: "bg-gray-100 text-gray-600 border-gray-200",
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const style = statusStyles[status.toLowerCase()] ?? statusStyles.inactive;
  return (
    <Badge variant="outline" className={cn("text-xs capitalize", style, className)}>
      {status}
    </Badge>
  );
}
