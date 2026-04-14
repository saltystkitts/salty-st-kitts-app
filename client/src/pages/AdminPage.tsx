import { useState, useEffect } from "react";
import { Lock, LogOut, MapPin, Waves, Eye, EyeOff, Pencil, Trash2, Plus, Check, X } from "lucide-react";

const ADMIN_PASSWORD = "salty2026";

const PARKING_OPTS = [{value:"",label:"— Parking —"},{value:"easy",label:"Easy Parking"},{value:"limited",label:"Limited"},{value:"street",label:"Street Only"},{value:"none",label:"No Parking"}];
const SMOKING_OPTS = [{value:"",label:"— Smoking —"},{value:"cigarettes",label:"🚬 Cigarettes OK"},{value:"weed",label:"🌿 420 Friendly"},{value:"both",label:"🌿🚬 Both"},{value:"outside",label:"Outside Only"},{value:"no",label:"No Smoking"}];
const KIDS_OPTS = [{value:"",label:"— Kids —"},{value:"yes",label:"👶 Kid Friendly"},{value:"no",label:"Adults Only"},{value:"depends",label:"Kids OK (early)"}];
const WIFI_OPTS = [{value:"",label:"— WiFi —"},{value:"free",label:"📶 Free WiFi"},{value:"ask",label:"WiFi (ask)"},{value:"no",label:"No WiFi"}];
const PAYMENT_OPTS = [{value:"",label:"— Payment —"},{value:"cash",label:"💵 Cash Only"},{value:"card",label:"💳 Card OK"},{value:"both",label:"💵💳 Both"}];
const DRESS_OPTS = [{value:"",label:"— Dress Code —"},{value:"anything",label:"👕 Anything Goes"},{value:"beach",label:"🩱 Beach Casual"},{value:"smart",label:"👔 Smart Casual"}];
const TIME_OPTS = [{value:"",label:"— Best Time —"},{value:"morning",label:"🌅 Morning"},{value:"afternoon",label:"☀️ Afternoon"},{value:"evening",label:"🌆 Evening"},{value:"latenight",label:"🌙 Late Night"}];
const VIBE_OPTS = [{value:"",label:"— Vibe —"},{value:"chill",label:"😎 Chill"},{value:"lively",label:"🔥 Lively"},{value:"local",label:"🏝️ Local Crowd"},{value:"mixed",label:"🌍 Mixed"},{value:"tourist",label:"📸 Tourist Spot"}];

const CATEGORIES = [
  { value: "historical", label: "History & Culture" },
  { value: "nature", label: "The Bush" },
  { value: "food_nightlife", label: "Lime & Dine" },
  { value: "beach", label: "Beaches" },
  { value: "scenic_drive", label: "Drives" },
  { value: "loot", label: "Loot" },
];

function authHeaders() {
  return { "Content-Type": "application/json", "x-admin-password": ADMIN_PASSWORD };
}

