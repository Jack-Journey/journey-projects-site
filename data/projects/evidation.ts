/**
 * Content data for Evidation App 2.0 case study.
 * Source: jp-site-project-pages-extraction-2026-05-06.md
 */

import { ProjectData } from "@/data/types";

const evidation: ProjectData = {
  slug: "evidation",
  client: "Evidation",
  title: "Evidation app 2.0",
  context:
    "Evidation 1.0 Achievement platform enables millions to participate in health research while prioritizing user privacy. It generates health data shared with healthcare partners.",
  description:
    "Version 2.0 incentivizes healthy behavior and health data sharing. Users earn points through activities like walking and sleeping, redeemable for cash, gift cards, or donations. It integrates with health and fitness apps and wearables.",
  heroImage: "/images/evidation/hero.png",
  metadata: {
    platform: ["iOS", "Android"],
    services: ["UX Design", "Strategy", "Prototyping", "2.0"],
    tools: ["Pen & paper", "FigJam", "Figma"],
    link: {
      label: "evidation.com",
      url: "https://evidation.com",
    },
  },
  journey: {
    teamSize: "2 designers, cross-functional",
    duration: "3 months",
    launchDate: "2022 - current",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Conceptualisation",
      images: [
        "/images/evidation/conceptualisation-1.png",
        "/images/evidation/conceptualisation-2.png",
        "/images/evidation/conceptualisation-3.png",
      ],
    },
    {
      title: "Wireframes",
      images: [
        "/images/evidation/wireframes-1.png",
        "/images/evidation/wireframes-2.png",
      ],
    },
  ],
};

export default evidation;
