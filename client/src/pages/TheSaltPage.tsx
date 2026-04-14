import { Waves } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface SaltPost {
  id: number;
  title: string;
  date: string;
  preview: string;
  body: string;
  emoji: string;
  tag: string;
  visible: boolean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function TheSaltPage() {
  const { data: posts = [], isLoading } = useQuery<SaltPost[]>({
    queryKey: ["/api/salt-posts"],
    queryFn: () => fetch("/api/salt-posts").then(r => r.json()),
  });

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header banner */}
      <div className="px-4 py-4 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <div className="flex items-center gap-2 mb-1">
          <Waves className="w-5 h-5" style={{ color: "#1AAFCC" }} />
          <h1 className="font-extrabold text-lg text-white" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            The Salt
          </h1>
        </div>
        <p className="text-sm" style={{ color: "#1AAFCC" }}>
          Unfiltered local knowledge. No fluff, no tourist trap nonsense.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {isLoading && (
            <p className="text-sm text-muted-foreground text-center py-8">Loading...</p>
          )}
          {!isLoading && posts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No posts yet. Check back soon.</p>
          )}
          {posts.map(post => (
            <article
              key={post.id}
              data-testid={`salt-post-${post.id}`}
              className="bg-card border border-card-border rounded-xl overflow-hidden"
            >
              <div className="px-4 pt-4 pb-3 border-b border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{post.emoji}</span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: "hsl(192 78% 90%)", color: "hsl(192 60% 22%)" }}
                  >
                    {post.tag}
                  </span>
                </div>
                <h2 className="font-bold text-base text-foreground leading-tight mb-1">
                  {post.title}
                </h2>
                <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
              </div>
              <div className="px-4 py-3 space-y-3">
                {post.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm text-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-border bg-muted/30">
                <p className="text-xs text-muted-foreground italic">
                  — Your local salty guide · <span style={{ color: "#1AAFCC" }}>saltystkitts.com</span>
                </p>
              </div>
            </article>
          ))}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
