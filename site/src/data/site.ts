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
    stack: string[];
    availability: string;
  };
  services: {
    title: string;
    items: Service[];
  };
  projects: {
    title: string;
    caseStudy?: {
      kicker: string;
      title: string;
      summary: string;
      ctaLabel: string;
      href: string;
    };
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
    { label: "Projects", href: "#works" },
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

export const siteRu: SiteContent = {
  locale: "ru",
  meta: {
    title: "Nikita Vassilenko — Back End Developer",
    description:
      "Back End Developer. WorldSkills Astana 2023 и WorldSkills Kazakhstan 2023 — победитель.",
    url: base.url,
    ogImage: base.ogImage
  },
  nav: {
    logo: "Nikita Vassilenko",
    homeHref: "/",
    links: [
      { label: "Проекты", href: "#works" },
      { label: "Обо_мне", href: "#about" },
      { label: "Контакты", href: "#contact" }
    ],
    cta: { label: "Связаться", href: "#contact" }
  },
  hero: {
    name: "Nikita Vassilenko",
    tagline: "Back End Developer",
    description:
      "Победитель WorldSkills Astana 2023 и WorldSkills Kazakhstan 2023 в компетенции «IT solutions for business». Изучаю .NET, PHP, JS и смежные технологии. Готов развиваться и получать новый опыт.",
    ctaPrimary: { label: "LinkedIn", href: "https://www.linkedin.com/in/nikalexan/" },
    ctaSecondary: { label: "Опыт работы", href: "#works" },
    note: "Астана, Казахстан",
    cardKicker: "WorldSkills",
    cardTitle: "WorldSkills 2023 Winner",
    cardText:
      "WorldSkills Astana 2023 и WorldSkills Kazakhstan 2023 — «IT solutions for business».",
    cardChips: [".NET", "PHP", "JS"]
  },
  about: {
    title: "Обо мне",
    body:
      "Back End Developer из Астаны. Работаю в KAZINSYS.kz, развиваюсь в .NET, PHP и JavaScript, открыт к новым задачам и росту.",
    bullets: [
      "Победитель WorldSkills Astana 2023 и WorldSkills Kazakhstan 2023",
      "Back End Developer в KAZINSYS.kz (апр. 2025 — настоящее время)",
      "Full Stack Developer в KAZINSYS.kz (июнь 2023 — апр. 2025)",
      "Astana IT University — Software Engineering (2024–2027)"
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
      ".NET",
      "PHP",
      "JavaScript",
      "HTML"
    ],
    availability: 'Открыт для сотрудничества'
  },
  services: {
    title: "",
    items: []
  },
  projects: {
    title: "Проекты",
    caseStudy: {
      kicker: "Кейс // NEXUS",
      title: "NEXUS Protocol",
      summary:
        "Архитектура и визуализация потока данных в реальном времени для высокочастотной торговли.",
      ctaLabel: "СМОТРЕТЬ_КЕЙС",
      href: "/project/nexus"
    }
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
      "Back End Developer. Winner of WorldSkills Astana 2023 and WorldSkills Kazakhstan 2023.",
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
      "Winner of WorldSkills Astana 2023 and WorldSkills Kazakhstan 2023 in the “IT solutions for business” competency. Learning .NET, PHP, JS and related tech. Ready to grow and gain new experience.",
    ctaPrimary: { label: "LinkedIn", href: "https://www.linkedin.com/in/nikalexan/" },
    ctaSecondary: { label: "Experience", href: "#works" },
    note: "Astana, Kazakhstan",
    cardKicker: "WorldSkills",
    cardTitle: "WorldSkills 2023 Winner",
    cardText:
      "WorldSkills Astana 2023 and WorldSkills Kazakhstan 2023 — “IT solutions for business”.",
    cardChips: [".NET", "PHP", "JS"]
  },
  about: {
    title: "About",
    body:
      "Back End Developer based in Astana. Working at KAZINSYS.kz and building skills in .NET, PHP, and JavaScript. Open to new challenges and growth.",
    bullets: [
      "Winner of WorldSkills Astana 2023 and WorldSkills Kazakhstan 2023",
      "Back End Developer at KAZINSYS.kz (Apr 2025 — Present)",
      "Full Stack Developer at KAZINSYS.kz (Jun 2023 — Apr 2025)",
      "Astana IT University — Software Engineering (2024–2027)"
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
      ".NET",
      "PHP",
      "JavaScript",
      "HTML"
    ],
    availability: "Open for new opportunities"
  },
  services: {
    title: "",
    items: []
  },
  projects: {
    title: "Projects",
    caseStudy: {
      kicker: "Case // NEXUS",
      title: "NEXUS Protocol",
      summary:
        "Real-time data streaming architecture and visualization for high-frequency trading.",
      ctaLabel: "VIEW_DETAILS",
      href: "/en/project/nexus"
    }
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
  footer: {
    copyright: "© 2026 Nikita Vassilenko",
    links: [{ label: "Русская версия", href: "/" }]
  }
};

export const getSite = (locale: Locale): SiteContent =>
  locale === "en" ? siteEn : siteRu;
