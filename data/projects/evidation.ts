import { ProjectData } from "@/data/types";

const evidation: ProjectData = {
  slug: "evidation",
  client: "Evidation",
  title: "Evidation app 2.0",
  context: [
    "The Evidation 1.0 Achievement platform measures health in daily life, enabling millions to participate in groundbreaking research. Prioritizing user privacy and control, it generates rapid and extensive health data that Evidation uses to partner with healthcare companies. This collaboration helps to understand health and disease outside of traditional clinical settings.",
  ],
  description: [
    "The Evidation 2.0 app rewards users for engaging in healthy behaviors and sharing their health data, enabling them to earn points for activities like walking and sleeping. These points can be redeemed for cash, gift cards, or charitable donations. The app also connects with other health and fitness apps and wearables to track activity and provides personalized health insights. By participating in Evidation, users contribute to health and life sciences research, supporting studies on various health conditions from heart disease to mental wellness.",
  ],
  heroImage: "/images/evidation/hero.png",
  metadata: {
    platform: ["iOS", "Android"],
    services: ["Ux design", "Strategy", "Prototyping", "2.0"],
    tools: ["Pen & paper", "Figma jam", "Figma"],
    link: {
      label: "evidation.com",
      url: "https://evidation.com",
    },
  },
  journey: {
    text: "Working within a team of 2 designers, collaborate with cross-functional teams, including product owners, developers, and stakeholders outside of Evidation, this project took 3 months launched in 2022 - current.",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Conceptualisation",
      images: ["/images/evidation/conceptualisation-2.png"],
    },
    {
      title: "Building out key concepts",
      images: [
        "/images/evidation/wireframes-2.png",
        "/images/evidation/conceptualisation-3.png",
        "/images/evidation/conceptualisation-1.png",
      ],
    },
    {
      title: "Wireframes",
      images: ["/images/evidation/wireframes-1.png"],
    },
  ],
};

export default evidation;
