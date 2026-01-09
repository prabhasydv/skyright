import  Claim  from "../models/claim.model.js";
import { User } from "../models/user.model.js";
import { adminNewClaimTemplate, userClaimSubmittedTemplate } from "../utils/emailTemplates.js";
import { generateAgreementPDF } from "../utils/generateAgreementPdf.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import mongoose from "mongoose";





export const createClaim = async (req, res) => {
  try {
    /* ---------- FILE VALIDATION ---------- */
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No boarding passes uploaded" });
    }

    const claimData = JSON.parse(req.body.claim);

    /* ---------- E-SIGNATURE VALIDATION ---------- */
    if (
      !claimData.eSignatures ||
      claimData.eSignatures.length !== claimData.passengers.length
    ) {
      return res.status(400).json({
        message: "Each passenger must provide an e-signature",
      });
    }

    /* ---------- BOARDING PASSES ---------- */
    const boardingPasses = req.files.map((file) => ({
      filename: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
    }));

    /* ---------- IP ADDRESS (AUTO) ---------- */
    // const ipAddress =
    //   req.headers["x-forwarded-for"]?.split(",")[0] ||
    //   req.socket.remoteAddress ||
    //   null;
    const ipAddress = req.ip; // ✅ CORRECT & SAFE




    // new 

    const eSignatures = claimData.passengers.map((name, index) => ({
      passengerName: name,
      passengerEmail:
        index === 0 ? req.user.email : claimData.passengerEmails?.[index],
    
      signingToken: crypto.randomBytes(32).toString("hex"),
    
      status: index === 0 ? "signed" : "pending",
    
      signatureData:
        index === 0
          ? claimData.eSignatures[0]?.signatureData
          : null,
    
      signedAt: index === 0 ? new Date() : null,
    }));
    

    // new 
    /* ---------- CREATE CLAIM ---------- */
    const claim = await Claim.create({
      ...claimData,

      // 🔐 Ownership
      user: req.user._id,

      // 📎 Documents
      boardingPasses,

      // 🌍 Metadata
      ipAddress,

      // 📨 Optional contact info (safe even if undefined)
      email: claimData.email || undefined,
      phone: claimData.phone || undefined,
      address: claimData.address || undefined,
    });


    // ✅ DEFINE IT HERE (FIX)
const disruptedSegment = claim.segments.find(
  (segment) => segment.disrupted === true
);

    /* ---------- GENERATE AGREEMENT PDF ---------- */
    const agreements = await generateAgreementPDF({
      passengers: claim.passengers,
      eSignatures: claim.eSignatures,
      claimId: claim._id,

      claimDetails: {
        pnr: claim.pnr,
        disruptedSegment,
        ipAddress: claim.ipAddress, // ✅ ADD THIS
      },

    });

    claim.agreements = agreements;
    claim.markModified("agreements");
    await claim.save();

    /* ---------- FETCH USER ---------- */
    const user = await User.findById(req.user._id);

    // new 
    const FRONTEND_URL = process.env.FRONTEND_URL;

for (const sig of claim.eSignatures) {
  if (sig.status === "pending") {
    await sendEmail({
      to: sig.passengerEmail,
      subject: "Please sign your claim agreement",
      html: `
        <p>Hello ${sig.passengerName},</p>
        <p>Please sign your agreement using the link below:</p>
        <a href="${FRONTEND_URL}/sign/${sig.signingToken}">
          Sign Agreement
        </a>
        <p>This link is secure and unique to you.</p>
      `,
    });
  }
}


    // new  

    /* ---------- EMAIL: USER ---------- */
    // await sendEmail({
    //   to: user.email,
    //   subject: "Your claim has been submitted successfully",
    //   html: userClaimSubmittedTemplate({
    //     name: user.name || "Customer",
    //     claimId: claim._id,
    //   }),
    // });

    /* ---------- EMAIL: ADMIN ---------- */
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New claim submitted",
      html: adminNewClaimTemplate({
        name: user.name || "Unknown",
        email: user.email,
        claimId: claim._id,
      }),
    });

    /* ---------- RESPONSE ---------- */
    return res.status(201).json({
      success: true,
      claim,
    });
  } catch (err) {
    console.error("CREATE CLAIM ERROR:", err);
    return res.status(500).json({ message: "Claim creation failed" });
  }
};



/* ================= GET USER CLAIMS ================= */
// export const getMyClaims = async (req, res) => {
//   try {
//     const claims = await Claim.find({ user: req.user.userId }).sort({
//       createdAt: -1,
//     });

//     res.json({ success: true, claims });
//   } catch (err) {
//     res.status(500).json({ message: "Fetch failed" });
//   }
// };

/* ================= GET MY CLAIMS ================= */
export const getMyClaims = async (req, res) => {
    try {
      const claims = await Claim.find({ user: req.user._id })
        .sort({ createdAt: -1 });
  
      return res.json({ claims });
    } catch (err) {
      console.error("GET MY CLAIMS ERROR:", err);
      return res.status(500).json({ message: "Failed to fetch claims" });
    }
  };

/* ================= UPDATE CLAIM (USER) ================= */
// export const updateClaim = async (req, res) => {
//   try {
//     const claim = await Claim.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.userId },
//       req.body,
//       { new: true }
//     );

//     if (!claim) {
//       return res.status(404).json({ message: "Claim not found" });
//     }

//     res.json({ success: true, claim });
//   } catch (err) {
//     res.status(500).json({ message: "Update failed" });
//   }
// };


export const updateClaim = async (req, res) => {
  try {
    const claim = await Claim.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res.json({ success: true, claim });
  } catch (err) {
    console.error("UPDATE CLAIM ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ================= DELETE CLAIM ================= */
export const deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { claims: claim._id },
    });

    res.json({ success: true, message: "Claim deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};




/* ================= GET ALL CLAIMS (ADMIN) ================= */
export const getAllClaims = async (req, res) => {
  const claims = await Claim.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json({ success: true, claims });
};

/* ================= UPDATE CLAIM STATUS ================= */
export const updateClaimStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "completed", "cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const claim = await Claim.findById(id);
  if (!claim) {
    return res.status(404).json({ message: "Claim not found" });
  }

  claim.status = status;
  await claim.save();

  res.json({ success: true, claim });
};

export const getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res.json({ success: true, claim });
  } catch (err) {
    console.error("GET CLAIM ERROR:", err);
    res.status(500).json({ message: "Failed to fetch claim" });
  }
};



