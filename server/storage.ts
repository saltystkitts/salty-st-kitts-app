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
  getAllStops(): Promise<Stop[]>;
  getVisibleStops(): Promise<Stop[]>;
  getStopsByCategory(category: string): Promise<Stop[]>;
  getStop(id: number): Promise<Stop | undefined>;
  createStop(stop: InsertStop): Promise<Stop>;
  updateStop(id: number, stop: Partial<InsertStop>): Promise<Stop | undefined>;
  deleteStop(id: number): Promise<void>;
  deleteAllStops(): Promise<void>;

  // Salt Posts
  getAllSaltPosts(): Promise<SaltPost[]>;
  getVisibleSaltPosts(): Promise<SaltPost[]>;
  getSaltPost(id: number): Promise<SaltPost | undefined>;
  createSaltPost(post: InsertSaltPost): Promise<SaltPost>;
  updateSaltPost(id: number, post: Partial<InsertSaltPost>): Promise<SaltPost | undefined>;
  deleteSaltPost(id: number): Promise<void>;

  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // ── Stops ──────────────────────────────────────────────
  async getAllStops(): Promise<Stop[]> {
    return db.select().from(stops);
  }

  async getVisibleStops(): Promise<Stop[]> {
    return db.select().from(stops).where(eq(stops.visible, true));
  }

  async getStopsByCategory(category: string): Promise<Stop[]> {
    const result = await db.select().from(stops).where(eq(stops.category, category));
    return result.filter(s => s.visible);
  }

  async getStop(id: number): Promise<Stop | undefined> {
    const result = await db.select().from(stops).where(eq(stops.id, id));
    return result[0];
  }

  async createStop(stop: InsertStop): Promise<Stop> {
    const result = await db.insert(stops).values(stop).returning();
    return result[0];
  }

  async updateStop(id: number, data: Partial<InsertStop>): Promise<Stop | undefined> {
    const result = await db.update(stops).set(data).where(eq(stops.id, id)).returning();
    return result[0];
  }

  async deleteStop(id: number): Promise<void> {
    await db.delete(stops).where(eq(stops.id, id));
  }

  async deleteAllStops(): Promise<void> {
    await db.delete(stops);
  }

  // ── Salt Posts ─────────────────────────────────────────
  async getAllSaltPosts(): Promise<SaltPost[]> {
    return db.select().from(saltPosts);
  }

  async getVisibleSaltPosts(): Promise<SaltPost[]> {
    return db.select().from(saltPosts).where(eq(saltPosts.visible, true));
  }

  async getSaltPost(id: number): Promise<SaltPost | undefined> {
    const result = await db.select().from(saltPosts).where(eq(saltPosts.id, id));
    return result[0];
  }

  async createSaltPost(post: InsertSaltPost): Promise<SaltPost> {
    const result = await db.insert(saltPosts).values(post).returning();
    return result[0];
  }

  async updateSaltPost(id: number, data: Partial<InsertSaltPost>): Promise<SaltPost | undefined> {
    const result = await db.update(saltPosts).set(data).where(eq(saltPosts.id, id)).returning();
    return result[0];
  }

  async deleteSaltPost(id: number): Promise<void> {
    await db.delete(saltPosts).where(eq(saltPosts.id, id));
  }

  // ── Users ──────────────────────────────────────────────
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
