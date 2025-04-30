import { Request } from "express";

type FromType = "forgot-password" |  undefined

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      user: any; // Add the 'user' property of any type
      from: FromType
    }
  }
}