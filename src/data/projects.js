export const projects = [
  {
    id: "01",
    slug: "medora",
    index: "01",
    name: "Medora",
    category: "Healthcare Platform",
    description:
      "A patient-scheduling and records platform built for clinics managing thousands of appointments a week.",
    tech: ["React", "PostgreSQL", "AWS"],
    gradient: "from-emerald-700/40 via-ink-800 to-ink-900",
  },
  {
    id: "02",
    slug: "nova",
    index: "02",
    name: "Nova",
    category: "E-commerce Platform",
    description:
      "A headless commerce engine handling inventory, checkout, and fulfillment across three storefronts.",
    tech: ["Next.js", "Stripe", "Supabase"],
    gradient: "from-emerald-600/30 via-ink-800 to-ink-900",
  },
  {
    id: "03",
    slug: "flow",
    index: "03",
    name: "Flow",
    category: "Business Management System",
    description:
      "An operations dashboard that replaced six spreadsheets with one live view of the business.",
    tech: ["TypeScript", "Node.js", "Docker"],
    gradient: "from-emerald-800/40 via-ink-800 to-ink-900",
  },
  {
    id: "04",
    slug: "pulse",
    index: "04",
    name: "Pulse",
    category: "Analytics Dashboard",
    description:
      "Real-time product analytics built for teams that needed answers faster than their old BI tool allowed.",
    tech: ["React", "Go", "ClickHouse"],
    gradient: "from-emerald-700/30 via-ink-800 to-ink-900",
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(currentId) {
  const currentIndex = projects.findIndex(
    (project) => project.id === currentId
  );

  return {
    previous:
      currentIndex > 0 ? projects[currentIndex - 1] : null,
    next:
      currentIndex >= 0 && currentIndex < projects.length - 1
        ? projects[currentIndex + 1]
        : null,
  };
}