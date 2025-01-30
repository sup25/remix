import React, { useState } from "react";
import { CgShare } from "react-icons/cg";
import { FiCheck } from "react-icons/fi";

const ShareButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleShare = async () => {
    const shareData = {
      url: window.location.href,
    };

    try {
      if (typeof navigator.share === "function") {
        await navigator.share(shareData);
        setIsChecked(true);
        setTimeout(() => setIsChecked(false), 2000);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsChecked(true);
        setTimeout(() => setIsChecked(false), 2000);
      }
    } catch (err) {
      console.error("Failed to share:", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      aria-label="Share product"
    >
      {isChecked ? (
        <FiCheck className="h-5 w-5 text-green-500" />
      ) : (
        <CgShare className="h-5 w-5 text-gray-600" />
      )}
    </button>
  );
};

export default ShareButton;
