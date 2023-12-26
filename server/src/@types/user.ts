import { Request } from "express";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: Types.ObjectId;
        name: string;
        email: string;
        verified: boolean;
        avatar?: string;
        followers: number;
        followings: number;
      };
    }
  }
}

export interface CreateUser extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export interface VerifyEmailRequest extends Request {
  body: {
    userId: string;
    token: string;
  };
}
