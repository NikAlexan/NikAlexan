export type Locale = "ru" | "en";

type Service = {
  title: string;
  description: string;
  iconPath: string;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type Social = {
  label: string;
  href: string;
};

type SiteContent = {
  locale: Locale;
  meta: {
    title: string;
    description: string;
    url: string;
    ogImage: string;
  };
  nav: {
    logo: string;
    homeHref: string;
    links: { label: string; href: string }[];
    cta: { label: string; href: string };
  };
  hero: {
    name: string;
    tagline: string;
    description: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    note: string;
    cardKicker: string;
    cardTitle: string;
    cardText: string;
    cardChips: string[];
  };
  about: {
    title: string;
    body: string;
    bullets: string[];
    jokes: string[];
    stack: { label: string; items: string[] }[];
    availability: string;
  };
  services: {
    title: string;
    items: Service[];
  };
  projects: {
    title: string;
  };
  petProjects: {
    title: string;
    note: string;
  };
  testimonials: {
    title: string;
    items: Testimonial[];
  };
  contact: {
    title: string;
    blurb: string;
    formEnabled: boolean;
    form: {
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submitLabel: string;
    };
    socials: Social[];
  };
  ui: {
    home: string;
    navigation: string;
    location: string;
    availability: string;
    experience: string;
    positions: (count: number) => string;
    viewDetails: string;
    comingSoon: string;
    allProjectsOnGitHub: string;
    techStack: string;
  };
  footer: {
    copyright: string;
    links: { label: string; href: string }[];
  };
};

const base = {
  url: "https://nikalexan.com",
  ogImage: "/og-placeholder.svg"
};

const servicesIconPaths = [
  "M4 6h16v12H4z M4 10h16",
  "M12 3v6m0 0l-3-3m3 3l3-3 M6 21h12",
  "M7 7h10v10H7z M3 12h4m10 0h4",
  "M5 9h14M5 15h10m-6 6h6",
  "M12 4l6 4v6l-6 4-6-4V8z",
  "M5 12a7 7 0 1 0 14 0a7 7 0 1 0-14 0"
];

const shared = {
  navLinks: [
    { label: "Experience", href: "#works" },
    { label: "Side projects", href: "#pet-projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],
  socials: [
    { label: "Telegram", href: "https://t.me/nikalexan" },
    { label: "Email", href: "mailto:hi@nikalexan.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/nikalexan" },
    { label: "GitHub", href: "https://github.com/nikalexan" }
  ]
};

const pluralRu = (count: number, [one, few, many]: [string, string, string]) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

export const siteRu: SiteContent = {
  locale: "ru",
  meta: {
    title: "Nikita Vassilenko — Back End Developer",
    description:
      "Back End Developer и энтузиаст.",
    url: base.url,
    ogImage: base.ogImage
  },
  nav: {
    logo: "Nikita Vassilenko",
    homeHref: "/",
    links: [
      { label: "Опыт", href: "#works" },
      { label: "Пет-проекты", href: "#pet-projects" },
      { label: "Обо_мне", href: "#about" },
      { label: "Контакты", href: "#contact" }
    ],
    cta: { label: "Связаться", href: "#contact" }
  },
  hero: {
    name: "Nikita Vassilenko",
    tagline: "Back End Developer",
    description:
      "Победитель WorldSkills Astana 2023 и WorldSkills Kazakhstan 2023 в компетенции «IT solutions for business». На работе пишу на PHP, Java и Go. В своих проектах добавляю Kubernetes и Terraform.",
    ctaPrimary: { label: "LinkedIn", href: "https://www.linkedin.com/in/nikalexan/" },
    ctaSecondary: { label: "Опыт работы", href: "#works" },
    note: "Астана, Казахстан",
    cardKicker: "WorldSkills",
    cardTitle: "WorldSkills 2023 Winner",
    cardText:
      "WorldSkills Astana 2023 и WorldSkills Kazakhstan 2023 — «IT solutions for business».",
    cardChips: ["PHP", "Java", "Go", "Kubernetes"]
  },
  about: {
    title: "Обо мне",
    body:
      "Back End Developer из Астаны, работаю в KAZINSYS.kz. На работе пишу на PHP, Java и Go. В учёбе и своих проектах беру ещё Python, деплою в Kubernetes через Terraform, пишу смарт-контракты на Solidity.",
    bullets: [
      "Победитель WorldSkills Astana 2023 и WorldSkills Kazakhstan 2023",
      "Back End Developer в KAZINSYS.kz (апр. 2025 — настоящее время)",
      "Full Stack Developer в KAZINSYS.kz (июнь 2023 — апр. 2025)",
      "Astana IT University — Software Engineering (2024–2027)",
      "HackNU: цифровой двойник локомотива для КТЖ"
    ],
    jokes: [
      "Когда рога падают — никто не замечает, а когда прод — все",
      "Собрал микросервис — теперь ищу, куда он делся в проде",
      "Бэкап — это как чувство юмора: нужен до инцидента",
      "Если фича работает, значит ты забыл про кеш",
      "Логи молчат — значит, ты не там ищешь правду",
      "Сначала была таблица. Потом JOIN. Потом стало грустно"
    ],
    stack: [
      { label: "Бэкенд", items: ["PHP", "Java", "Go", "Python"] },
      { label: "Фронтенд", items: ["JavaScript", "Vue", "Nuxt"] },
      { label: "Инфраструктура", items: ["Docker", "Kubernetes", "Terraform"] },
      { label: "Данные и очереди", items: ["PostgreSQL", "gRPC", "NATS", "MQTT"] },
      { label: "Блокчейн", items: ["Solidity", "Foundry"] }
    ],
    availability: 'Открыт для сотрудничества'
  },
  services: {
    title: "",
    items: []
  },
  projects: {
    title: "Опыт работы"
  },
  petProjects: {
    title: "Пет-проекты",
    note: "Хакатоны, командные и учебные проекты"
  },
  testimonials: {
    title: "",
    items: []
  },
  contact: {
    title: "Связаться",
    blurb:
      "Открыт к новым возможностям и задачам. Напишите пару строк — отвечу и обсудим детали.",
    formEnabled: true,
    form: {
      nameLabel: "Имя",
      emailLabel: "Email",
      messageLabel: "Сообщение",
      namePlaceholder: "Ваше имя",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Опишите задачу или проект",
      submitLabel: "Отправить"
    },
    socials: shared.socials
  },
  ui: {
    home: "Главная",
    navigation: "Навигация",
    location: "Город",
    availability: "Статус",
    experience: "Опыт",
    positions: (count) => `${count}+ ${pluralRu(count, ["должность", "должности", "должностей"])}`,
    viewDetails: "Подробнее",
    comingSoon: "Скоро",
    allProjectsOnGitHub: "Все проекты на GitHub",
    techStack: "Стек"
  },
  footer: {
    copyright: "© 2026 Nikita Vassilenko",
    links: [{ label: "English", href: "/en" }]
  }
};

export const siteEn: SiteContent = {
  locale: "en",
  meta: {
    title: "Nikita Vassilenko — Back End Developer",
    description:
      "Back End Developer and enthusiast.",
    url: `${base.url}/en`,
    ogImage: base.ogImage
  },
  nav: {
    logo: "Nikita Vassilenko",
    homeHref: "/en",
    links: shared.navLinks,
    cta: { label: "Get in touch", href: "#contact" }
  },
  hero: {
    name: "Nikita Vassilenko",
    tagline: "Back End Developer",
    description:
      "Winner of WorldSkills Astana 2023 and WorldSkills Kazakhstan 2023 in the “IT solutions for business” competency. I write PHP, Java and Go at work and use Kubernetes and Terraform in my own projects.",
    ctaPrimary: { label: "LinkedIn", href: "https://www.linkedin.com/in/nikalexan/" },
    ctaSecondary: { label: "Experience", href: "#works" },
    note: "Astana, Kazakhstan",
    cardKicker: "WorldSkills",
    cardTitle: "WorldSkills 2023 Winner",
    cardText:
      "WorldSkills Astana 2023 and WorldSkills Kazakhstan 2023 — “IT solutions for business”.",
    cardChips: ["PHP", "Java", "Go", "Kubernetes"]
  },
  about: {
    title: "About",
    body:
      "Back End Developer in Astana, working at KAZINSYS.kz. At work I write PHP, Java and Go. In university and side projects I also use Python, deploy to Kubernetes with Terraform, and write Solidity contracts.",
    bullets: [
      "Winner of WorldSkills Astana 2023 and WorldSkills Kazakhstan 2023",
      "Back End Developer at KAZINSYS.kz (Apr 2025 — Present)",
      "Full Stack Developer at KAZINSYS.kz (Jun 2023 — Apr 2025)",
      "Astana IT University — Software Engineering (2024–2027)",
      "HackNU: locomotive digital twin for KTZ"
    ],
    jokes: [
      "When antlers fall, no one notices; when prod falls, everyone does",
      "Shipped a microservice — now tracking it down in prod",
      "Backups are like jokes: you need them before the incident",
      "If the feature works, you probably forgot the cache",
      "When logs are quiet, you're looking in the wrong place",
      "It started as a table. Then JOINs happened. Then sadness"
    ],
    stack: [
      { label: "Backend", items: ["PHP", "Java", "Go", "Python"] },
      { label: "Frontend", items: ["JavaScript", "Vue", "Nuxt"] },
      { label: "Infrastructure", items: ["Docker", "Kubernetes", "Terraform"] },
      { label: "Data & messaging", items: ["PostgreSQL", "gRPC", "NATS", "MQTT"] },
      { label: "Blockchain", items: ["Solidity", "Foundry"] }
    ],
    availability: "Open for new opportunities"
  },
  services: {
    title: "",
    items: []
  },
  projects: {
    title: "Experience"
  },
  petProjects: {
    title: "Side projects",
    note: "Hackathons, team and university projects"
  },
  testimonials: {
    title: "",
    items: []
  },
  contact: {
    title: "Contact",
    blurb:
      "Open to new opportunities and tasks. Share a few details and I’ll reply.",
    formEnabled: true,
    form: {
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Tell me about your project",
      submitLabel: "Send message"
    },
    socials: shared.socials
  },
  ui: {
    home: "Home",
    navigation: "Navigation",
    location: "Location",
    availability: "Availability",
    experience: "Experience",
    positions: (count) => `${count}+ ${count === 1 ? "Position" : "Positions"}`,
    viewDetails: "View details",
    comingSoon: "Coming soon",
    allProjectsOnGitHub: "All Projects on GitHub",
    techStack: "Tech Stack"
  },
  footer: {
    copyright: "© 2026 Nikita Vassilenko",
    links: [{ label: "Русская версия", href: "/" }]
  }
};

export const getSite = (locale: Locale): SiteContent =>
  locale === "en" ? siteEn : siteRu;
