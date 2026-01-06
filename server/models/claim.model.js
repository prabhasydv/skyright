// import mongoose from "mongoose";

// const segmentSchema = new mongoose.Schema({
//   from: Object,
//   to: Object,
//   flightDate: String,
//   airlineName: String,
//   flightNumber: String,
//   disrupted: Boolean,
// });

// const boardingPassSchema = new mongoose.Schema(
//   {
//     filename: String,
//     path: String,
//     mimetype: String,
//     uploadedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { _id: false }
// );

// const eSignatureSchema = new mongoose.Schema(
//   {
//     passengerName: {
//       type: String,
//       required: true,
//     },
//     signatureData: {
//       type: String, // base64
//       required: true,
//     },
//     signedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { _id: false }
// );

// const agreementSchema = new mongoose.Schema(
//   {
//     filename: {
//       type: String,
//       required: true,
//     },
//     path: {
//       type: String,
//       required: true,
//     },
//     mimetype: {
//       type: String,
//       default: "application/pdf",
//     },
//     generatedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { _id: false }
// );

// const claimSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     departure: Object,
//     destination: Object,

//     connectedFlight: String,
//     stops: Number,
//     connections: [Object],
//     segments: [segmentSchema],

//     disruptionType: String,
//     delayDuration: String,
//     disruptionReasonKnown: String,
//     disruptionReason: String,

//     additional: String,

//     // ✅ Passengers
//     passengers: {
//       type: [String],
//       required: true,
//       validate: {
//         validator: (v) => v.length > 0,
//         message: "At least one passenger is required",
//       },
//     },

//     // ✅ Optional PNR
//     pnr: {
//       type: String,
//       trim: true,
//     },

//     // ✅ Mandatory e-signatures
//     eSignatures: {
//       type: [eSignatureSchema],
//       required: true,
//       validate: {
//         validator: function (value) {
//           return value.length === this.passengers.length;
//         },
//         message: "Each passenger must provide an e-signature",
//       },
//     },

//     // ✅ Boarding passes
//     boardingPasses: [boardingPassSchema],

//     // ✅ GENERATED AGREEMENT PDF
//     agreement: {
//       type: agreementSchema,
//       required: false,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "completed", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Claim", claimSchema);


import mongoose from "mongoose";

/* ================= SEGMENTS ================= */
const segmentSchema = new mongoose.Schema({
  from: Object,
  to: Object,
  flightDate: String,
  airlineName: String,
  flightNumber: String,
  disrupted: Boolean,
});

/* ================= BOARDING PASSES ================= */
const boardingPassSchema = new mongoose.Schema(
  {
    filename: String,
    path: String,
    mimetype: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

/* ================= E-SIGNATURES ================= */
const eSignatureSchema = new mongoose.Schema(
  {
    passengerName: {
      type: String,
      required: true,
    },
    signatureData: {
      type: String, // base64
      required: true,
    },
    signedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);



/* ================= AGREEMENT ================= */
const agreementSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      default: "application/pdf",
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

/* ================= CLAIM ================= */
const claimSchema = new mongoose.Schema(
  {
    /* ---------- USER ---------- */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* ---------- ROUTE ---------- */
    departure: Object,
    destination: Object,

    connectedFlight: String,
    stops: Number,
    connections: [Object],
    segments: [segmentSchema],

    /* ---------- DISRUPTION ---------- */
    disruptionType: String,
    delayDuration: String,
    disruptionReasonKnown: String,
    disruptionReason: String,

    additional: String,

    /* ---------- PASSENGERS ---------- */
    passengers: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "At least one passenger is required",
      },
    },

    /* ---------- OPTIONAL CONTACT INFO ---------- */
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    /* ---------- OPTIONAL PNR ---------- */
    pnr: {
      type: String,
      trim: true,
    },

    /* ---------- E-SIGNATURES ---------- */
    eSignatures: {
      type: [eSignatureSchema],
      required: true,
      validate: {
        validator: function (value) {
          return value.length === this.passengers.length;
        },
        message: "Each passenger must provide an e-signature",
      },
    },

    /* ---------- DOCUMENTS ---------- */
    boardingPasses: [boardingPassSchema],

    /* ---------- AGREEMENT ---------- */
    // agreement: {
    //   type: agreementSchema,
    // },
    agreements: {
      type: [agreementSchema],
      default: [],
    },
    

    /* ---------- METADATA ---------- */
    ipAddress: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Claim", claimSchema);
