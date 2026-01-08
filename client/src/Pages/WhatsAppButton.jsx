import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "447683089774";
  const message =
    "Hello SkyRight Legal, I need help with my flight compensation.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <>
      {/* Minimal animation */}
      <style>
        {`
          @keyframes softPulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
          }
        `}
      </style>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          fixed bottom-6 right-6 z-50
          w-14 h-14
          flex items-center justify-center
          rounded-full
          bg-green-500
          text-white
          shadow-lg
          hover:bg-green-600
          transition-colors duration-300
          animate-[softPulse_3s_infinite]
        "
      >
        <FaWhatsapp size={26} />
      </a>
    </>
  );
};

export default WhatsAppButton;
