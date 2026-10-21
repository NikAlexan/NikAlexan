// GSAP easings ported to cubic-bezier for the Web Animations API
const EASE = {
  power1In: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
  power2Out: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  power3In: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
  power3Out: "cubic-bezier(0.165, 0.84, 0.44, 1)"
};

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
  const isDark = getPreferredTheme() === "dark";
  root.classList.toggle("dark", isDark);
  const themeColor = root.ownerDocument.querySelector('meta[name="theme-color"]');
  themeColor?.setAttribute("content", isDark ? "#221c10" : "#fdfcf0");
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

const initScrollToTop = () => {
  const handleClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

    const url = new URL(link.href, window.location.href);
    const here = window.location;
    if (url.origin !== here.origin || url.pathname !== here.pathname || url.search !== here.search) return;
    if (url.hash) return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    if (here.hash) {
      history.replaceState(history.state, "", url.pathname + url.search);
    }
  };

  // Capture phase, so this runs before the page transition and the client router
  document.addEventListener("click", handleClick, true);
  registerCleanup(() => {
    document.removeEventListener("click", handleClick, true);
  });
};

const MENU_REOPEN_KEY = "menu-reopen";

// The language switch loads the other locale's page, so the menu state is
// carried over in sessionStorage and the menu reopens on the new page.
const takeMenuReopen = () => {
  try {
    const value = window.sessionStorage.getItem(MENU_REOPEN_KEY);
    window.sessionStorage.removeItem(MENU_REOPEN_KEY);
    return value === "1";
  } catch {
    return false;
  }
};

const markMenuReopen = () => {
  try {
    window.sessionStorage.setItem(MENU_REOPEN_KEY, "1");
  } catch {
    // Without storage the menu simply stays closed after the switch
  }
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

  const syncActiveLink = () => {
    const links = Array.from(menu.querySelectorAll<HTMLAnchorElement>("[data-menu-link]"));
    if (!links.length) return;
    const probe = window.innerHeight * 0.35;
    let active = links[0];
    links.forEach((link) => {
      const href = link.getAttribute("href") ?? "";
      if (!href.startsWith("#")) return;
      const section = document.getElementById(href.slice(1));
      if (section && section.getBoundingClientRect().top <= probe) {
        active = link;
      }
    });
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const lastHashLink = links.filter((link) => link.getAttribute("href")?.startsWith("#")).pop();
    if (atBottom && lastHashLink && window.scrollY > 0) {
      active = lastHashLink;
    }
    links.forEach((link) => {
      const isActive = link === active;
      link.dataset.active = isActive ? "true" : "false";
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const menuLinks = menu.querySelectorAll<HTMLElement>("[data-menu-link]");
  let menuAnimations: Animation[] = [];
  let isOpen = false;

  const stopMenuAnimations = () => {
    menuAnimations.forEach((animation) => animation.cancel());
    menuAnimations = [];
  };

  const openMenu = (animate = true) => {
    if (isOpen) return;
    isOpen = true;
    syncActiveLink();
    stopMenuAnimations();
    menu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    setExpanded(true);

    if (!animate || prefersReducedMotion) return;

    menuAnimations = [
      menu.animate(
        [
          { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.9 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
        ],
        { duration: 450, easing: EASE.power3Out }
      ),
      ...Array.from(menuLinks, (link, index) =>
        link.animate(
          [
            { transform: "translateY(24px)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 }
          ],
          { duration: 400, delay: 200 + index * 50, easing: EASE.power2Out, fill: "backwards" }
        )
      )
    ];
  };

  const hideMenu = () => {
    stopMenuAnimations();
    menu.classList.add("hidden");
  };

  const closeMenu = () => {
    if (!isOpen) return;
    isOpen = false;
    stopMenuAnimations();
    // Unlock the page right away so a section link can start scrolling under the closing menu
    document.body.style.overflow = "";
    setExpanded(false);

    if (prefersReducedMotion) {
      hideMenu();
      return;
    }

    const linksDuration = 200 + Math.max(menuLinks.length - 1, 0) * 20;
    const panel = menu.animate(
      [
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
        { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.9 }
      ],
      { duration: 350, delay: Math.max(linksDuration - 120, 0), easing: EASE.power3In, fill: "forwards" }
    );
    panel.onfinish = hideMenu;
    menuAnimations = [
      ...Array.from(menuLinks, (link, index) =>
        link.animate(
          [
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(-12px)", opacity: 0 }
          ],
          { duration: 200, delay: index * 20, easing: EASE.power1In, fill: "forwards" }
        )
      ),
      panel
    ];
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) closeMenu();
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
    const langLink = target.closest<HTMLAnchorElement>("[data-menu-lang]");
    if (langLink) {
      if (langLink.getAttribute("aria-current") === "true") {
        event.preventDefault();
        return;
      }
      // Move the highlight right away so the switch reads as a toggle while the page loads
      const current = menu.querySelector<HTMLAnchorElement>('[data-menu-lang][aria-current="true"]');
      if (current) {
        [current.className, langLink.className] = [langLink.className, current.className];
        current.removeAttribute("aria-current");
        langLink.setAttribute("aria-current", "true");
      }
      markMenuReopen();
      return;
    }
    if (target.closest("a[href]")) {
      closeMenu();
    }
  };

  toggles.forEach((toggle) => toggle.addEventListener("click", handleToggleClick));
  closeBtn?.addEventListener("click", handleCloseClick);
  menu.addEventListener("click", handleMenuClick);
  document.addEventListener("keydown", handleKeydown);

  // After a language switch the menu was already open, so it reappears without the intro
  if (takeMenuReopen()) {
    openMenu(false);
  } else {
    setExpanded(false);
  }

  registerCleanup(() => {
    toggles.forEach((toggle) => toggle.removeEventListener("click", handleToggleClick));
    closeBtn?.removeEventListener("click", handleCloseClick);
    menu.removeEventListener("click", handleMenuClick);
    document.removeEventListener("keydown", handleKeydown);
    stopMenuAnimations();
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

    indicator.style.transition = prefersReducedMotion ? "" : `transform 300ms ${EASE.power2Out}`;
    indicator.style.transform = `translateY(${targetY}px)`;
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

  const timers: Array<() => void> = [];
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

    const typeSpeed = 45;
    const deleteSpeed = 22;
    const pause = 1200;
    const between = 250;
    const startDelay = 200;

    let itemIndex = 0;
    let count = 0;
    let deleting = false;

    // Types an item, holds it, deletes it, then moves on to the next one in a loop
    const step = () => {
      const text = items[itemIndex];
      count += deleting ? -1 : 1;
      textEl.textContent = text.slice(0, count);

      if (!deleting && count === text.length) {
        deleting = true;
        timer = window.setTimeout(step, pause);
      } else if (deleting && count === 0) {
        deleting = false;
        itemIndex = (itemIndex + 1) % items.length;
        timer = window.setTimeout(step, between);
      } else {
        timer = window.setTimeout(step, deleting ? deleteSpeed : typeSpeed);
      }
    };

    let timer = window.setTimeout(step, startDelay);
    timers.push(() => window.clearTimeout(timer));

    node.dataset.typingTimeline = "active";
  });

  registerCleanup(() => {
    timers.forEach((stop) => stop());
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
  initScrollToTop();
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
