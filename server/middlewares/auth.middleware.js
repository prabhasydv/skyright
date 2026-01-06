

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { userId, role, iat, exp }

    // const user = await User.findById(decoded.userId);

    const userId = decoded.id || decoded.userId; // ✅ SUPPORT BOTH

    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ FULL USER DOCUMENT
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};


// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// export const protect = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   try {
//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // decoded = { id, role, iat, exp }

//     const user = await User.findById(decoded.id); // ✅ FIX HERE

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user; // ✅ FULL USER DOCUMENT
//     next();
//   } catch (err) {
//     console.error("AUTH ERROR:", err.message);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export const adminOnly = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Admin access only" });
//   }
//   next();
// };
