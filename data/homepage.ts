/**
 * Homepage content data — hero section, bio, highlights, and discography.
 * Source: jp-site-migration-content-extraction-2026-05-06.md
 * All text content is separated from presentation for easy updates.
 */

/** Hero section heading and bio content */
export const hero = {
  heading:
    "Hi, I'm Jack. Fractional product design partner for businesses since 2009",
  origin: ["Born in Taiwan", "From Australia", "Lives in Austria"],
  bio: "I'm a Product Designer with a passion for creating end-to-end digital solutions that are both functional and beautifully crafted. I deliver great user experiences by applying user-centred design methodologies for a global audience, across different industries, from large multinational companies to innovative startups.",
  highlights: [
    "I have deep experience in the Healthcare and Medical sectors",
    "Works across Environment, Social Impact, Finance, Enterprise Systems, Education",
    "15+ years product design experience",
    "Helping teams turn product ideas into 1.0 and strategies into 2.0",
    "Award-winning teams recognised by the Red Dot Design Award and Good Design Australia",
  ],
  profileImage: "/images/shared/profile-jack-hsu.png",
};

/** Featured work card data — 8 case studies linking to subpages */
export interface FeaturedProject {
  slug: string;
  client: string;
  title: string;
  description: string;
  image: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "cochlear-smart-app",
    client: "Cochlear",
    title: "Nucleus Smart App",
    description:
      "The Nucleus Smart App is a mobile digital assistant for Cochlear implant recipients, letting users control their hearing, check processor health, and track their hearing fitness.",
    image: "/images/cochlear-smart-app/hero-1.png",
  },
  {
    slug: "cochlear-remote-check",
    client: "Cochlear",
    title: "Remote Check",
    description:
      "Remote Check lets Nucleus 7 Cochlear implant users complete at-home hearing tests for their clinician.",
    image: "/images/cochlear-remote-check/hero-1.png",
  },
  {
    slug: "cochlear-smartnav",
    client: "Cochlear",
    title: "Nucleus SmartNav App",
    description:
      "Nucleus SmartNav provides surgeons with live, intraoperative insights into cochlear implant electrode insertion and placement.",
    image: "/images/cochlear-smartnav/hero.png",
  },
  {
    slug: "who-impact",
    client: "WHO",
    title: "IMPACT Clinical Decision Support Tool",
    description:
      "This clinical decision support tool provides evidence-based guidance to enhance patient outcomes and care quality in primary care settings.",
    image: "/images/who-impact/hero.png",
  },
  {
    slug: "who-spdi",
    client: "WHO",
    title: "UHC Service Planning, Delivery & Implementation (SPDI)",
    description:
      "This tool assists countries in designing and implementing comprehensive national health service packages.",
    image: "/images/who-spdi/hero.png",
  },
  {
    slug: "openaq",
    client: "OpenAQ",
    title: "Website & Data Explorer",
    description:
      "OpenAQ offers real-time global air quality data through an interactive map and API.",
    image: "/images/openaq/hero.png",
  },
  {
    slug: "trapeze",
    client: "Trapeze",
    title: "MyDAS",
    description:
      "MyDAS is a tool using performance data to motivate driver behavior and reduce train emissions.",
    image: "/images/trapeze/hero.png",
  },
  {
    slug: "evidation",
    client: "Evidation",
    title: "Evidation app 2.0",
    description:
      "Evidation 2.0 rewards users for sharing health data, facilitating research and providing insights for scientific studies.",
    image: "/images/evidation/hero.png",
  },
];

/** Single discography entry */
export interface DiscographyEntry {
  client: string;
  description: string;
}

/** Discography grouped by year — chronological project history 2009-2024 */
export interface DiscographyYear {
  year: number;
  entries: DiscographyEntry[];
}

