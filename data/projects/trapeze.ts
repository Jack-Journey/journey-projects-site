import { ProjectData } from "@/data/types";

const trapeze: ProjectData = {
  slug: "trapeze",
  client: "Trapeze",
  title: "MyDAS - Driving Advice System module",
  context: [
    "DAS is Trapeze's Driving Advice System, which helps train drivers reduce the energy used to complete journeys by optimising braking and acceleration. This keeps trains running on time while reducing fuel costs by ten percent or more and decreasing carbon emissions.",
    "Trapeze saw an opportunity to introduce a companion application that drivers can access outside of their driving schedules. This application offers drivers the opportunity to prepare for their next drive or review their previous one, helping them recognize which behaviors lead to better engagement with the DAS.",
  ],
  description: [
    "MyDAS is a web-based tool that enhances train operations by providing performance analytics and insights. It tracks driver performance, including speed compliance and energy use, which helps to improve efficiency and reduce carbon emissions.",
    "Operators can implement incentive programs using verifiable data, motivating drivers to follow best practices. MyDAS also offers trip preparation tools and integrates with business intelligence systems for data-driven decision-making.",
  ],
  heroImage: "/images/trapeze/hero.png",
  metadata: {
    platform: ["Web app"],
    services: [
      "Ux design",
      "Ui design",
      "Strategy",
      "User research",
      "Prototyping",
      "User testing",
    ],
    tools: ["Pen & paper", "Figma jam", "Figma"],
    link: {
      label: "Driving Advice System module",
      url: "https://trapezegroup.com.au/rail/driving-advice-system/mydas/",
    },
  },
  keyBenefits: {
    items: [
      "For Users: Improved driving performance, financial incentives, and better trip planning.",
      "For Businesses: Reduced fuel costs, optimized scheduling, and enhanced customer satisfaction.",
    ],
    summary:
      "MyDAS drives efficiency, sustainability, and reliability in rail transport.",
  },
  journey: {
    text: "Collaborate with cross-functional teams, including product owners, developers, and stakeholders outside of Trapeze, this project took 6 months. 1.0 launched in 2022 - current.",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Conceptualisation",
      images: ["/images/trapeze/finalising-3.png"],
    },
    {
      title: "Building out key concepts",
      images: ["/images/trapeze/finalising-2.png"],
    },
    {
      title: "Building out the schematics and finalising concepts",
      images: [
        "/images/trapeze/finalising-1.png",
        "/images/trapeze/conceptualisation-1.png",
      ],
    },
    {
      title: "Finalising design ready for development",
      images: [
        "/images/trapeze/conceptualisation-3.png",
        "/images/trapeze/conceptualisation-2.png",
      ],
    },
  ],
};

export default trapeze;
