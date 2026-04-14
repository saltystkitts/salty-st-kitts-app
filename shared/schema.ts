import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stops = sqliteTable("stops", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  tip: text("tip").notNull(),
  duration: text("duration").notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  area: text("area").notNull(),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
  imageUrl: text("image_url"),
  // Local intel attributes
  parking: text("parking"),        // easy | limited | street | none
  smoking: text("smoking"),        // cigarettes | weed | both | outside | no
  kidsOk: text("kids_ok"),         // yes | no | depends
  wifi: text("wifi"),              // free | ask | no
  payment: text("payment"),        // cash | card | both
  dresscode: text("dresscode"),    // anything | beach | smart
  bestTime: text("best_time"),     // morning | afternoon | evening | latenight
  vibe: text("vibe"),             // chill | lively | local | mixed | tourist
});

export const insertStopSchema = createInsertSchema(stops).omit({ id: true });
export type InsertStop = z.infer<typeof insertStopSchema>;
export type Stop = typeof stops.$inferSelect;

export const saltPosts = sqliteTable("salt_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  date: text("date").notNull(),
  preview: text("preview").notNull(),
  body: text("body").notNull(),
  emoji: text("emoji").notNull().default("🌊"),
  tag: text("tag").notNull().default("Local Tips"),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
});

export const insertSaltPostSchema = createInsertSchema(saltPosts).omit({ id: true });
export type InsertSaltPost = z.infer<typeof insertSaltPostSchema>;
export type SaltPost = typeof saltPosts.$inferSelect;

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
