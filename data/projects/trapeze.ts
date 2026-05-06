/**
 * Content data for Trapeze MyDAS case study.
 * Source: jp-site-project-pages-extraction-2026-05-06.md
 */

import { ProjectData } from "@/data/types";

const trapeze: ProjectData = {
  slug: "trapeze",
  client: "Trapeze",
  title: "MyDAS",
  context:
    "Trapeze's Driving Advice System helps train operators reduce energy consumption by optimizing acceleration and braking. It delivers ten percent or more fuel cost reductions. The opportunity: a companion app for drivers outside scheduled driving times.",
  description:
    "MyDAS is a web-based analytics platform monitoring driver performance including speed compliance and energy consumption. Businesses establish incentive programs leveraging verified performance data.",
  heroImage: "/images/trapeze/hero.png",
  metadata: {
    platform: ["Web app"],
    services: [
      "UX Design",
      "UI Design (1.0)",
      "Strategy",
      "User research",
      "Prototyping",
      "User testing",
    ],
    tools: ["Pen & paper", "FigJam", "Figma"],
    link: {
      label: "Trapeze MyDAS",
      url: "https://trapezegroup.com.au/rail/driving-advice-system/mydas/",
    },
  },
  journey: {
    teamSize: "Cross-functional",
    duration: "6 months",
    launchDate: "2022 - current",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Conceptualisation",
      images: [
        "/images/trapeze/conceptualisation-1.png",
        "/images/trapeze/conceptualisation-2.png",
        "/images/trapeze/conceptualisation-3.png",
      ],
    },
    {
      title: "Finalising Design for Development",
      images: [
        "/images/trapeze/finalising-1.png",
        "/images/trapeze/finalising-2.png",
        "/images/trapeze/finalising-3.png",
      ],
    },
  ],
};

export default trapeze;
