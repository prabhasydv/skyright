import "dotenv/config"; // 👈 MUST be first line
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./database/db.js";
import claimRoute from "./routes/claim.route.js";
import authRoute from "./routes/auth.route.js";
import adminClaimRoute from "./routes/adminClaim.route.js";

// dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;


app.set("trust proxy", true);


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, 'Public')));

// ✅ Serve React static build
const buildPath = path.join(__dirname, "../client/dist");
app.use(express.static(buildPath));

app.get(["/robots.txt", "/sitemap.xml"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", req.path));
});


app.use("/uploads", express.static("uploads"));
app.use("/api/v1/claims", claimRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin/claims", adminClaimRoute);




app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html")
  );
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);
});



// import "dotenv/config";
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import connectDB from "./database/db.js";
// import claimRoute from "./routes/claim.route.js";
// import authRoute from "./routes/auth.route.js";
// import adminClaimRoute from "./routes/adminClaim.route.js";

// connectDB();

// const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const PORT = process.env.PORT || 8080;

// app.set("trust proxy", true);
// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({ origin: "*", credentials: true }));

// app.use("/uploads", express.static("uploads"));

// app.get("/api/v1/health", (req, res) => {
//   res.json({ ok: true });
// });

// app.use("/api/v1/claims", claimRoute);
// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/admin/claims", adminClaimRoute);

// if (process.env.NODE_ENV === "production") {
//   const buildPath = path.join(__dirname, "../client/dist/index.html");
//   app.use(express.static(buildPath));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(buildPath, "index.html"));
//   });
// }

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });
