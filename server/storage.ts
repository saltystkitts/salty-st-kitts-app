import { db } from "./db";
import {
  stops, users, saltPosts,
  type Stop, type InsertStop,
  type User, type InsertUser,
  type SaltPost, type InsertSaltPost,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Stops
  getAllStops(): Stop[];
  getVisibleStops(): Stop[];
  getStopsByCategory(category: string): Stop[];
  getStop(id: number): Stop | undefined;
  createStop(stop: InsertStop): Stop;
  updateStop(id: number, stop: Partial<InsertStop>): Stop | undefined;
  deleteStop(id: number): void;

  // Salt Posts
  getAllSaltPosts(): SaltPost[];
  getVisibleSaltPosts(): SaltPost[];
  getSaltPost(id: number): SaltPost | undefined;
  createSaltPost(post: InsertSaltPost): SaltPost;
  updateSaltPost(id: number, post: Partial<InsertSaltPost>): SaltPost | undefined;
  deleteSaltPost(id: number): void;

  // Users
  getUser(id: number): User | undefined;
  getUserByUsername(username: string): User | undefined;
  createUser(user: InsertUser): User;
}

export class DatabaseStorage implements IStorage {
  // ── Stops ──────────────────────────────────────────────
  getAllStops(): Stop[] {
    return db.select().from(stops).all();
  }

  getVisibleStops(): Stop[] {
    return db.select().from(stops).where(eq(stops.visible, true)).all();
  }

  getStopsByCategory(category: string): Stop[] {
    return db.select().from(stops)
      .where(eq(stops.category, category))
      .all()
      .filter(s => s.visible);
  }

  getStop(id: number): Stop | undefined {
    return db.select().from(stops).where(eq(stops.id, id)).get();
  }

  createStop(stop: InsertStop): Stop {
    return db.insert(stops).values(stop).returning().get();
  }

  updateStop(id: number, data: Partial<InsertStop>): Stop | undefined {
    return db.update(stops).set(data).where(eq(stops.id, id)).returning().get();
  }

  deleteStop(id: number): void {
    db.delete(stops).where(eq(stops.id, id)).run();
  }

  // ── Salt Posts ─────────────────────────────────────────
  getAllSaltPosts(): SaltPost[] {
    return db.select().from(saltPosts).all();
  }

  getVisibleSaltPosts(): SaltPost[] {
    return db.select().from(saltPosts).where(eq(saltPosts.visible, true)).all();
  }

  getSaltPost(id: number): SaltPost | undefined {
    return db.select().from(saltPosts).where(eq(saltPosts.id, id)).get();
  }

  createSaltPost(post: InsertSaltPost): SaltPost {
    return db.insert(saltPosts).values(post).returning().get();
  }

  updateSaltPost(id: number, data: Partial<InsertSaltPost>): SaltPost | undefined {
    return db.update(saltPosts).set(data).where(eq(saltPosts.id, id)).returning().get();
  }

  deleteSaltPost(id: number): void {
    db.delete(saltPosts).where(eq(saltPosts.id, id)).run();
  }

  // ── Users ──────────────────────────────────────────────
  getUser(id: number): User | undefined {
    return db.select().from(users).where(eq(users.id, id)).get();
  }

  getUserByUsername(username: string): User | undefined {
    return db.select().from(users).where(eq(users.username, username)).get();
  }

  createUser(user: InsertUser): User {
    return db.insert(users).values(user).returning().get();
  }
}

export const storage = new DatabaseStorage();
