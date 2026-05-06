/**
 * Content data for WHO IMPACT case study.
 * Source: jp-site-project-pages-extraction-2026-05-06.md
 */

import { ProjectData } from "@/data/types";

const whoImpact: ProjectData = {
  slug: "who-impact",
  client: "WHO",
  title: "IMPACT Clinical Decision Support Tool",
  context:
    "WHO develops clinical decision support systems and resources to improve patient care, especially in lower-resource settings. The aim: establish a digital platform for countries and partners to access and distribute clinical decision support tools.",
  description:
    "IMPACT (Integrated Management for Prevention and Control Tool) is a clinical decision support system delivering evidence-based recommendations at point-of-care. It provides tailored guidance on diagnostics, treatment plans, and preventive measures. Goals: improve outcomes, reduce errors, and promote guideline adherence.",
  heroImage: "/images/who-impact/hero.png",
  metadata: {
    platform: ["Progressive web app"],
    services: [
      "UX design",
      "UI design",
      "Strategy",
      "Pitch",
      "User research",
      "Prototyping",
      "User testing",
      "Design system",
    ],
    tools: ["Pen & paper", "FigJam", "Figma"],
    link: {
      label: "Pilot currently in progress",
      url: "https://www.youtube.com/results?search_query=WHO+IMPACT+clinical+decision+support",
    },
  },
  journey: {
    teamSize: "2 designers, cross-functional",
    duration: "1.5+ years",
    launchDate: "2024 - current",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Workshops",
      images: [
        "/images/who-impact/workshops-1.png",
        "/images/who-impact/workshops-2.png",
      ],
    },
    {
      title: "Conceptualisation",
      images: ["/images/who-impact/conceptualisation.png"],
    },
    {
      title: "Refining Concepts and Schematics",
      images: [
        "/images/who-impact/refining-1.png",
        "/images/who-impact/refining-2.png",
      ],
    },
    {
      title: "Wireframe and Prototype",
      images: [
        "/images/who-impact/wireframe-prototype-1.png",
        "/images/who-impact/wireframe-prototype-2.png",
      ],
    },
    {
      title: "Final UI Design and Prototype Ready for Content",
      images: [
        "/images/who-impact/final-ui-1.png",
        "/images/who-impact/final-ui-2.png",
      ],
    },
  ],
};

export default whoImpact;
