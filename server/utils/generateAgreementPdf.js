// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";

// /* ======================================================
//    CONFIG
// ====================================================== */
// const AGREEMENTS_DIR = path.join("uploads", "agreements");
// const LOGO_PATH = path.join("uploads", "assets", "logo.png");

// /* ======================================================
//    GENERATE AGREEMENTS (ONE PER PASSENGER)
// ====================================================== */
// export const generateAgreementPDF = async ({
//   claimId,
//   passengers,
//   eSignatures,
//   claimDetails, // pnr, disruptedSegment, ipAddress
// }) => {
//   if (!fs.existsSync(AGREEMENTS_DIR)) {
//     fs.mkdirSync(AGREEMENTS_DIR, { recursive: true });
//   }

//   const agreements = [];

//   for (let i = 0; i < passengers.length; i++) {
//     const passengerName = passengers[i];

//     const signature = eSignatures.find(
//       (s) => s.passengerName === passengerName
//     );

//     const filename = `agreement-${claimId}-${i + 1}.pdf`;
//     const filePath = path.join(AGREEMENTS_DIR, filename);

//     const doc = new PDFDocument({ margin: 50 });
//     const stream = fs.createWriteStream(filePath);
//     doc.pipe(stream);

//     /* ======================================================
//        LOGO (TOP CENTER)
//     ====================================================== */
//     if (fs.existsSync(LOGO_PATH)) {
//       doc.image(LOGO_PATH, {
//         fit: [120, 120],
//         align: "center",
//       });
//     }

//     doc.moveDown(1);

//     /* ======================================================
//        TITLE
//     ====================================================== */
//     doc
//       .fontSize(18)
//       .text("ASSIGNMENT OF CLAIM", { align: "center" })
//       .moveDown(2);

//     /* ======================================================
//        AGREEMENT TEXT
//     ====================================================== */
//     doc.fontSize(11).text(
//       `
// By signing this Assignment Agreement, you (“the Client”) hereby assign to SkyRight full ownership and legal title to your monetary claim arising under Regulation (EC) No 261/2004 of the European Parliament and of the Council of 11 February 2004, or any other applicable international or national passenger rights regulation.

// This assignment includes all compensation amounts related to the affected flight, including but not limited to compensation for flight delay, cancellation, denied boarding, applicable taxes, and any other monetary compensation.

// The Client understands and agrees that, once this Assignment Agreement is signed, the Client may not engage in any direct contact with the operating air carrier, nor receive any payment directly from the carrier in relation to the assigned claim.

// If this Assignment Agreement cannot be considered legally valid in the applicable jurisdiction, this agreement shall be deemed a service agreement. Under such circumstances, SkyRight is authorized to manage the claim on the Client’s behalf, including initiating legal or administrative proceedings, arranging and financing legal representation, communicating with the air carrier, and carrying out all actions necessary for claim recovery.

// The Client has the right to withdraw from this agreement within fourteen (14) days from the date of signature.

// By signing below, the Client confirms that all information provided is accurate and complete and confirms acceptance of the applicable Privacy Policy and General Terms & Conditions.
//       `,
//       { align: "justify", lineGap: 4 }
//     );

//     doc.moveDown(2);

//     /* ======================================================
//        PASSENGER & CLAIM DETAILS
//     ====================================================== */
//     doc.fontSize(12).text("Passenger & Claim Information", {
//       underline: true,
//     });
//     doc.moveDown(0.5);

//     doc.fontSize(11).text(`Passenger name: ${passengerName}`);

//     if (claimDetails?.pnr) {
//       doc.text(`Booking reference (PNR): ${claimDetails.pnr}`);
//     }

//     if (claimDetails?.disruptedSegment) {
//       const s = claimDetails.disruptedSegment;
//       doc.moveDown(0.5);
//       doc.text(`Disrupted flight: ${s.from?.iata} → ${s.to?.iata}`);
//       doc.text(`Airline: ${s.airlineName}`);
//       doc.text(`Flight number: ${s.flightNumber}`);
//       doc.text(`Flight date: ${s.flightDate}`);
//     }

