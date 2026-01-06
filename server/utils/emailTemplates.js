export const userClaimSubmittedTemplate = ({
    name,
    claimId,
  }) => `
    <h2>✅ Claim Submitted Successfully</h2>
    <p>Hello ${name},</p>
  
    <p>Your flight compensation claim has been successfully submitted.</p>
  
    <p><b>Claim ID:</b> ${claimId}</p>
  
    <p>Our legal team will now review your case and contact the airline on your behalf.</p>
  
    <p>You don’t need to take any further action at this stage.</p>
  
    <br />
    <p>✈️ SkyRight Team</p>
  `;
  
  export const adminNewClaimTemplate = ({
    name,
    email,
    claimId,
  }) => `
    <h2>📥 New Claim Submitted</h2>
  
    <p><b>User:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Claim ID:</b> ${claimId}</p>
  
    <p>Please review the claim in the admin panel.</p>
  `;
  