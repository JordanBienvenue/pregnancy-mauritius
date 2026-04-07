import type { Meta, StoryObj } from "@storybook/nextjs";
import { SponsorBanner, SponsorStrip } from "@/components/shared/sponsor-banner";

const meta: Meta<typeof SponsorBanner> = {
  title: "Ads/SponsorBanner",
  component: SponsorBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    category: {
      control: "select",
      options: ["pharmacy", "clinic", "baby_shop", "insurance", "general"],
    },
    variant: {
      control: "select",
      options: ["card", "inline", "minimal"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof SponsorBanner>;

export const CardVariant: Story = {
  args: { category: "pharmacy", variant: "card" },
  parameters: { layout: "padded" },
};

export const InlineVariant: Story = {
  args: { category: "clinic", variant: "inline" },
};

export const MinimalVariant: Story = {
  args: { category: "baby_shop", variant: "minimal" },
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
};

export const InsuranceSponsor: Story = {
  args: { category: "insurance", variant: "card" },
};

export const AllVariants: Story = {
  name: "All Variants Side by Side",
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Card (Premium / Standard)</h3>
        <SponsorBanner category="pharmacy" variant="card" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Inline (Sidebar)</h3>
        <SponsorBanner category="clinic" variant="inline" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Minimal (Banner)</h3>
        <SponsorBanner category="baby_shop" variant="minimal" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Partner Strip</h3>
        <SponsorStrip />
      </div>
    </div>
  ),
};

export const PartnerStrip: Story = {
  render: () => <SponsorStrip className="max-w-md" />,
};