//     if (claimDetails?.ipAddress) {
//       doc.moveDown(0.5);
//       doc.text(`IP address at submission: ${claimDetails.ipAddress}`);
//     }

//     doc.moveDown(4);

//     /* ======================================================
//        SIGNATURE
//     ====================================================== */
//     doc.fontSize(12).text("Signature", { underline: true });
//     doc.moveDown(1);

//     if (signature?.signatureData) {
//       const base64 = signature.signatureData.replace(
//         /^data:image\/\w+;base64,/,
//         ""
//       );

//       const buffer = Buffer.from(base64, "base64");

//       doc.image(buffer, doc.page.width - 200, doc.y, {
//         width: 120,
//       });

//       doc.moveDown(1);

//       doc
//         .fontSize(9)
//         .text(passengerName, doc.page.width - 200, doc.y);
//     }

//     doc.end();

//     await new Promise((resolve) => stream.on("finish", resolve));

//     agreements.push({
//       filename,
//       path: filePath,
//       mimetype: "application/pdf",
//       generatedAt: new Date(),
//       passengerName,
//     });
//   }

//   return agreements;
// };

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const AGREEMENTS_DIR = path.join("uploads", "agreements");
const LOGO_PATH = path.join("uploads", "assets", "logo.png");

export const generateAgreementPDF = async ({
  claimId,
  passengers,
  eSignatures,
  claimDetails,
  clientDetails,
}) => {
  if (!fs.existsSync(AGREEMENTS_DIR)) {
    fs.mkdirSync(AGREEMENTS_DIR, { recursive: true });
  }

  const agreements = [];

  for (let i = 0; i < passengers.length; i++) {
    const passengerName = passengers[i];
    const signature = eSignatures.find(
      (s) => s.passengerName === passengerName
    );

    const fileName = `agreement-${claimId}-${i + 1}.pdf`;
    const filePath = path.join(AGREEMENTS_DIR, fileName);

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const left = doc.page.margins.left;
    const pageWidth = doc.page.width;
    const usableWidth = pageWidth - left * 2;

    /* ================= HEADER ROW (SAFE) ================= */
    const headerY = 40;

    // Date (left)
    doc
      .fontSize(9)
      .text(new Date().toLocaleString(), left, headerY, {
        width: usableWidth / 3,
        align: "left",
      });

    // Logo (center)
    if (fs.existsSync(LOGO_PATH)) {
      doc.image(LOGO_PATH, pageWidth / 2 - 40, headerY - 10, {
        width: 80,
      });
    }

    // Assignment Form (right)
    doc
      .fontSize(9)
      .text("Assignment Form", left + (usableWidth * 2) / 3, headerY, {
        width: usableWidth / 3,
        align: "right",
      });

    /* ================= RESET CURSOR ================= */
    doc.x = left;
    doc.y = headerY + 60;

    /* ================= TITLE ================= */
    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text(
        "ASSIGNMENT FORM / POWER OF ATTORNEY AND\nAUTHORITY TO ACT",
        {
          align: "center",
        }
      );

    doc.moveDown(2);

    /* ================= DATE LINE ================= */
    // doc.font("Helvetica").fontSize(11);
    // doc.text("Date: ________________________________");

    // doc.moveDown(2);

    /* ================= CLIENT DETAILS ================= */
    doc.font("Helvetica-Bold").fontSize(13).text("Client Details:");
    doc.moveDown(0.5);

    doc.font("Helvetica").fontSize(11);
    doc.text(`Full Name: ${clientDetails?.name || passengerName}`);
    if (clientDetails?.email) {
      doc.text(`Email: ${clientDetails.email}`);
    }

    doc.moveDown(1.5);

    /* ================= FLIGHT DETAILS ================= */
    doc.font("Helvetica-Bold").fontSize(13).text("Flight Details:");
    doc.moveDown(0.5);

    doc.font("Helvetica").fontSize(11);
    if (claimDetails?.disruptedSegment) {
      const s = claimDetails.disruptedSegment;
      doc.text(`Route: ${s.from?.iata} → ${s.to?.iata}`);
      doc.text(`Airline: ${s.airlineName}`);
      doc.text(`Flight Number: ${s.flightNumber}`);
      doc.text(`Flight Date: ${s.flightDate}`);
    }
    if (claimDetails?.pnr) {
      doc.text(`PNR: ${claimDetails.pnr}`);
    }

    doc.moveDown(2);

    /* ================= AGREEMENT TEXT ================= */
    doc.font("Helvetica").fontSize(11).text(
      `
In accordance with the Privacy Policy and General Terms & Conditions provided on the website of SkyRight Legal co, a company registered in England and Wales with company number 16452205, registered address 71–75 Shelton Street, Covent Garden, London, WC2H 9JQ, UNITED KINGDOM (“SkyRight Legal co”), webpage https://skyrightlegal.com/, which the Client confirms having read and accepted.

By signing this Assignment Form / Power of Attorney (“Form”), the Client authorises SkyRight Legal co to act on their behalf in pursuing any monetary claim for compensation and assistance under Regulation (EC) No 261/2004, including claims for delay, cancellation, denied boarding, or any related compensation (“Claim”).

The Client grants SkyRight Legal co irrevocable authority to communicate with airlines, authorities, initiate legal proceedings, collect payments, deduct agreed fees, and remit the remaining balance to the Client.

If assignment of the Claim is not legally permissible, this Form shall be treated as a Power of Attorney and service agreement on a “no win, no fee” basis.
      `,
      {
        align: "justify",
        lineGap: 4,
      }
    );

    doc.moveDown(3);

    /* ================= DECLARATION ================= */
    doc.font("Helvetica-Bold").fontSize(13).text("Client Declaration:");
    doc.moveDown(0.5);
    doc.font("Helvetica").fontSize(11).text(
      "I confirm that the information provided is correct and that I am entitled to pursue this Claim."
    );

    doc.moveDown(3);

    /* ================= SIGNATURE ================= */
    // doc.font("Helvetica-Bold").fontSize(12).text("Client Signature:");
    // doc.moveDown(4);

    // if (signature?.signatureData) {
    //   const base64 = signature.signatureData.replace(
    //     /^data:image\/\w+;base64,/,
    //     ""
    //   );
    //   const buffer = Buffer.from(base64, "base64");

    //   doc.image(buffer, left, doc.y, { width: 160 });
    //   doc.moveDown(2);
    // }

    // doc.font("Helvetica").fontSize(10);
    // doc.text(`Signed by: ${passengerName}`);
    // doc.text(`Date: ${new Date().toLocaleDateString()}`);
    // if (claimDetails?.ipAddress) {
    //   doc.text(`IP Address: ${claimDetails.ipAddress}`);
    // }
    /* ================= SIGNATURE SECTION ================= */

doc.moveDown(2);
doc.font("Helvetica-Bold").fontSize(12).text("Client Signature:");
doc.moveDown(1);

const signatureStartY = doc.y;

if (signature?.signatureData) {
  const base64 = signature.signatureData.replace(
    /^data:image\/\w+;base64,/,
    ""
  );
  const buffer = Buffer.from(base64, "base64");

  // Draw signature
  doc.image(buffer, left, signatureStartY, {
    width: 180,
  });

  // Move cursor BELOW the signature image
  doc.y = signatureStartY + 70;
} else {
  doc.text("______________________________", left);
  doc.moveDown(2);
}

/* ================= SIGNATURE META ================= */

doc.font("Helvetica").fontSize(10);
doc.text(`Signed by: ${passengerName}`);
doc.text(`Date: ${new Date().toLocaleDateString()}`);

if (claimDetails?.ipAddress) {
  doc.text(`IP Address: ${claimDetails.ipAddress}`);
}


    doc.end();
    await new Promise((r) => stream.on("finish", r));

    agreements.push({
      filename: fileName,
      path: filePath,
      mimetype: "application/pdf",
      passengerName,
    });
  }

  return agreements;
};



