export interface TextPart {
    type: "text";
    content: string;
  }
  
export  interface SpanPart {
    type: "span";
    content: string;
    className?: string;
  }
  
export  interface BreakPart {
    type: "break";
  }
  
 export interface LinkPart {
    type: "link";
    text: string;
    href: string;
    className: string;
    spanClassName: string;
  }
  
export  type DescriptionPart = TextPart | SpanPart | BreakPart | LinkPart;
  
  export interface ContentBox {
    artboard: string;
    riveSource: string;
    riveStateMachine: string;
    keywords: string[];
    descriptionParts: DescriptionPart[];
  }
  
  export interface ScrollContainerConfig {
    introText: {
      name: string;
      verb: string;
    };
    animatedWords: string[];
    contentBoxes: ContentBox[];
  }
  
  export interface Config {
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
    };
    nav: {
      logoPath: string;
      logoAlt: string;
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

export interface BlogPostMetadata {
  slug: string;
  title: string;
  date: string; // e.g., "YYYY-MM-DD"
  featureImage: string; // URL or path to the image
  excerpt: string;
  author?: string; // Optional
}