// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },

//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "user", // ✅ FIXED
//     },

//     allComponsations: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Claim", // singular, best practice
//       },
//     ],

//     photoUrl: {
//       type: String,
//       default: "",
//     },
//   },
//   { timestamps: true }
// );

// export const User = mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    /* ================= AUTH ================= */
    password: {
      type: String,
      minlength: 6,
      // ❗ NOT required for Google/Facebook users
      required: function () {
        return this.provider === "local";
      },
    },

    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },

    providerId: {
      type: String,
      default: null, // googleId / facebookId
    },

    /* ================= ROLE ================= */
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    /* ================= CLAIMS ================= */
    allComponsations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Claim",
      },
    ],

    /* ================= PROFILE ================= */
    photoUrl: {
      type: String,
      default: "",
    },

    /* ================= META ================= */
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/* ================= INDEXES ================= */
userSchema.index({ email: 1 });

export const User = mongoose.model("User", userSchema);
