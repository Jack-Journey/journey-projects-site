/**
 * Content data for Cochlear Remote Check case study.
 * Source: jp-site-project-pages-extraction-2026-05-06.md
 */

import { ProjectData } from "@/data/types";

const cochlearRemoteCheck: ProjectData = {
  slug: "cochlear-remote-check",
  client: "Cochlear",
  title: "Remote Check",
  context:
    "According to World Health Organisation figures, over 460 million people worldwide suffer from disabling hearing loss. The challenge: transform hearing healthcare to enable clinics treating more patients while maintaining professional care.",
  description:
    "Remote Check enables Cochlear Nucleus 7 Sound Processor recipients to complete hearing tests at home via mobile device using Nucleus Smart App. Results transmit remotely to clinics for clinician review. Benefits: frees clinic time, prioritized care, no work/school absences, eliminates travel costs.",
  heroImage: "/images/cochlear-remote-check/hero-1.png",
  metadata: {
    platform: ["iOS", "Android", "Web app"],
    services: [
      "UX Design",
      "UI Design",
      "Strategy (v1.0)",
      "User Research",
      "Prototyping",
      "User Testing",
      "Design System",
    ],
    tools: [
      "Pen & paper",
      "Miro",
      "Balsamiq",
      "Figma",
      "Adobe After Effects",
    ],
    awards: ["Good Design Australia"],
    link: {
      label: "Remote Check @ Cochlear",
      url: "https://www.cochlear.com/au/en/home/ongoing-care-and-support/product-support/nucleus-smart-app/remote-check",
    },
  },
  journey: {
    teamSize: "4 designers, cross-functional",
    duration: "2+ years",
    launchDate: "2018 - current",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Wireframes",
      images: [
        "/images/cochlear-remote-check/wireframes-1.png",
        "/images/cochlear-remote-check/wireframes-2.png",
      ],
    },
    {
      title: "Remote Check for Recipients",
      images: [
        "/images/cochlear-remote-check/recipients-1.png",
        "/images/cochlear-remote-check/recipients-2.png",
        "/images/cochlear-remote-check/recipients-3.png",
        "/images/cochlear-remote-check/recipients-4.png",
        "/images/cochlear-remote-check/recipients-5.png",
        "/images/cochlear-remote-check/recipients-6.png",
      ],
    },
    {
      title: "Remote Check for Clinicians",
      images: [
        "/images/cochlear-remote-check/clinicians-1.png",
        "/images/cochlear-remote-check/clinicians-2.png",
        "/images/cochlear-remote-check/clinicians-3.png",
      ],
    },
  ],
};

export default cochlearRemoteCheck;
