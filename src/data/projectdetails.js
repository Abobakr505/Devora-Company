export const projects = [
  {
    id: 1,
    slug: "devora-agency",
    index: "01",
    name: "Devora Agency",
    category: "Web Design & Development",
    gradient: "from-emerald-500/20 via-ink-900 to-ink-950",
    description:
      "A complete marketing platform with a dark visual identity and smooth transitions.",
    longDescription:
      "A complete digital agency website focused on speed, user experience, and interactive scroll animations.",
    year: "2025",
    role: "Design & Frontend Development",
    client: "Devora",
    duration: "6 weeks",
    tech: ["React", "Tailwind CSS", "GSAP", "Framer Motion"],
    heroImage: "/images/projects/devora/hero.jpg",
    gallery: [
      "/images/projects/devora/1.jpg",
      "/images/projects/devora/2.jpg",
      "/images/projects/devora/3.jpg",
    ],
    challenge:
      "Create a distinctive visual experience for a modern technology brand without sacrificing performance.",
    solution:
      "Progressive image loading and scroll-progress animations were used instead of heavy onLoad animations.",
    results: [
      { label: "Loading speed improvement", value: "+42%" },
      { label: "Engagement rate", value: "+65%" },
      { label: "Session duration", value: "+3.2 min" },
    ],
    links: {
      live: "https://example.com",
      github: "",
    },
    ar: {
      name: "وكالة ديفورا",
      category: "تصميم وتطوير المواقع",
      description: "منصة تسويقية متكاملة بهوية بصرية داكنة وحركات انتقالية سلسة.",
      longDescription:
        "تصميم وتطوير موقع تعريفي كامل لوكالة رقمية، مع التركيز على السرعة، تجربة المستخدم، والحركات التفاعلية عند التمرير.",
      duration: "6 أسابيع",
      challenge:
        "الهدف كان إنشاء تجربة بصرية مميزة تعكس هوية علامة تقنية حديثة دون التضحية بالأداء.",
      solution:
        "تم استخدام تحميل تدريجي للصور، وأنميشن مبني على scroll progress بدلاً من animation ثقيلة على الحدث onLoad.",
      results: [
        { label: "تحسن سرعة التحميل", value: "+42%" },
        { label: "معدل التفاعل", value: "+65%" },
        { label: "مدة الجلسة", value: "+3.2 دقيقة" },
      ],
    },
  },
];

export function getProjectBySlug(slug, lang = "en") {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return undefined;

  return lang === "ar" ? { ...project, ...project.ar } : project;
}

export function getProjects(lang = "en") {
  return projects.map((project) =>
    lang === "ar" ? { ...project, ...project.ar } : project
  );
}

export function getAdjacentProjects(currentSlug, lang = "en") {
  const currentIndex = projects.findIndex(
    (project) => project.slug === currentSlug
  );

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  const localize = (project) =>
    lang === "ar" ? { ...project, ...project.ar } : project;

  return {
    previous:
      currentIndex > 0 ? localize(projects[currentIndex - 1]) : null,
    next:
      currentIndex < projects.length - 1
        ? localize(projects[currentIndex + 1])
        : null,
  };
}
