export type CaseStudy = {
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  version: string;
  roleLabel: string;
  role: string;
  timelineLabel: string;
  timeline: string;
  deliverablesLabel: string;
  deliverables: string;
  challengeLabel: string;
  challengeTitle: string;
  challengeBody: string;
  challengeMetrics: { value: string; label: string }[];
  stackLabel: string;
  stackTitle: string;
  stackBody: string;
  stack: string[];
  outcomeLabel: string;
  outcomeTitle: string;
  outcomeBody: string;
  outcomes: { title: string; text: string }[];
  backLabel: string;
};

export const nexusRu: CaseStudy = {
  slug: "nexus",
  tag: "Fintech Architecture",
  title: "NEXUS",
  subtitle: "PROTOCOL",
  version: "v2.0 Beta",
  roleLabel: "РОЛЬ",
  role: "Lead Engineer",
  timelineLabel: "ПЕРИОД",
  timeline: "Q3 2023 — Q1 2024",
  deliverablesLabel: "КЛЮЧЕВЫЕ РЕЗУЛЬТАТЫ",
  deliverables: "System Architecture, Real-time Visualization, Smart Contracts",
  challengeLabel: "01 // CHALLENGE",
  challengeTitle: "Победа над задержками в HFT-визуализации.",
  challengeBody:
    "Нужно было рендерить 50 000+ точек данных в секунду без блокировок основного потока. Обычные DOM-операции не выдерживали 60Hz. Мы собрали потоковую архитектуру с агрегацией данных и вынесли тяжелые вычисления в воркеры.",
  challengeMetrics: [
    { value: "50k+", label: "Points / Sec" },
    { value: "<16ms", label: "Frame Budget" }
  ],
  stackLabel: "02 // TECH_STACK",
  stackTitle: "Компоненты ядра и визуализации.",
  stackBody:
    "Микросервисы для агрегации ордеров, слой кэширования и потоковая шина событий, поверх — WebGL-визуализация и панель мониторинга.",
  stack: ["C#", ".NET", "WebSockets", "Kafka", "Redis", "WebGL", "TypeScript"],
  outcomeLabel: "03 // OUTCOME",
  outcomeTitle: "Стабильная визуализация под нагрузкой.",
  outcomeBody:
    "Получили устойчивые 60 FPS при пиковой нагрузке, сохранили точность данных и снизили задержки отображения.",
  outcomes: [
    {
      title: "Latency",
      text: "Снижение latency визуализации на 38% при нагрузке."
    },
    {
      title: "Reliability",
      text: "99.9% устойчивость потока с fallback на локальный кеш."
    },
    {
      title: "Observability",
      text: "Единая панель мониторинга метрик и алертов."
    }
  ],
  backLabel: "НАЗАД_К_ГЛАВНОЙ"
};

export const nexusEn: CaseStudy = {
  slug: "nexus",
  tag: "Fintech Architecture",
  title: "NEXUS",
  subtitle: "PROTOCOL",
  version: "v2.0 Beta",
  roleLabel: "ROLE",
  role: "Lead Engineer",
  timelineLabel: "TIMELINE",
  timeline: "Q3 2023 — Q1 2024",
  deliverablesLabel: "KEY DELIVERABLES",
  deliverables: "System Architecture, Real-time Visualization, Smart Contracts",
  challengeLabel: "01 // CHALLENGE",
  challengeTitle: "Overcoming latency in HFT visualization.",
  challengeBody:
    "We needed to render 50,000+ data points per second without blocking the main thread. Traditional DOM manipulation couldn’t keep 60Hz. We designed a streaming architecture with aggregation and pushed heavy processing into workers.",
  challengeMetrics: [
    { value: "50k+", label: "Points / Sec" },
    { value: "<16ms", label: "Frame Budget" }
  ],
  stackLabel: "02 // TECH_STACK",
  stackTitle: "Core system + visualization stack.",
  stackBody:
    "Microservices for order aggregation, caching, and an event streaming bus, topped with a WebGL visualization layer and monitoring console.",
  stack: ["C#", ".NET", "WebSockets", "Kafka", "Redis", "WebGL", "TypeScript"],
  outcomeLabel: "03 // OUTCOME",
  outcomeTitle: "Stable visualization under peak load.",
  outcomeBody:
    "We achieved stable 60 FPS at peak throughput, preserved data accuracy, and reduced render latency.",
  outcomes: [
    {
      title: "Latency",
      text: "Visualization latency reduced by 38% under load."
    },
    {
      title: "Reliability",
      text: "99.9% stream stability with local cache fallback."
    },
    {
      title: "Observability",
      text: "Unified dashboard for metrics and alerts."
    }
  ],
  backLabel: "BACK_TO_INDEX"
};

export const getCaseStudy = (locale: "ru" | "en", slug: string): CaseStudy | null => {
  if (slug !== "nexus") return null;
  return locale === "en" ? nexusEn : nexusRu;
};
