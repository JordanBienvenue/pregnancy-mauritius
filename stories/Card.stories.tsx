import type { Meta, StoryObj } from "@storybook/nextjs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Phone, BadgeCheck } from "lucide-react";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Card content area.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const ProviderCard: Story = {
  name: "Provider Card",
  render: () => (
    <Card className="max-w-sm group hover:shadow-lg hover:border-primary/30 transition-all">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold">Dr. Anisha Doorgakant</h3>
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Gynaecologist</p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Port Louis</span>
          <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> +230 213 4567</span>
        </div>
        <div className="mt-3 flex gap-2">
          <Badge variant="secondary" className="text-xs">15 years exp.</Badge>
          <Badge variant="secondary" className="text-xs">High-risk</Badge>
        </div>
      </CardContent>
    </Card>
  ),
};

export const FeatureCard: Story = {
  name: "Feature Card",
  render: () => (
    <Card className="max-w-xs group hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
          <Heart className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-semibold">Pregnancy Tracker</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Week-by-week tracking with Mauritius-specific content and local fruit comparisons.
        </p>
      </CardContent>
    </Card>
  ),
};

export const DonationCard: Story = {
  name: "Donation Card",
  render: () => (
    <Card className="max-w-xs">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="font-medium">Baby clothes 0-3 months</h3>
          <Badge className="bg-green-100 text-green-700 text-xs">Available</Badge>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">15 onesies, 5 pants, 3 hats. Mixed colours.</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> Port Louis
          </div>
          <Badge variant="outline" className="text-xs">Good condition</Badge>
        </div>
        <Button size="sm" className="mt-3 w-full">Request this item</Button>
      </CardContent>
    </Card>
  ),
};
