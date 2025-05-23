"use client";

import React, { useState, useEffect } from 'react';

interface CopyLinkButtonProps {
  url: string;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Optionally, provide user feedback for failure
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000); // Reset "Copied!" message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <button
      onClick={handleCopy}
      className={`font-semibold py-2 px-4 rounded-lg transition-colors duration-150 ease-in-out ${
        copied
          ? "bg-green-500 hover:bg-green-600 text-white"
          : "bg-gray-500 hover:bg-gray-600 text-white"
      }`}
      disabled={copied}
    >
      {copied ? "Copied!" : "Copy Link"}
    </button>
  );
};

export default CopyLinkButton;
