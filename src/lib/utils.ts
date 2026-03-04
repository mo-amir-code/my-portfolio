import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken"
import { JWT_SIGN } from "@/config/secrets";
import { JWTTokenVerifierType } from "./types";
import { jwtVerify, errors } from "jose"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

// ttl = ms
export function setWithExpiry(key: string, value: string, ttl: number) {
  const now = Date.now();

  const item = {
    value: value,
    expiry: now + ttl, // ttl = time to live (in ms)
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = Date.now();

  if (now > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  if (item.value.length === 0) return null;

  return item.value;
}

export function removeWithKey(key: string) {
  localStorage.removeItem(key)
}

export function generateJWTToken(data: { email: string }) {
  const token = jwt.sign(data, JWT_SIGN, { expiresIn: "7d" })
  return token
}

export async function verifyJWTToken(
  token: string
): Promise<JWTTokenVerifierType> {
  try {
    const secret = new TextEncoder().encode(JWT_SIGN);

    const { payload } = (await jwtVerify(token, secret)) as { payload: { email: string } };

    return {
      valid: true,
      payload,
    };
  } catch (error) {
    console.log("[ERROR] JWT Verifying Error:", error);

    if (error instanceof errors.JWTExpired) {
      return { valid: false, expired: true };
    }

    return { valid: false };
  }
}

// Article draft persistence utilities
const DRAFT_KEY_NEW = "draft-new-article";
const DRAFT_TTL = 1000 * 60 * 60 * 24; // 24 hours

export function getDraftArticleKey(blogId: string | null): string {
  return blogId ? `draft-${blogId}` : DRAFT_KEY_NEW;
}

export interface ArticleDraft {
  title: string;
  slug: string;
  publishedAt: string;
  summary: string;
  status: string;
  coverImage: string | null;
  content: string;
  updatedAt: number;
}

export function saveDraftArticle(blogId: string | null, articleData: ArticleDraft) {
  const key = getDraftArticleKey(blogId);
  const draftWithTimestamp = {
    ...articleData,
    updatedAt: Date.now(),
  };
  setWithExpiry(key, JSON.stringify(draftWithTimestamp), DRAFT_TTL);
}

export function loadDraftArticle(blogId: string | null): ArticleDraft | null {
  const key = getDraftArticleKey(blogId);
  const itemStr = localStorage.getItem(key);
  
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = Date.now();

    // Check expiry
    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    // Parse the actual draft data
    const draftData = JSON.parse(item.value);
    return draftData;
  } catch (error) {
    console.error("[ERROR] Failed to load draft article:", error);
    return null;
  }
}

export function removeDraftArticle(blogId: string | null) {
  const key = getDraftArticleKey(blogId);
  localStorage.removeItem(key);
}

export function hasExistingDraft(blogId: string | null): boolean {
  const draft = loadDraftArticle(blogId);
  return draft !== null;
}
