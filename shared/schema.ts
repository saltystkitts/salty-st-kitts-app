import { pgTable, text, integer, real, boolean, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stops = pgTable("stops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  tip: text("tip").notNull(),
  duration: text("duration").notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  area: text("area").notNull(),
  featured: boolean("featured").notNull().default(false),
  visible: boolean("visible").notNull().default(true),
  imageUrl: text("image_url"),
  parking: text("parking"),
  smoking: text("smoking"),
  kidsOk: text("kids_ok"),
  wifi: text("wifi"),
  payment: text("payment"),
  dresscode: text("dresscode"),
  bestTime: text("best_time"),
  vibe: text("vibe"),
  closedNote: text("closed_note"),
});

export const insertStopSchema = createInsertSchema(stops).omit({ id: true });
export type InsertStop = z.infer<typeof insertStopSchema>;
export type Stop = typeof stops.$inferSelect;

export const saltPosts = pgTable("salt_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  preview: text("preview").notNull(),
  body: text("body").notNull(),
  emoji: text("emoji").notNull().default("🌊"),
  tag: text("tag").notNull().default("Local Tips"),
  visible: boolean("visible").notNull().default(true),
});

export const insertSaltPostSchema = createInsertSchema(saltPosts).omit({ id: true });
export type InsertSaltPost = z.infer<typeof insertSaltPostSchema>;
export type SaltPost = typeof saltPosts.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const appSettings = pgTable("app_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});