// ─── Login Screen ────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      onLogin();
    } else {
      setError("Wrong password. Try again.");
      setPw("");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#1C3B5A" }}>
            <Lock className="w-5 h-5" style={{ color: "#1AAFCC" }} />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-foreground">Salty Admin</h1>
            <p className="text-xs text-muted-foreground">Staff only</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2"
            style={{ "--tw-ring-color": "#1AAFCC" } as any}
            autoFocus
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: "#1AAFCC" }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Stop Row ────────────────────────────────────────────
function StopRow({ stop, onUpdate, onDelete }: { stop: any; onUpdate: () => void; onDelete: () => void }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ parking:"", smoking:"", kidsOk:"", wifi:"", payment:"", dresscode:"", bestTime:"", vibe:"", ...stop });
  const [saving, setSaving] = useState(false);

  async function toggleVisible() {
    await fetch(`/api/admin/stops/${stop.id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ ...stop, visible: !stop.visible }),
    });
    onUpdate();
  }

  async function saveEdit() {
    setSaving(true);
    await fetch(`/api/admin/stops/${stop.id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(form),
    });
    setSaving(false);
    setEditing(false);
    onUpdate();
  }

  async function handleDelete() {
    if (!confirm(`Delete "${stop.name}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/stops/${stop.id}`, { method: "DELETE", headers: authHeaders() });
    onDelete();
  }

  if (editing) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <input
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />
        <select
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        >
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <input
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
          value={form.area}
          onChange={e => setForm({ ...form, area: e.target.value })}
          placeholder="Area / location"
        />
        <input
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
          value={form.duration}
          onChange={e => setForm({ ...form, duration: e.target.value })}
          placeholder="Duration"
        />
        <textarea
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground resize-none"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
        />
        <textarea
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground resize-none"
          value={form.tip}
          onChange={e => setForm({ ...form, tip: e.target.value })}
          placeholder="Salty's tip"
        />
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            type="number"
            step="0.00001"
            value={form.lat}
            onChange={e => setForm({ ...form, lat: parseFloat(e.target.value) })}
            placeholder="Latitude"
          />
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            type="number"
            step="0.00001"
            value={form.lng}
            onChange={e => setForm({ ...form, lng: parseFloat(e.target.value) })}
            placeholder="Longitude"
          />
        </div>
        {/* Intel attributes */}
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide pt-1">The Intel</p>
        <div className="grid grid-cols-2 gap-2">
          {[PARKING_OPTS, SMOKING_OPTS, KIDS_OPTS, WIFI_OPTS, PAYMENT_OPTS, DRESS_OPTS, TIME_OPTS, VIBE_OPTS].map((opts, i) => {
            const keys = ["parking","smoking","kidsOk","wifi","payment","dresscode","bestTime","vibe"] as const;
            const key = keys[i];
            return (
              <select key={key} className="px-2 py-2 rounded-lg border border-border bg-background text-xs text-foreground" value={(form as any)[key] ?? ""} onChange={e => setForm({ ...form, [key]: e.target.value })}>
                {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            );
          })}
        </div>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
          Featured stop (shows star)
        </label>
        <div className="flex gap-2">
          <button
            onClick={saveEdit}
            disabled={saving}
            className="flex-1 py-2 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-1"
            style={{ background: "#1AAFCC" }}
          >
            <Check className="w-4 h-4" /> {saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="flex-1 py-2 rounded-lg text-sm font-bold border border-border text-foreground flex items-center justify-center gap-1"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-xl px-4 py-3 flex items-start gap-3 ${!stop.visible ? "opacity-50" : ""}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm text-foreground truncate">{stop.name}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide"
            style={{ background: "hsl(192 78% 90%)", color: "hsl(192 60% 22%)" }}>
            {CATEGORIES.find(c => c.value === stop.category)?.label ?? stop.category}
          </span>
          {stop.featured && <span className="text-yellow-400 text-xs">★ Featured</span>}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{stop.area}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={toggleVisible} className="p-1.5 rounded-lg hover:bg-muted" title={stop.visible ? "Hide" : "Show"}>
          {stop.visible ? <Eye className="w-4 h-4 text-muted-foreground" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
        </button>
        <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-muted" title="Edit">
          <Pencil className="w-4 h-4 text-muted-foreground" />
        </button>
        <button onClick={handleDelete} className="p-1.5 rounded-lg hover:bg-muted" title="Delete">
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </div>
  );
}

// ─── Salt Post Row ───────────────────────────────────────
function PostRow({ post, onUpdate, onDelete }: { post: any; onUpdate: () => void; onDelete: () => void }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...post });
  const [saving, setSaving] = useState(false);

  async function toggleVisible() {
    await fetch(`/api/admin/salt-posts/${post.id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ ...post, visible: !post.visible }),
    });
    onUpdate();
  }

  async function saveEdit() {
    setSaving(true);
    await fetch(`/api/admin/salt-posts/${post.id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(form),
    });
    setSaving(false);
    setEditing(false);
    onUpdate();
  }

  async function handleDelete() {
    if (!confirm(`Delete "${post.title}"?`)) return;
    await fetch(`/api/admin/salt-posts/${post.id}`, { method: "DELETE", headers: authHeaders() });
    onDelete();
  }

  if (editing) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <input
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
        />
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            value={form.emoji}
            onChange={e => setForm({ ...form, emoji: e.target.value })}
            placeholder="Emoji"
            maxLength={2}
          />
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            value={form.tag}
            onChange={e => setForm({ ...form, tag: e.target.value })}
            placeholder="Tag"
          />
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <textarea
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground resize-none"
          value={form.preview}
          onChange={e => setForm({ ...form, preview: e.target.value })}
          placeholder="Preview text (first paragraph shown in list)"
        />
        <textarea
          rows={8}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground resize-none"
          value={form.body}
          onChange={e => setForm({ ...form, body: e.target.value })}
          placeholder="Full post body (use blank lines between paragraphs)"
        />
        <div className="flex gap-2">
          <button
            onClick={saveEdit}
            disabled={saving}
            className="flex-1 py-2 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-1"
            style={{ background: "#1AAFCC" }}
          >
            <Check className="w-4 h-4" /> {saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="flex-1 py-2 rounded-lg text-sm font-bold border border-border text-foreground flex items-center justify-center gap-1"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-xl px-4 py-3 flex items-start gap-3 ${!post.visible ? "opacity-50" : ""}`}>
      <span className="text-xl shrink-0">{post.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground">{post.title}</p>
        <p className="text-xs text-muted-foreground">{post.tag} · {post.date}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={toggleVisible} className="p-1.5 rounded-lg hover:bg-muted">
          {post.visible ? <Eye className="w-4 h-4 text-muted-foreground" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
        </button>
        <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-muted">
          <Pencil className="w-4 h-4 text-muted-foreground" />
        </button>
        <button onClick={handleDelete} className="p-1.5 rounded-lg hover:bg-muted">
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </div>
  );
}

// ─── New Stop Form ───────────────────────────────────────
function NewStopForm({ onSaved, onCancel }: { onSaved: () => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    name: "", category: "food_nightlife", area: "", duration: "",
    description: "", tip: "", lat: 17.2948, lng: -62.7261, featured: false, visible: true,
    parking: "", smoking: "", kidsOk: "", wifi: "", payment: "", dresscode: "", bestTime: "", vibe: "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!form.name || !form.description || !form.tip) return alert("Name, description, and tip are required.");
    setSaving(true);
    await fetch("/api/admin/stops", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(form),
    });
    setSaving(false);
    onSaved();
  }

  return (
    <div className="bg-card border-2 rounded-xl p-4 space-y-3" style={{ borderColor: "#1AAFCC" }}>
      <p className="font-bold text-sm text-foreground">New Stop</p>
      <input className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
      <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
        {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
      </select>
      <input className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} placeholder="Area / location" />
      <input className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="Duration (e.g. 1–2 hours)" />
      <textarea rows={4} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground resize-none" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" />
      <textarea rows={2} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground resize-none" value={form.tip} onChange={e => setForm({ ...form, tip: e.target.value })} placeholder="Salty's tip" />
      <div className="flex gap-2">
        <input className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground" type="number" step="0.00001" value={form.lat} onChange={e => setForm({ ...form, lat: parseFloat(e.target.value) })} placeholder="Latitude" />
        <input className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground" type="number" step="0.00001" value={form.lng} onChange={e => setForm({ ...form, lng: parseFloat(e.target.value) })} placeholder="Longitude" />
      </div>
      {/* Intel attributes */}
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide pt-1">The Intel</p>
      <div className="grid grid-cols-2 gap-2">
        {[PARKING_OPTS, SMOKING_OPTS, KIDS_OPTS, WIFI_OPTS, PAYMENT_OPTS, DRESS_OPTS, TIME_OPTS, VIBE_OPTS].map((opts, i) => {
          const keys = ["parking","smoking","kidsOk","wifi","payment","dresscode","bestTime","vibe"] as const;
          const key = keys[i];
          return (
            <select key={key} className="px-2 py-2 rounded-lg border border-border bg-background text-xs text-foreground" value={(form as any)[key] ?? ""} onChange={e => setForm({ ...form, [key]: e.target.value })}>
              {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          );
        })}
      </div>
      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
        Featured stop
      </label>
      <div className="flex gap-2">
        <button onClick={handleSave} disabled={saving} className="flex-1 py-2 rounded-lg text-sm font-bold text-white" style={{ background: "#1AAFCC" }}>
          {saving ? "Saving…" : "Add Stop"}
        </button>
        <button onClick={onCancel} className="flex-1 py-2 rounded-lg text-sm font-bold border border-border text-foreground">Cancel</button>
      </div>
    </div>
  );
}

// ─── New Post Form ───────────────────────────────────────
function NewPostForm({ onSaved, onCancel }: { onSaved: () => void; onCancel: () => void }) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({ title: "", date: today, preview: "", body: "", emoji: "🌊", tag: "Local Tips", visible: true });
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!form.title || !form.body) return alert("Title and body are required.");
    setSaving(true);
    await fetch("/api/admin/salt-posts", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(form),
    });
    setSaving(false);
    onSaved();
  }

  return (
    <div className="bg-card border-2 rounded-xl p-4 space-y-3" style={{ borderColor: "#1AAFCC" }}>
      <p className="font-bold text-sm text-foreground">New Salt Post</p>
      <input className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" />
      <div className="flex gap-2">
        <input className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground" value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} placeholder="Emoji" maxLength={2} />
        <input className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} placeholder="Tag" />
        <input className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      </div>
      <textarea rows={2} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground resize-none" value={form.preview} onChange={e => setForm({ ...form, preview: e.target.value })} placeholder="Preview text" />
      <textarea rows={8} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground resize-none" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} placeholder="Full post body (blank lines = new paragraph)" />
      <div className="flex gap-2">
        <button onClick={handleSave} disabled={saving} className="flex-1 py-2 rounded-lg text-sm font-bold text-white" style={{ background: "#1AAFCC" }}>
          {saving ? "Saving…" : "Publish Post"}
        </button>
        <button onClick={onCancel} className="flex-1 py-2 rounded-lg text-sm font-bold border border-border text-foreground">Cancel</button>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState<"stops" | "salt">("stops");
  const [stops, setStops] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [addingStop, setAddingStop] = useState(false);
  const [addingPost, setAddingPost] = useState(false);
  const [filterCat, setFilterCat] = useState("all");

  async function loadStops() {
    const res = await fetch("/api/admin/stops", { headers: authHeaders() });
    setStops(await res.json());
  }

  async function loadPosts() {
    const res = await fetch("/api/admin/salt-posts", { headers: authHeaders() });
    setPosts(await res.json());
  }

  useEffect(() => {
    if (authed) { loadStops(); loadPosts(); }
  }, [authed]);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const filteredStops = filterCat === "all" ? stops : stops.filter(s => s.category === filterCat);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border shrink-0 flex items-center justify-between" style={{ background: "#1C3B5A" }}>
        <div>
          <h1 className="font-extrabold text-base text-white">Salty Admin</h1>
          <p className="text-xs" style={{ color: "#1AAFCC" }}>saltystkitts.com</p>
        </div>
        <button onClick={() => setAuthed(false)} className="flex items-center gap-1 text-xs text-white/60 hover:text-white">
          <LogOut className="w-4 h-4" /> Log out
        </button>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-border shrink-0">
        <button
          onClick={() => setSection("stops")}
          className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-1.5 transition-colors ${section === "stops" ? "border-b-2 text-foreground" : "text-muted-foreground"}`}
          style={{ borderColor: section === "stops" ? "#1AAFCC" : "transparent" }}
        >
          <MapPin className="w-4 h-4" /> Map Stops ({stops.length})
        </button>
        <button
          onClick={() => setSection("salt")}
          className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-1.5 transition-colors ${section === "salt" ? "border-b-2 text-foreground" : "text-muted-foreground"}`}
          style={{ borderColor: section === "salt" ? "#1AAFCC" : "transparent" }}
        >
          <Waves className="w-4 h-4" /> The Salt ({posts.length})
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* ── STOPS SECTION ── */}
        {section === "stops" && (
          <div className="p-4 space-y-3">
            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[{ value: "all", label: "All" }, ...CATEGORIES].map(c => (
                <button
                  key={c.value}
                  onClick={() => setFilterCat(c.value)}
                  className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors"
                  style={{
                    background: filterCat === c.value ? "#1AAFCC" : "transparent",
                    color: filterCat === c.value ? "white" : "var(--muted-foreground)",
                    borderColor: filterCat === c.value ? "#1AAFCC" : "var(--border)",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Add stop button */}
            {!addingStop && (
              <button
                onClick={() => setAddingStop(true)}
                className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
                style={{ background: "#1AAFCC" }}
              >
                <Plus className="w-4 h-4" /> Add Stop
              </button>
            )}
            {addingStop && (
              <NewStopForm onSaved={() => { setAddingStop(false); loadStops(); }} onCancel={() => setAddingStop(false)} />
            )}

            {filteredStops.map(stop => (
              <StopRow key={stop.id} stop={stop} onUpdate={loadStops} onDelete={loadStops} />
            ))}
            <div className="h-4" />
          </div>
        )}

        {/* ── SALT SECTION ── */}
        {section === "salt" && (
          <div className="p-4 space-y-3">
            {!addingPost && (
              <button
                onClick={() => setAddingPost(true)}
                className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
                style={{ background: "#1AAFCC" }}
              >
                <Plus className="w-4 h-4" /> New Salt Post
              </button>
            )}
            {addingPost && (
              <NewPostForm onSaved={() => { setAddingPost(false); loadPosts(); }} onCancel={() => setAddingPost(false)} />
            )}
            {posts.map(post => (
              <PostRow key={post.id} post={post} onUpdate={loadPosts} onDelete={loadPosts} />
            ))}
            <div className="h-4" />
          </div>
        )}
      </div>
    </div>
  );
}
