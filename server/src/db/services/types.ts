import { Schema } from "mongoose";
import {
  FullNameType,
  SocialDetailsType,
  UserRoleType,
} from "../schemas/types";

interface RegisterUserType {
  fullName: FullNameType;
  email: string;
  password: string
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

export { RegisterUserType, FindByIdAndUpdateUserType };
