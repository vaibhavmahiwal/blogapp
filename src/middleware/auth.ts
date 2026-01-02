import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const header = req.headers.authorization;

    // 1. Check if header exists and starts with Bearer
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 2. Extract token
    const token = header.slice("Bearer ".length);

    // 3. Check secret
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT secret missing" });
    }

    // 4. Verify token
    const payload = jwt.verify(token, secret) as { userId: string };

    // 5. Attach userId to request
    req.userId = payload.userId;

    // 6. Continue
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export default requireAuth;
