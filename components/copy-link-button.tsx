"use client";

import React, { useState, useEffect } from 'react';
import {Button} from "@/components/ui/button";
import {CheckCheckIcon, LinkIcon} from "lucide-react";

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

      <Button variant="outline" aria-label="Copy Link" size="icon" onClick={handleCopy} disabled={copied} className={`${copied && 'bg-green-500'}`}>
        {copied ? (<CheckCheckIcon size={16} aria-hidden="true"/>) : (<LinkIcon size={16} aria-hidden="true"/>)}
      </Button>
  );
};

export default CopyLinkButton;
