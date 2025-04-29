import { Document, Schema } from "mongoose";

interface MongoDBSchemaDefaultFieldType extends Document {
  _id: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRoleType = "user" | "admin";
export type DeviceType = "pc" | "mobile";
export type OSType = "android" | "windows" | "macos" | "linux";
export type BrowserType = "chrome" | "firefox" | "chromium" | "safari" | "edge" | "brave";
export type SocialType = "website" | "github" | "youtube" | "twitter" | "linkedin" | "reddit";
export type SocialDetailsType = {
    type: SocialType,
    src: string
}
export type BlogStatusType = "published" | "draft";

export type FullNameType = {
    first: string
    last: string
};

interface UserSchemaType extends MongoDBSchemaDefaultFieldType {
  fullName: FullNameType;
  email: string;
  socials: SocialDetailsType[]
  headline?: string
  about?: string
  role: UserRoleType;
  password: string;
  isVerified?: boolean;
  session?: string;
  otp?: string;
  otpToken?: string;
}

interface ProjectSchemaType extends MongoDBSchemaDefaultFieldType {
    title: string
    desc: string
    users: number
    socials: SocialDetailsType[]
    images: string[]
}

interface BlogSchemaType extends MongoDBSchemaDefaultFieldType {
    userId: Schema.Types.ObjectId
    title: string
    content: object
    coverImage: string
    slug: string
    views: number
    tags: string[]
    excerpt: string
    status: BlogStatusType
}

export type {
    UserSchemaType,
    ProjectSchemaType,
    BlogSchemaType
}
