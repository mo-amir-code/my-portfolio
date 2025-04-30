import { Schema } from "mongoose";
import {
  FullNameType,
  SocialDetailsType,
  UserRoleType,
} from "../schemas/types";

// User's Schema
interface RegisterUserType {
  fullName: FullNameType;
  email: string;
  password: string;
  socials?: SocialDetailsType[];
  headline?: string;
  about?: string;
  role?: UserRoleType;
}

interface FindByIdAndUpdateUserType {
  id: Schema.Types.ObjectId;
  fullName?: FullNameType;
  socials?: SocialDetailsType[];
  headline?: string;
  about?: string;
  password?: string;
  isVerified?: string;
  session?: string;
  otp?: string | undefined;
  otpToken?: string | undefined;
}

export type { RegisterUserType, FindByIdAndUpdateUserType };

// Project's Schema
interface CreateProjectType {
  title: string;
  desc: string;
  users?: number;
  socials: SocialDetailsType[];
  images?: string[];
  completionDate: Date;
}

interface FindByIdAndUpdateProjectType {
  id: string;
  title?: string;
  desc?: string;
  users?: number;
  socials?: SocialDetailsType[];
  images?: string[];
  completionDate?: Date;
}

export type { CreateProjectType, FindByIdAndUpdateProjectType };

// Blog's Schema
interface CreateBlogType {
  title: string;
  content: object;
  coverImage: string;
  slug: string;
  tags?: string[];
  excerpt: string;
  status?: string;
}

interface FindByIdAndUpdateBlogType {
  id: string;
  title?: string;
  content?: object;
  coverImage?: string;
  slug?: string;
  tags?: string[];
  excerpt?: string;
  status?: string;
  views?: number;
}

export type { CreateBlogType, FindByIdAndUpdateBlogType };
