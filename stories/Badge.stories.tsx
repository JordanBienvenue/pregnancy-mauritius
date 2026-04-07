import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "@/components/ui/badge";
import { Heart, BadgeCheck, AlertTriangle } from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Badge" },
};

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
};

export const Outline: Story = {
  args: { children: "Outline", variant: "outline" },
};

export const Destructive: Story = {
  args: { children: "Destructive", variant: "destructive" },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Badge><Heart className="mr-1 h-3 w-3" /> Favorite</Badge>
      <Badge variant="secondary"><BadgeCheck className="mr-1 h-3 w-3" /> Verified</Badge>
      <Badge variant="destructive"><AlertTriangle className="mr-1 h-3 w-3" /> Urgent</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  name: "Status Badges (App-specific)",
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Badge className="bg-green-100 text-green-700">Safe</Badge>
      <Badge className="bg-amber-100 text-amber-700">Caution</Badge>
      <Badge className="bg-red-100 text-red-700">Avoid</Badge>
      <Badge className="bg-blue-100 text-blue-700">Verified</Badge>
      <Badge className="bg-purple-100 text-purple-700">Premium</Badge>
    </div>
  ),
};

export const ConditionBadges: Story = {
  name: "Condition Badges (Donations)",
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Badge className="bg-emerald-100 text-emerald-700">New</Badge>
      <Badge className="bg-teal-100 text-teal-700">Like new</Badge>
      <Badge className="bg-sky-100 text-sky-700">Good</Badge>
      <Badge className="bg-slate-100 text-slate-700">Fair</Badge>
    </div>
  ),
};

export const ProviderTypes: Story = {
  name: "Provider Type Badges",
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50">Gynaecologist</Badge>
      <Badge variant="outline" className="border-pink-200 text-pink-700 bg-pink-50">Midwife</Badge>
      <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">Counsellor</Badge>
      <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">Photographer</Badge>
      <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">Lactation</Badge>
      <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">Massage</Badge>
    </div>
  ),
};

export const AdLabel: Story = {
  name: "Ad/Sponsored Labels",
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground">Ad</Badge>
      <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground">Sponsored</Badge>
      <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground">Official Partner</Badge>
      <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground">Featured</Badge>
    </div>
  ),
};
