import { ProjectData } from "@/data/types";

const openaq: ProjectData = {
  slug: "openaq",
  client: "OpenAQ",
  title: "Website & Data explorer",
  context: [
    "OpenAQ is a nonprofit organisation providing universal access to air quality data to empower a global community of change-makers to solve air inequality—the unequal access to clean air.",
  ],
  description: [
    "OpenAQ’s website offers an innovative user interface that enhances the user experience by providing intuitive access to global air quality data.",
    "The homepage features the OpenAQ Data Explorer, an interactive map that allows users to explore real-time pollution levels across various locations effortlessly. Clear navigation menus direct visitors to resources such as the Air Quality Index Hub and API access, catering to both general users and developers.",
    "The design emphasises accessibility and engagement, empowering a global community to address air inequality through open data.",
  ],
  heroImage: "/images/openaq/hero.png",
  metadata: {
    platform: ["Responsive Web app"],
    services: [
      "Ux design",
      "Ui design",
      "Strategy",
      "Pitch",
      "User research",
      "Prototyping",
      "User testing",
      "Design system",
    ],
    tools: ["Pen & paper", "Figma jam", "Figma"],
    link: {
      label: "openaq.org",
      url: "https://openaq.org",
    },
  },
  journey: {
    text: "Working within a team of 2 designers, collaborate with cross-functional teams, including product owners, developers, and stakeholders outside of OpenAQ, this project took 6 months. 2.0 launched in 2022 - current.",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Initial audit and stakeholder workshop for 1.0",
      images: ["/images/openaq/audit-workshop.png"],
    },
    {
      title: "2.0 UI design concepts",
      images: [
        "/images/openaq/handover-2.png",
        "/images/openaq/ui-concepts-3.png",
        "/images/openaq/handover-3.png",
        "/images/openaq/design-system.png",
        "/images/openaq/ui-concepts-1.png",
        "/images/openaq/ui-concepts-4.png",
      ],
    },
    {
      title: "Building out design system for 2.0",
      images: ["/images/openaq/ui-concepts-5.png"],
    },
    {
      title: "Design finalised hand over for development",
      images: [
        "/images/openaq/ui-concepts-2.png",
        "/images/openaq/handover-4.png",
        "/images/openaq/handover-5.png",
        "/images/openaq/ui-concepts-6.png",
        "/images/openaq/handover-1.png",
      ],
    },
  ],
};

export default openaq;
