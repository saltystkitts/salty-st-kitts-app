import type { Category } from "../pages/TourApp";
import { Landmark, TreePine, UtensilsCrossed, Waves, Car, LayoutGrid, ShoppingBag } from "lucide-react";

const CATEGORIES: { value: Category; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "all", label: "All", icon: LayoutGrid },
  { value: "historical", label: "History", icon: Landmark },
  { value: "nature", label: "The Bush", icon: TreePine },
  { value: "food_nightlife", label: "Lime & Dine", icon: UtensilsCrossed },
  { value: "beach", label: "Beaches", icon: Waves },
  { value: "scenic_drive", label: "Drives", icon: Car },
  { value: "loot", label: "Loot", icon: ShoppingBag },
];

interface Props {
  category: Category;
  onChange: (c: Category) => void;
}

export function CategoryFilter({ category, onChange }: Props) {
  return (
    <div
      className="flex gap-1.5 px-3 py-2 border-b border-border bg-background overflow-x-auto shrink-0 scrollbar-none"
      style={{ scrollbarWidth: "none" }}
      data-testid="category-filter"
    >
      {CATEGORIES.map(cat => {
        const Icon = cat.icon;
        const active = category === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            data-testid={`filter-${cat.value}`}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
              transition-all duration-150 border flex-shrink-0
              ${active
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-card-border hover:text-foreground hover:border-border hover:bg-secondary"
              }
            `}
          >
            <Icon className="w-3.5 h-3.5" />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
