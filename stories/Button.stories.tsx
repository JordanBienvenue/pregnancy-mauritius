import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Phone, Download, Loader2 } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button" },
};

export const Outline: Story = {
  args: { children: "Outline", variant: "outline" },
};

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "Ghost", variant: "ghost" },
};

export const Destructive: Story = {
  args: { children: "Destructive", variant: "destructive" },
};

export const Link: Story = {
  args: { children: "Link Button", variant: "link" },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button>
        <Heart className="mr-2 h-4 w-4" /> Favorite
      </Button>
      <Button variant="outline">
        <Phone className="mr-2 h-4 w-4" /> Call Now
      </Button>
      <Button variant="secondary">
        Download <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon-xs"><Heart className="h-3 w-3" /></Button>
      <Button size="icon-sm"><Heart className="h-3.5 w-3.5" /></Button>
      <Button size="icon"><Heart className="h-4 w-4" /></Button>
      <Button size="icon-lg"><Heart className="h-5 w-5" /></Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
    </Button>
  ),
};

export const BrandPrimary: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button className="bg-primary hover:bg-brand-pink-dark">
        <Heart className="mr-2 h-4 w-4" /> Start your journey
      </Button>
      <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
        Learn more <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  ),
};
