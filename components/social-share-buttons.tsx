"use client";

import React from 'react';
import {Button} from "@/components/ui/button";
import {RiFacebookFill, RiGithubFill, RiGoogleFill, RiLinkedinFill, RiTwitterXFill} from "@remixicon/react";
import {LinkIcon} from "lucide-react";

interface SocialShareButtonsProps {
    title: string;
    url: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({title, url}) => {
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
            <div className="inline-flex flex-wrap gap-2">
                <Button variant="outline" aria-label="Share to Facebook" size="icon" onClick={() => window.open(shareLinks[0].url, "_blank")}>
                    <RiFacebookFill size={16} aria-hidden="true"/>
                </Button>
                <Button variant="outline" aria-label="Share to X" size="icon" onClick={() => window.open(shareLinks[1].url, "_blank")}>
                    <RiTwitterXFill size={16} aria-hidden="true"/>
                </Button>
                <Button variant="outline" aria-label="Share to LinkedIn" size="icon" onClick={() => window.open(shareLinks[2].url, "_blank")}>
                    <RiLinkedinFill size={16} aria-hidden="true"/>
                </Button>
            </div>
        </>
    );
};

export default SocialShareButtons;
