interface TextPart {
  type: "text";
  content: string;
}

interface SpanPart {
  type: "span";
  content: string;
  className?: string;
}

interface BreakPart {
  type: "break";
}

interface LinkPart {
  type: "link";
  text: string;
  href: string;
  className: string;
  spanClassName: string;
}

type DescriptionPart = TextPart | SpanPart | BreakPart | LinkPart;

interface ContentBox {
  artboard: string;
  riveSource: string;
  riveStateMachine: string;
  keywords: string[];
  descriptionParts: DescriptionPart[];
}

interface ScrollContainerConfig {
  introText: {
    name: string;
    verb: string;
  };
  animatedWords: string[];
  contentBoxes: ContentBox[];
}

interface Config {
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    x: string;
    instagram: string;
    displayTexts: {
      contact: string;
      email: string;
      phone: string;
      linkedin: string;
      x: string;
      instagram: string
    };
  };
  metadata: {
    title: string;
    description: string;
    ogImage: string;
    metadataBase: string; // Added for base URL
  };
  nav: {
    logoPath: string;
    logoAlt: string;
    links: Array<{ text: string; href: string }>;
  };
  common: {
    timezone: string;
  };
  scrollContainer: ScrollContainerConfig;
  footer: {
    sections: {
      findMeOn: {
        title: string;
        links: Array<{ text: string; url: string }>;
      };
      someOfMyWork: {
        title: string;
        projects: Array<{
          name: string;
          url: string;
          logo: string;
          alt: string;
          width: number;
          height: number;
        }>;
      };
      contact: {
        title: string;
        email: string;
        phone: string;
        address: {
          street: string;
          cityZip: string;
        };
      };
      theme: {
        title: string;
      };
    };
    openSource: {
      text: string;
      linkText: string;
      url: string;
    };
    inquiries: {
      text: string;
      linkText: string;
      url: string;
    };
    lastUpdate: string;
  };
}

export const config: Config = {
  contact: {
    email: "mailto:sabieh.ahmed@gmail.com",
    phone: "tel:+421759424205",
    linkedin: "https://linkedin.com/in/sabiehahmed",
    x: "https://x.com/ahmed_sabieh",
    instagram: "https://www.instagram.com/sabiehahmed",
    displayTexts: {
      contact: "contact",
      email: "email",
      phone: "phone",
      linkedin: "linkedin",
      x: "x.com",
      instagram: "instagram"
    },
  },
  metadata: {
    title: "Sabieh Ahmed",
    description: "Digital Craftsman",
    ogImage: "/opengraph-image.png",
    metadataBase: "https://sabiehahmed.com",
  },
  nav: {
    logoPath: "/logo-anim.gif",
    logoAlt: "spinning head animation",
    links: [{ text: "Blog", href: "/blog" }],
  },
  common: {
    timezone: "Europe/Berlin",
  },
  scrollContainer: {
    introText: {
      name: "Sabieh",
      verb: "is",
    },
    animatedWords: ["aware", "cutting-edge", "proficient", "experienced"],
    contentBoxes: [
      {
        artboard: "AWARE",
        riveSource: "/rive/main.riv",
        riveStateMachine: "1",
        keywords: ["leading teams", "comms", "consulting"],
        descriptionParts: [
          { type: "text", content: "I can deal with " },
          { type: "span", content: "hard deadlines" },
          { type: "text", content: " and even harder " },
          { type: "span", content: "business requirements" },
        ],
      },
      {
        artboard: "CUTTING EDGE",
        riveSource: "/rive/main.riv",
        riveStateMachine: "2",
        keywords: ["rewrite", "rebrand", "improve"],
        descriptionParts: [
          { type: "span", content: "I love shiny new tech." },
          { type: "text", content: " But I also know when it\'s better to go with battle-tested solutions instead." },
        ],
      },
      {
        artboard: "PROFICIENT",
        riveSource: "/rive/main.riv",
        riveStateMachine: "3",
        keywords: ["engineering", "design"],
        descriptionParts: [
          { type: "text", content: "I build products and experiences, I work closely with cross functional teams, " },
          { type: "span", content: "Hands-on experience", className: "whitespace-nowrap" },
          { type: "text", content: " is an understatement. " },
          { type: "break" },
          { type: "text", content: "I design, code, and carry product." },
        ],
      },
      {
        artboard: "DARING",
        riveSource: "/rive/main.riv",
        riveStateMachine: "4",
        keywords: ["work", "experience"],
        descriptionParts: [
          { type: "text", content: "I\'m Frontend Engineer at " },
          {
            type: "link",
            text: "TalonOne",
            href: "https://talon.one",
            className: "underline inline-flex dark:text-whiteout/100 gap-1 items-center font-semibold text-blackout/100",
            spanClassName: "dark:text-zinc-100 text-blackout whitespace-nowrap"
          },
          { type: "text", content: "  \n a company which power real-time, personalized, and future-proofed promotions" },
        ],
      },
    ],
  },
  footer: {
    sections: {
      findMeOn: {
        title: "Find me on",
        links: [
          { text: "LinkedIn", url: "https://linkedin.com/in/sabiehahmed" },
          { text: "GitHub", url: "https://github.com/sabieh-ahmed" },
          { text: "Instagram", url: "https://instagram.com/sabiehahmed" },
          { text: "Facebook", url: "https://facebook.com/sabiehahmed" },
          { text: "500px", url: "https://500px.com/p/sabiehahmed?view=photos" },
        ],
      },
      someOfMyWork: {
        title: "Some of my work",
        projects: [
          {
            name: "drive careem",
            url: "https://drive.careem.com",
            logo: "/logos/careem.png",
            alt: "drive careem",
            width: 19,
            height: 19,
          },
          {
            name: "powerschool",
            url: "https://www.powerschool.com/",
            logo: "/logos/powerschool.png",
            alt: "powerschool",
            width: 15,
            height: 15,
          },
          {
            name: "finmark",
            url: "https://finmark.com/m",
            logo: "/logos/finmark.png",
            alt: "finmark",
            width: 25,
            height: 25,
          },
          {
            name: "bill",
            url: "https://bill.com",
            logo: "/logos/bill.png",
            alt: "bill",
            width: 20,
            height: 20,
          },
          {
            name: "unfoldz",
            url: "https://unfoldz.ai",
            logo: "/logos/unfoldz.png",
            alt: "unfoldz",
            width: 20,
            height: 20,
          },
        ],
      },
      contact: {
        title: "Contact",
        email: "sabieh.ahmed@gmail.com",
        phone: "+421759424205",
        address: {
          street: "Berlin, Germany",
          cityZip: "",
        },
      },
      theme: {
        title: "Theme",
      },
    },
    openSource: {
      text: "this site is",
      linkText: "open source",
      url: "https://github.com/sabieh-ahmed/website-v3",
    },
    inquiries: {
      text: "if you have questions or inquiries,",
      linkText: "reach out",
      url: "mailto:sabieh.ahmed@gmail.com",
    },
    lastUpdate: "last update: 18.05.2025",
  },
};
