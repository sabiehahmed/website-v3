"use client";

import React from 'react';

interface SocialShareButtonsProps {
  title: string;
  url: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ title, url }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      className: "bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-150 ease-in-out",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      className: "bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-150 ease-in-out",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-150 ease-in-out",
    },
  ];

  return (
    <>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={link.className}
        >
          Share on {link.name}
        </a>
      ))}
    </>
  );
};

export default SocialShareButtons;
