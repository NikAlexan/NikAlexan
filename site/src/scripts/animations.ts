import gsap from "gsap";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type CleanupTask = () => void;

const cleanupTasks: CleanupTask[] = [];

const registerCleanup = (task: CleanupTask) => {
  cleanupTasks.push(task);
};

const runCleanup = () => {
  cleanupTasks.splice(0).forEach((task) => {
    try {
      task();
    } catch {
      // Ignore cleanup errors to avoid blocking init
    }
  });
};

const getStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const getStoredTheme = () => {
  const storage = getStorage();
  if (!storage) return null;
  try {
    return storage.getItem("theme");
  } catch {
    return null;
  }
};

const getPreferredTheme = () => {
  const stored = getStoredTheme();
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (root: HTMLElement) => {
  root.classList.toggle("dark", getPreferredTheme() === "dark");
};

const restoreDocumentVisibility = () => {
  const root = document.documentElement;
  if (root.style.display === "none") {
    root.style.display = "block";
  } else if (!root.style.display) {
    root.style.removeProperty("display");
  }
  if (document.body && document.body.style.display === "none") {
    document.body.style.display = "block";
  } else if (document.body && !document.body.style.display) {
    document.body.style.removeProperty("display");
  }
};

const initPageTransition = () => {
  const overlay = document.querySelector("[data-page-transition]") as HTMLElement | null;
  if (!overlay) return;

  const hideOverlay = () => {
    overlay.classList.remove("is-active");
    gsap.set(overlay, { autoAlpha: 0 });
    overlay.style.pointerEvents = "none";
    overlay.style.display = "none";
  };

  overlay.style.display = "flex";
  hideOverlay();

  if (!prefersReducedMotion) {
    gsap.fromTo(
      overlay,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.6, ease: "power2.out" }
    );
  } else {
    hideOverlay();
  }

  const handlePageShow = () => hideOverlay();
  window.addEventListener("pageshow", handlePageShow);
  registerCleanup(() => {
    window.removeEventListener("pageshow", handlePageShow);
  });

  const handleClick = (event: Event) => {
    const link = (event.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
    if (!link) return;
    if (link.hasAttribute("data-transition-skip")) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.hash) return;

    event.preventDefault();

    if (prefersReducedMotion) {
      window.location.href = url.href;
      return;
    }

    overlay.classList.add("is-active");
    overlay.style.pointerEvents = "auto";
    overlay.style.display = "flex";

    const go = () => {
      window.location.href = url.href;
    };

    const fallback = window.setTimeout(go, 600);

    try {
      gsap.to(overlay, {
        autoAlpha: 1,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          window.clearTimeout(fallback);
          go();
        }
      });
    } catch {
      window.clearTimeout(fallback);
      go();
    }
  };

  document.addEventListener("click", handleClick);
  registerCleanup(() => {
    document.removeEventListener("click", handleClick);
  });
};

const initHero = () => {
  const heroItems = document.querySelectorAll("[data-hero-item]");
  if (!heroItems.length || prefersReducedMotion) return;

  gsap.from(heroItems, {
    y: 16,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.08
  });
};

const initMenu = () => {
  const menu = document.querySelector("[data-menu]") as HTMLElement | null;
  const toggles = document.querySelectorAll("[data-menu-toggle]");
  const closeBtn = document.querySelector("[data-menu-close]");

  if (!menu || !toggles.length) return;

  const setExpanded = (expanded: boolean) => {
    const value = expanded ? "true" : "false";
    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", value);
    });
    menu.setAttribute("aria-hidden", expanded ? "false" : "true");
  };

  const openMenu = () => {
    menu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    setExpanded(true);
  };

  const closeMenu = () => {
    menu.classList.add("hidden");
    document.body.style.overflow = "";
    setExpanded(false);
  };

  const handleToggleClick = (event: Event) => {
    event.preventDefault();
    openMenu();
  };

  const handleCloseClick = (event: Event) => {
    event.preventDefault();
    closeMenu();
  };

  const handleMenuClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.closest("a[href]")) {
      closeMenu();
    }
  };

  toggles.forEach((toggle) => toggle.addEventListener("click", handleToggleClick));
  closeBtn?.addEventListener("click", handleCloseClick);
  menu.addEventListener("click", handleMenuClick);

  setExpanded(false);

  registerCleanup(() => {
    toggles.forEach((toggle) => toggle.removeEventListener("click", handleToggleClick));
    closeBtn?.removeEventListener("click", handleCloseClick);
    menu.removeEventListener("click", handleMenuClick);
  });
};

