import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import Image from "next/legacy/image";
import { config } from "../lib/config";
import React from "react";

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <footer className="flex justify-center w-full flex-col items-center ">
      <div className="fixed bottom-0 w-full z-50">
        <svg
          className="hidden md:block absolute bottom-0 right-0 rotate-180 z-50 md:absolute "
          width="53"
          height="52"
          viewBox="0 0 53 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="dark:fill-black fill-blackout"
            d="M0 -5.35442e-05H52.1C52.1 -5.35442e-05 24.8947 -0.434101 12.4473 12.7519C2.67029e-05 25.938 0 51.8759 0 51.8759V-5.35442e-05Z"
          />
        </svg>

        <svg
          className="hidden md:block absolute left-0 bottom-0 -scale-x-100 rotate-180 z-50"
          width="53"
          height="52"
          viewBox="0 0 53 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="dark:fill-black fill-blackout"
            d="M0 -5.35442e-05H52.1C52.1 -5.35442e-05 24.8947 -0.434101 12.4473 12.7519C2.67029e-05 25.938 0 51.8759 0 51.8759V-5.35442e-05Z"
          />
        </svg>
      </div>
      <div className="bg-blackout p-20 pb-10 rounded-2xl mb-4 md:mb-20 text-whiteout flex flex-col gap-20 md:gap-0 items-center md:items-start md:grid md:grid-cols-4">
        <div className="w-[200px] flex flex-col items-center text-center md:items-start md:text-start">
          <h2 className="text-lg font-semibold">{config.footer.sections.findMeOn.title}</h2>
          <ul className="font-light gap-1 flex flex-col mt-2">
            {config.footer.sections.findMeOn.links.map((link) => (
              <li key={link.url}>
                <Link
                  className="transition-opacity opacity-75 hover:opacity-100"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={link.url}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[200px] flex flex-col text-center md:items-start md:text-start">
          <h2 className="text-lg font-semibold">{config.footer.sections.someOfMyWork.title}</h2>
          <ul className="font-light gap-1 flex flex-col items-center md:items-start mt-2">
            {config.footer.sections.someOfMyWork.projects.map((project) => (
              <li key={project.url}>
                <Link
                  className="transition-opacity flex items-center gap-2 opacity-75 hover:opacity-100"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={project.url}
                >
                  <div className="w-[20px] h-[20px] flex items-center justify-center">
                    <Image
                      alt={project.alt}
                      className=""
                      src={project.logo}
                      width={project.width}
                      height={project.height}
                    ></Image>
                  </div>
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 flex justify-end text-center md:items-start md:text-start">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{config.footer.sections.contact.title}</h2>
            <div className=" font-light mt-2">
              <Link
                className="opacity-50 transition-opacity hover:opacity-100"
                href={`mailto:${config.footer.sections.contact.email}`}
              >
                {config.footer.sections.contact.email}
              </Link>
              <p>
                <Link
                  className="opacity-50 transition-opacity hover:opacity-100"
                  href={`tel:${config.footer.sections.contact.phone}`}
                >
                  {config.footer.sections.contact.phone}
                </Link>
              </p>
              <div
                rel="noopener noreferrer"
                className="opacity-50"
              >
                <p className="mt-2">{config.footer.sections.contact.address.street}</p>
                <p>{config.footer.sections.contact.address.cityZip}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 md:mt-20 text-center md:items-start md:text-start md:-order-none order-first">
          <h2 className="font-semibold mb-2">{config.footer.sections.theme.title}</h2>
          <div>
            <ThemeToggle />
          </div>
        </div>

        <div className="col-span-4 md:mt-10 text-sm text-center md:text-start">
          <div className="text-whiteout/50">
            {config.footer.openSource.text}{" "}
            <Link
              className="underline decoration-2 text-whiteout/75 hover:text-whiteout/100"
              href={config.footer.openSource.url}
            >
              {config.footer.openSource.linkText}
            </Link>
          </div>
          <div className="flex justify-between flex-wrap items-baseline text-center md:text-start">
            <p className="text-whiteout/50 md:w-auto w-full">
              {config.footer.inquiries.text}{" "}
              <Link
                href={config.footer.inquiries.url}
                className="underline decoration-2 text-whiteout/75 hover:text-whiteout/100"
              >
                {config.footer.inquiries.linkText}
              </Link>
            </p>
            <p className="text-xs opacity-50 text-center w-full mt-10 md:mt-0 md:w-auto">
              {config.footer.lastUpdate}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
