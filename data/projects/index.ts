/**
 * Central index of all project case study data.
 * Used by the dynamic [slug] route to look up project content.
 */

import { ProjectData } from "@/data/types";
import cochlearSmartApp from "./cochlear-smart-app";
import cochlearRemoteCheck from "./cochlear-remote-check";
import cochlearSmartnav from "./cochlear-smartnav";
import whoImpact from "./who-impact";
import whoSpdi from "./who-spdi";
import openaq from "./openaq";
import trapeze from "./trapeze";
import evidation from "./evidation";

/** All projects keyed by slug for O(1) lookup in dynamic routes */
export const projectsBySlug: Record<string, ProjectData> = {
  "cochlear-smart-app": cochlearSmartApp,
  "cochlear-remote-check": cochlearRemoteCheck,
  "cochlear-smartnav": cochlearSmartnav,
  "who-impact": whoImpact,
  "who-spdi": whoSpdi,
  openaq: openaq,
  trapeze: trapeze,
  evidation: evidation,
};

/** All project slugs — used by generateStaticParams for static export */
export const allProjectSlugs: string[] = Object.keys(projectsBySlug);

/** All projects as an array — used when iteration order matters */
export const allProjects: ProjectData[] = Object.values(projectsBySlug);
