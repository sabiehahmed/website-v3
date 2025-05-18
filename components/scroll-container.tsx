"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ContentBox from "./content-box";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";
import useFaviconAnimation from "@/lib/use-favicon-animation";
import { ExternalLink } from "lucide-react";
import { config } from "@/lib/config";

interface ScrollContainerProps {}

const WORDS = config.scrollContainer.animatedWords;

const ScrollContainer = ({}: ScrollContainerProps) => {
  useFaviconAnimation();
  const [activeContentBoxIndex, setActiveContentBoxIndex] = useState(0);
  const debouncedActiveContentIndex = useDebounce(activeContentBoxIndex, 300);

  return (
    <div className="relative w-full md:mb-[200px] max-w-screen flex flex-col items-center">
      <div className="relative">
        <div className="sticky z-20 top-[33vh] left-0 pl-4 md:pl-0 translate-x-0 lg:translate-x-[100px] md:translate-x-[130px] max-w-[792px] w-full flex justify-center">
          <div className="flex gap-1.5 md:gap-4 relative md:-translate-x-[230px] w-full text-[22px] md:text-[32px] font-semibold items-baseline left-0 ">
            <div className="flex md:gap-4 gap-1.5 items-baseline">
              {config.scrollContainer.introText.name}{" "}
              <span className="opacity-50 text-lg md:text-[22px]">
                {config.scrollContainer.introText.verb}
              </span>{" "}
            </div>
            <div className="relative leading-normal h-[22px] md:h-[33px]">
              <div>
                <div className="absolute h-full flex whitespace-nowrap top-0 left-0 ">
                  <div>
                    <AnimatePresence initial={false}>
                      {WORDS.map((word, i) => {
                        if (i === activeContentBoxIndex)
                          return (
                            <motion.div
                              className="absolute left-0 top-0  rounded-lg"
                              key={word + i}
                              initial={{
                                x: -20,
                                y: -12,
                                rotate: 0,
                                opacity: 0,
                                scale: 0.95,
                              }}
                              animate={{
                                x: [-10, 6, 0],
                                y: [-6, 4, 0],
                                rotate: 0,
                                scale: 1,
                                opacity: [0, 1, 1, 1, 1],
                                transition: {
                                  ease: "easeInOut",
                                  delay: 0.24,
                                  duration: 0.2,
                                },
                              }}
                              exit={{
                                x: 20,
                                y: -20,
                                rotate: -4,
                                opacity: 0,
                                scale: 0.95,
                                transition: {
                                  ease: "easeInOut",
                                  duration: 0.2,
                                },
                              }}
                            >
                              <div className="absolute origin-center h-full z-0 backdrop-blur-[2px] w-[110%] rounded-full"></div>
                              <div className="text-[20px] md:text-[30px] relative z-10">
                                {word}
                              </div>
                            </motion.div>
                          );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="flex min-h-screen flex-col justify-between ">
          <section className="max-w-[792px] w-full mt-[35vh] relative">
            <div className="h-full right-0 top-0 absolute w-[12%] bg-gradient-to-l  dark:from-zinc-900 from-whiteout to-transparent z-20" />
            <ul>
              {config.scrollContainer.contentBoxes.map((box, index) => (
                <ContentBox
                  key={index}
                  setActiveIndex={setActiveContentBoxIndex}
                  activeIndex={debouncedActiveContentIndex}
                  index={index}
                  artboard={box.artboard}
                  riveSource={box.riveSource}
                  riveStateMachine={box.riveStateMachine}
                  keywords={box.keywords}
                >
                  <p className="text-lg leading-normal md:text-[22px] max-w-[500px] dark:text-zinc-100/50 text-blackout/50 font-medium">
                    {box.descriptionParts.map((part, partIndex) => {
                      if (part.type === "text") {
                        return <React.Fragment key={partIndex}>{part.content}</React.Fragment>;
                      }
                      if (part.type === "span") {
                        return (
                          <span
                            key={partIndex}
                            className={`dark:text-zinc-100 text-blackout ${part.className || ''}`}
                          >
                            {part.content}
                          </span>
                        );
                      }
                      if (part.type === "break") {
                        return <br key={partIndex} />;
                      }
                      if (part.type === "link") {
                        return (
                          <span key={partIndex} className={part.spanClassName}>
                            <Link
                              href={part.href}
                              target="_blank"
                              className={part.className}
                            >
                              {part.text}
                              <ExternalLink strokeWidth={3} width={20} />
                            </Link>
                          </span>
                        );
                      }
                      return null;
                    })}
                  </p>
                </ContentBox>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <div className="">
        <div className="bg-gradient-to-t w-full h-40 from-whiteout dark:from-zinc-900 dark:via-zinc-900 via-whiteout to-transparent absolute left-0 bottom-0 z-30" />
      </div>
    </div>
  );
};

export default ScrollContainer;