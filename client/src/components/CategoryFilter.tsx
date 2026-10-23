import type { Category } from "../pages/TourApp";
import { usePageContent } from "@/lib/pageContent";

const CATEGORIES: { value: Category; emoji: string }[] = [
  { value: "all",            emoji: "🌴" },
  { value: "beach",          emoji: "🏖️" },
  { value: "historical",     emoji: "🏛️" },
  { value: "nature",         emoji: "🌿" },
  { value: "loot",           emoji: "🥑" },
  { value: "food_nightlife", emoji: "🍹" },
  { value: "the_salt",       emoji: "🧂" },
];

interface Props {
  category: Category;
  onChange: (c: Category) => void;
}

export function CategoryFilter({ category, onChange }: Props) {
  const w = usePageContent("wording");
  return (
    <div
      className="flex gap-1.5 px-3 py-2 border-b border-border bg-background overflow-x-auto shrink-0 scrollbar-none"
      style={{ scrollbarWidth: "none" }}
      data-testid="category-filter"
    >
      {CATEGORIES.map(cat => {
        const label = (w.category_bar as any)[cat.value] || cat.value;
        const active = category === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            data-testid={`filter-${cat.value}`}
            className={`
              flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold whitespace-nowrap
              transition-all duration-150 border flex-shrink-0
              ${active
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-card-border hover:text-foreground hover:border-border hover:bg-secondary"
              }
            `}
          >
            <span className="text-base leading-none" aria-hidden>{cat.emoji}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