export const discography: DiscographyYear[] = [
  {
    year: 2024,
    entries: [
      {
        client: "WHO",
        description:
          "Worked with the integrated health services department, countries, and the WHO academy to create the IMPACT Clinical Decision Support Tool. This clinical decision support system provided clinicians with evidence-based recommendations at the point of care.",
      },
      {
        client: "WHO",
        description:
          "Worked with the Maternal, Newborn, Child & Adolescent Health & Ageing department to develop the MNCAHA Global resource library, a resource repository that brought all internal and external resources into a single point of reference for the WHO.",
      },
      {
        client: "Cochlear",
        description:
          "Worked with cross functional team to develop clinical referral tool to facilitate conversation about the clinician, audiologist and patients in making evident based decisions on hearing interventions to improve hearing outcomes.",
      },
      {
        client: "MyTech",
        description:
          "Explored and conceptualised a digital ID app for the Northern Territory Government.",
      },
    ],
  },
  {
    year: 2023,
    entries: [
      {
        client: "WHO",
        description:
          "Collaborated with health experts around the world to design a dashboard that allowed country health ministries to monitor, prepare for, prevent, and respond to measles outbreaks. The dashboard also facilitated planning and managed donor funding.",
      },
      {
        client: "WHO",
        description:
          "Worked with the integrated health services department to design a clinical planning tool for countries to identify gaps, assess barriers, and outline actions for health services.",
      },
      {
        client: "WHO",
        description:
          "Worked with the universal health care compendium team to design a CMS that enabled collaboration between the WHO and external health experts to publish and update universal health compendium data.",
      },
      {
        client: "MyTech",
        description:
          "Worked with the development team and Northern Territory Government to design the Banded Drinker Register, a kiosk platform that connected all bottle shops across the state to facilitate enforcement for individuals who had an alcohol purchasing quota.",
      },
      {
        client: "OzTix",
        description:
          "Worked with the product team to rethink the user experience of their backend service for event organisers.",
      },
    ],
  },
  {
    year: 2022,
    entries: [
      {
        client: "WHO",
        description:
          "Collaborated with stakeholders to develop a platform that aided countries in monitoring, preparing for, and responding to Covid-19, as well as managing vaccine requests and distribution.",
      },
      {
        client: "WHO",
        description:
          "Designed and developed a digital tool to support countries in identifying, implementing, and tracking their risks, core capabilities, readiness gaps, and anticipatory actions needed to respond to high-priority or imminent threats.",
      },
      {
        client: "WHO",
        description:
          "Worked with country offices to develop the readiness knowledge network to facilitate pandemic knowledge sharing across the globe.",
      },
      {
        client: "WHO",
        description:
          "Worked with HQ and country offices teams to develop an essential readiness guide for all WHO Country Offices to support emergency response.",
      },
      {
        client: "Evidation",
        description:
          "Helped with the exploration and conceptualisation of Evidation 2.0, an app that rewarded users for sharing health data, which facilitated research and provided insights for scientific studies.",
      },
      {
        client: "OpenAQ",
        description:
          "Worked with the CEO and CTO to develop the next generation of their core product, which provided open-source, real-time global air quality data through an interactive map and API.",
      },
    ],
  },
  {
    year: 2021,
    entries: [
      {
        client: "WHO",
        description:
          "Helped to design a tool that supported countries in the development of national investment plans (NIPs) and funding proposals.",
      },
      {
        client: "Monash University",
        description:
          "Supported the team with UI design for their COVID-I Covid intelligence platform.",
      },
      {
        client: "OzTix",
        description:
          "Worked with the product team to rethink the personalised event browsing experience, which enhanced user engagement and simplified event discovery.",
      },
    ],
  },
  {
    year: 2020,
    entries: [
      {
        client: "WHO",
        description:
          "Worked with health experts, countries, and health economics consultants to develop the SPDI platform, a tool that assisted countries in designing and implementing comprehensive national health service packages.",
      },
      {
        client: "Trapeze",
        description:
          "Worked with the CTO and external partners to develop a tool for train drivers that used performance data to motivate driver behaviour and reduce train emissions.",
      },
      {
        client: "Accion",
        description:
          "Worked with a cross-functional team to create Ovante, a platform that used behavioural economics to ensure low-income micro-entrepreneurs in developing countries were set up for success, regardless of their education level or current access to funds.",
      },
      {
        client: "MyTech",
        description:
          "Worked with the management team to design the next-generation integrated offender management system used by law enforcement and prison management facilities for the South Australian Government.",
      },
      {
        client: "FiO",
        description:
          "Helped the founding team explore the use of blockchain in fighting climate change by providing DMRV (digital, monitor, report, verify) carbon reporting for carbon markets and climate change mitigation.",
      },
    ],
  },
  {
    year: 2019,
    entries: [
      {
        client: "One Cash",
        description:
          "Worked with startup founders to design a mobile money service for Yemen, offering financial freedom without a bank account. Users could send money, cash in/out via agents, pay bills, buy airtime, and make instant payments.",
      },
      {
        client: "Get2020",
        description:
          "Worked with the founder to develop and pitch his innovative approach to bringing eye testing and eye prescriptions into corporate environments as a key employee benefit program.",
      },
      {
        client: "Jim's Handyman",
        description:
          "Worked on improving their request a quote experience from the ground up.",
      },
    ],
  },
  {
    year: 2018,
    entries: [
      {
        client: "Cochlear",
        description:
          "Worked with a cross-functional team to design and develop the world's first surgical app that provided surgeons with live, intraoperative insights into cochlear implant electrode insertion and placement.",
      },
      {
        client: "Cochlear",
        description:
          "Worked with a cross-functional team to design and develop the Remote Check app and web platform for Nucleus 7 Cochlear implant users to complete at-home hearing tests for their clinicians.",
      },
      {
        client: "Corin",
        description:
          "Worked with the CTO and a cross-functional team to ideate, conceptualise, and develop their next-generation insights portal for Corin's range of orthopaedic implants, connecting patients, surgeons, and healthcare providers through aggregated clinical and surgical data across every stage of the arthroplasty experience.",
      },
      {
        client: "Art Data",
        description:
          "Designed a bespoke physical art asset management software for high-end art collectors to track and manage their art across the world.",
      },
    ],
  },
  {
    year: 2017,
    entries: [
      {
        client: "Cochlear",
        description:
          "Worked with a cross-functional team to design and develop the world's first mobile app that connected to Cochlear implants.",
      },
      {
        client: "UX Australia",
        description:
          "Spoke at UX Australia, sharing my experiences on the user research methodologies we developed for designing the Cochlear Nucleus Smart app.",
      },
      {
        client: "Naus",
        description:
          "Worked with the founder to develop a cloud-based waste management system that connected waste management plants with fleets or individual waste removal truck drivers.",
      },
      {
        client: "System One",
        description:
          "Worked with the founder to design a platform that connected lab devices to allow diagnostic result tracking for TB, HIV, HCV, Ebola, Zika, and other diseases.",
      },
      {
        client: "Enabled Advisory Group",
        description:
          "Helped the founders to design and develop the RULE FOUR Cost modelling platform to service the mining industry in Australia.",
      },
      {
        client: "New Edge Homes",
        description:
          "Worked with the management team to create a web platform that allowed their home owner candidates to design and customise their dream home.",
      },
      {
        client: "Microsoft",
        description:
          "Worked with a cross-functional team to design a white-labelled Microsoft merchandise software for distribution across their retail partners.",
      },
    ],
  },
  {
    year: 2016,
    entries: [
      {
        client: "World Bank",
        description:
          "Worked with stakeholders in the World Bank and Telenor to research and design a merchant mobile money app that allowed merchants to manage cash flow and facilitate cross-country cash transfers for individuals in Myanmar.",
      },
      {
        client: "Throat Scope",
        description:
          "Worked with the founder to design and develop the companion app to a reusable light attachment that slid onto a single-use tongue depressor. We designed and developed the prototype for field testing and the initial investment pitch; the product went on to launch on Indiegogo.",
      },
      {
        client: "Ramsay Health",
        description:
          "Worked with cross-functional teams to design their new unified web and mobile OS login portal across all their digital products.",
      },
      {
        client: "Laing O'Rourke",
        description:
          "Worked with a cross-functional team to develop an enterprise app that allowed users to easily find and update data on assets, from trucks to scanners to personnel, across the country.",
      },
      {
        client: "Microsoft",
        description:
          "Designed a windows app for Ticketek.",
      },
      {
        client: "Microsoft",
        description:
          "Designed a windows app for Virgin Airline.",
      },
      {
        client: "Microsoft",
        description:
          "Worked with a cross-functional team to design windows app for BT Financial group.",
      },
    ],
  },
  {
    year: 2015,
    entries: [
      {
        client: "World Bank",
        description:
          "Worked with stakeholders in the World Bank and Telenor to research and design for low banking literacy. We brought the first mobile money initiative into Myanmar.",
      },
      {
        client: "Laing O'Rourke",
        description:
          "Worked with a cross-functional team to develop an enterprise project management software for mining projects that incorporated their existing technologies and on-the-ground experience.",
      },
      {
        client: "Reserve Bank of Australia",
        description:
          "Worked with a cross-functional team to develop an enterprise system that monitored the IT infrastructure across the organisation.",
      },
      {
        client: "mPort",
        description:
          "Helped the founder to explore, strategise, and develop their 1.0 companion app to support their innovative 3D body scanner, mPOD, that allowed users to track and manage their health. After launch, mPort secured an $80 million contract with LA Fitness in the US.",
      },
      {
        client: "Coles Financial Services",
        description:
          "Worked with a cross-functional team to develop an enterprise financial monitoring and reporting tool for the Australian retail giant.",
      },
      {
        client: "Microsoft",
        description:
          "Designed a windows app for Honest co.",
      },
    ],
  },
  {
    year: 2014,
    entries: [
      {
        client: "Laing O'Rourke",
        description:
          "Designed and developed their enterprise waste management software that documented and organised the safe disposal of their waste from mining sites across the country.",
      },
      {
        client: "Daktari",
        description:
          "Provided UX and visual design support for their portable CD4 Diagnostic Instrument for use in underserved communities.",
      },
      {
        client: "QuestaGames",
        description:
          "Helped the founding team to strategise and develop incremental improvements to their 1.0 product that gamified crowd-sourced animal and bird species sightings and discovery for scientific research.",
      },
      {
        client: "Peepable",
        description:
          "Helped the founder to develop their first prototype build that auto-transcribed any online video for their second funding round.",
      },
      {
        client: "Bank of Melbourne",
        description:
          "Designed and developed the My World interactive table that facilitated conversations between financial advisers and their customers to help them establish desired financial goals and clearly define how their income and savings could be distributed to achieve those goals.",
      },
      {
        client: "Hardcat",
        description:
          "Worked with their internal team to design the next-generation enterprise asset management software used by police and defence facilities across the country.",
      },
      {
        client: "Telstra",
        description:
          "Worked with a cross-functional team to create their internal HR intranet platform for their employees.",
      },
      {
        client: "ChannelEye",
        description:
          "Worked with the founders to create a white-label mobile app and web dashboard for their customers to engage in and manage their sales campaigns.",
      },
      {
        client: "Fansbuy",
        description:
          "Helped the founder go from a working prototype build to the initial 1.0 product launch.",
      },
      {
        client: "Nutricook",
        description:
          "Helped the founder bring her product idea to life and facilitated validating her idea through prototype development and testing.",
      },
      {
        client: "Orkistra",
        description:
          "Worked with the founder to build a SaaS project management software prototype for an initial funding pitch.",
      },
    ],
  },
  {
    year: 2013,
    entries: [
      {
        client: "Laing O'Rourke",
        description:
          "Worked with cross-functional teams to develop their cross-platform enterprise mobile knowledge database for engineers to use while on duty in mines across the country.",
      },
      {
        client: "Mybellefit.com",
        description:
          "Worked with the founders to create their 1.0 companion app for their range of Postpartum Girdles & Corsets to assist their users in childbirth recovery.",
      },
      {
        client: "Jlan Mobile",
        description:
          "Helped the founding team migrate their desktop software to a mobile platform so their users could automate sales, marketing, route accounting, deliveries, inventory management, and schedules while on the go.",
      },
      {
        client: "Built it beta",
        description:
          "Helped the app development house build a bug tracking app that allowed their customers to easily report and track the progress of software bugs.",
      },
    ],
  },
  {
    year: 2012,
    entries: [
      {
        client: "Cochlear",
        description:
          "Designed and developed the CR210 and CR230 remote for the Cochlear processor.",
      },
      {
        client: "Mizuya",
        description:
          "Worked with the founder to create an innovative touchscreen ordering system for their restaurant chain.",
      },
    ],
  },
  {
    year: 2011,
    entries: [
      {
        client: "Cochlear",
        description:
          "Designed and developed the CR220 intra-operative surgical remote for Cochlear implants.",
      },
      {
        client: "Micropace EP",
        description:
          "Worked with the founder to migrate their line of cardiac stimulator from physical controls to touchscreen controls for Surgeons during surgery.",
      },
    ],
  },
  {
    year: 2010,
    entries: [
      {
        client: "Cochlear",
        description:
          "Designed and developed the CR120 intra-operative surgical remote for Cochlear implants.",
      },
    ],
  },
  {
    year: 2009,
    entries: [
      {
        client: "Cochlear",
        description:
          "Designed and developed the CR110 remote for the Cochlear processor.",
      },
      {
        client: "Nine Entertainment",
        description:
          "Designed and developed the enterprise advertising sales and traffic management system to replace human-error-prone Excel sheets.",
      },
    ],
  },
];
