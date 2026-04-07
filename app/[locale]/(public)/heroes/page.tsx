"use client";

import {
  HeroSplit,
  HeroVisual,
  HeroCards,
  HeroTestimonial,
  HeroMinimal,
} from "@/components/heroes/hero-variants";
import { Separator } from "@/components/ui/separator";

const variants = [
  {
    id: 1,
    label: 'Variant 1: Split',
    description: 'Image + Text side by side with floating icons and staggered entrance animations',
    Component: HeroSplit,
  },
  {
    id: 2,
    label: 'Variant 2: Visual',
    description: 'Full-width visual background with glassmorphism, animated counters, and floating hearts',
    Component: HeroVisual,
  },
  {
    id: 3,
    label: 'Variant 3: Cards',
    description: 'Interactive feature preview cards that show mini-demos on hover',
    Component: HeroCards,
  },
  {
    id: 4,
    label: 'Variant 4: Testimonial',
    description: 'Social proof focused with a rotating testimonial carousel from Mauritian mothers',
    Component: HeroTestimonial,
  },
  {
    id: 5,
    label: 'Variant 5: Minimal',
    description: 'Clean, zen aesthetic with cycling word animation and sparse floating hearts',
    Component: HeroMinimal,
  },
];

export default function HeroShowcasePage() {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <h1 className="text-lg font-bold tracking-tight">
            Hero Section Variants
          </h1>
          <p className="text-sm text-muted-foreground">
            Review all 5 hero variants below. Each section is separated by a label.
          </p>
        </div>
      </div>

      {/* Quick nav */}
      <div className="sticky top-[73px] z-40 border-b bg-background/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex gap-1 overflow-x-auto py-2 -mx-1">
            {variants.map((v) => (
              <a
                key={v.id}
                href={`#variant-${v.id}`}
                className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {v.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Variants */}
      {variants.map((v, i) => (
        <div key={v.id} id={`variant-${v.id}`}>
          {/* Section label */}
          <div className="border-y bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {v.id}
                </span>
                <div>
                  <h2 className="text-base font-semibold">{v.label}</h2>
                  <p className="text-sm text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero component */}
          <v.Component />

          {/* Separator between variants (not after last) */}
          {i < variants.length - 1 && (
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <Separator className="my-0" />
            </div>
          )}
        </div>
      ))}

      {/* Footer spacer */}
      <div className="h-20" />
    </div>
  );
}