const initSidebarNav = () => {
  const rail = document.querySelector<HTMLElement>("[data-nav-rail]");
  const indicator = document.querySelector<HTMLElement>("[data-nav-indicator]");
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
  const bullets = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-bullet]"));

  if (!rail || !indicator || !links.length) return;

  const targets = links
    .map((link) => {
      const id = link.getAttribute("href")?.replace("#", "");
      if (!id) return null;
      const section = document.getElementById(id);
      return section ? { link, section } : null;
    })
    .filter((item): item is { link: HTMLAnchorElement; section: HTMLElement } => Boolean(item));

  if (!targets.length) return;

  const setActive = (activeLink: HTMLAnchorElement) => {
    links.forEach((link) => {
      const isActive = link === activeLink;
      link.classList.toggle("is-active", isActive);
      link.classList.toggle("text-ochre", isActive);
      link.classList.toggle("font-bold", isActive);
      link.classList.toggle("glowing-text", isActive);
      if (!isActive) {
        link.classList.remove("text-ochre", "font-bold", "glowing-text");
      }
    });

    bullets.forEach((bullet, index) => {
      const link = links[index];
      const isActive = link === activeLink;
      bullet.classList.toggle("is-active", isActive);
      bullet.classList.toggle("bg-ochre", isActive);
      bullet.classList.toggle("shadow-[0_0_5px_rgba(217,119,6,0.8)]", isActive);
      if (!isActive) {
        bullet.classList.remove("bg-ochre", "shadow-[0_0_5px_rgba(217,119,6,0.8)]");
      }
    });

    const linkRect = activeLink.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();
    const indicatorHeight = indicator.getBoundingClientRect().height || 0;
    const targetY = linkRect.top - railRect.top + (linkRect.height - indicatorHeight) / 2;

    if (prefersReducedMotion) {
      indicator.style.transform = `translateY(${targetY}px)`;
      return;
    }

    gsap.to(indicator, {
      y: targetY,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
      if (!visible.length) return;
      const activeEntry = visible[0];
      const match = targets.find((item) => item.section === activeEntry.target);
      if (match) {
        setActive(match.link);
      }
    },
    { threshold: 0.2, rootMargin: "-10% 0px -20% 0px" }
  );

  targets.forEach(({ section }) => observer.observe(section));

  const initial = targets.find((item) => item.section.getBoundingClientRect().top >= 0) ?? targets[0];
  setActive(initial.link);

  const handleResize = () => {
    const active = links.find((link) => link.classList.contains("is-active")) ?? links[0];
    if (active) setActive(active);
  };

  window.addEventListener("resize", handleResize);

  registerCleanup(() => {
    observer.disconnect();
    window.removeEventListener("resize", handleResize);
  });
};

const initMascotTyping = () => {
  const nodes = document.querySelectorAll<HTMLElement>("[data-typing]");
  if (!nodes.length) return;

  const timelines: gsap.core.Timeline[] = [];
  const trackedNodes: HTMLElement[] = [];

  nodes.forEach((node) => {
    if (node.dataset.typingInit === "true") return;
    node.dataset.typingInit = "true";
    trackedNodes.push(node);

    const textEl = node.querySelector<HTMLElement>("[data-typing-text]");
    if (!textEl) return;

    let items: string[] = [];
    const rawItems = node.getAttribute("data-typing-items");
    if (rawItems) {
      try {
        const parsed = JSON.parse(rawItems);
        if (Array.isArray(parsed)) {
          items = parsed.filter((item) => typeof item === "string" && item.trim().length);
        }
      } catch {
        items = [];
      }
    }

    if (!items.length) return;

    if (prefersReducedMotion) {
      textEl.textContent = items[0];
      return;
    }

    const typeSpeed = 0.045;
    const deleteSpeed = 0.022;
    const pause = 1.2;
    const between = 0.25;
    const startDelay = 0.2;

    const timeline = gsap.timeline({ repeat: -1, delay: startDelay });
    timelines.push(timeline);

    items.forEach((text, itemIndex) => {
      const state = { count: 0 };
      const length = text.length;

      timeline.to(state, {
        count: length,
        duration: Math.max(length * typeSpeed, 0.2),
        ease: "none",
        snap: { count: 1 },
        onUpdate: () => {
          textEl.textContent = text.slice(0, Math.round(state.count));
        }
      });

      timeline.to({}, { duration: pause });

      timeline.to(state, {
        count: 0,
        duration: Math.max(length * deleteSpeed, 0.15),
        ease: "none",
        snap: { count: 1 },
        onUpdate: () => {
          textEl.textContent = text.slice(0, Math.round(state.count));
        }
      });

      if (itemIndex < items.length - 1) {
        timeline.to({}, { duration: between });
      }
    });

    node.dataset.typingTimeline = timeline.vars.id?.toString() ?? "active";
  });

  registerCleanup(() => {
    timelines.forEach((timeline) => timeline.kill());
    trackedNodes.forEach((node) => {
      delete node.dataset.typingInit;
      delete node.dataset.typingTimeline;
    });
  });
};

const init = () => {
  runCleanup();
  restoreDocumentVisibility();
  applyTheme(document.documentElement);
  initPageTransition();
  initHero();
  initMenu();
  initSidebarNav();
  initMascotTyping();
};

if (typeof window !== "undefined") {
  let hasInit = false;
  const run = (label?: string, force = false) => {
    if (!force && hasInit) return;
    if (label) {
      console.log(`[animations] init via ${label}`);
    }
    init();
    if (!force) {
      hasInit = true;
    }
  };
  document.addEventListener("astro:before-swap", (event) => {
    const nextDocument = (event as CustomEvent).detail?.newDocument as Document | undefined;
    if (nextDocument) {
      applyTheme(nextDocument.documentElement);
    }
  });
  document.addEventListener("astro:page-load", () => run("astro:page-load"));
  document.addEventListener("astro:after-swap", () => run("astro:after-swap", true));
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", () => run("DOMContentLoaded"));
  } else {
    run("ready");
  }
  window.addEventListener("pageshow", restoreDocumentVisibility);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      restoreDocumentVisibility();
    }
  });
}
