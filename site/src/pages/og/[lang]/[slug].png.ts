import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";

// Builds a 1200x630 OpenGraph image for each case study, in both languages,
// in the same dark terminal style as public/og-image.png.
export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection("case-studies", ({ data }) => data.published !== false);
  return entries.map((entry) => {
    const [lang, slug] = entry.id.split("/");
    return { params: { lang, slug }, props: { data: entry.data } };
  });
};

// Runs at build time from the site/ directory.
const font = (path: string) => readFile(join(process.cwd(), "node_modules", path));

// The site fonts (Space Grotesk, Space Mono) have no Cyrillic, so the image
// uses Inter and IBM Plex Mono with separate Cyrillic subsets as fallbacks.
const loadFonts = async () => {
  const files = {
    Sans: "@fontsource/inter/files/inter-latin-900-normal.woff",
    SansCyrillic: "@fontsource/inter/files/inter-cyrillic-900-normal.woff",
    Mono: "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff",
    MonoCyrillic: "@fontsource/ibm-plex-mono/files/ibm-plex-mono-cyrillic-400-normal.woff"
  };
  return Promise.all(
    Object.entries(files).map(async ([name, path]) => ({
      name,
      data: await font(path),
      weight: (name.startsWith("Sans") ? 900 : 400) as 900 | 400
    }))
  );
};

const C = {
  bg: "#0c0a09",
  grid: "rgba(255,255,255,0.03)",
  amber: "#d97706",
  white: "#fafaf9",
  muted: "#78716c",
  green: "#10b981",
  chip: "rgba(255,255,255,0.12)"
};

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style: { display: "flex", ...style }, children }
});

const corner = (pos: Record<string, number>, sides: string[]) =>
  h("div", {
    position: "absolute",
    width: 26,
    height: 26,
    ...pos,
    ...Object.fromEntries(sides.map((side) => [`border${side}`, `2px solid ${C.amber}`]))
  });

export const GET: APIRoute = async ({ props }) => {
  const { data } = props as { data: { tag: string; title: string; subtitle: string; stack: string[] } };
  const mono = { fontFamily: "Mono, MonoCyrillic", letterSpacing: 3, textTransform: "uppercase" };

  const tree = h(
    "div",
    {
      width: "100%",
      height: "100%",
      position: "relative",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: C.bg,
      backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
      border: "1px solid rgba(255,255,255,0.08)",
      fontFamily: "Sans, SansCyrillic",
      color: C.white
    },
    [
      corner({ top: 55, left: 55 }, ["Top", "Left"]),
      corner({ top: 55, right: 55 }, ["Top", "Right"]),
      corner({ bottom: 55, left: 55 }, ["Bottom", "Left"]),
      corner({ bottom: 55, right: 55 }, ["Bottom", "Right"]),
      h("div", { position: "absolute", top: 78, left: 96, ...mono, fontSize: 15 }, [
        h("span", { color: C.amber }, "Case_study"),
        h("span", { color: C.muted, marginLeft: 30 }, "Status:"),
        h("span", { color: C.green, marginLeft: 12 }, "Online")
      ]),
      h("div", { position: "absolute", top: 78, right: 96, ...mono, fontSize: 15, color: C.muted }, "nikalexan.com"),
      h(
        "div",
        {
          alignItems: "center",
          padding: "8px 28px",
          marginTop: 40,
          marginBottom: 30,
          border: "1px solid rgba(217,119,6,0.35)",
          backgroundColor: "rgba(217,119,6,0.08)",
          ...mono,
          fontSize: 15,
          color: C.amber
        },
        [h("div", { width: 12, height: 12, backgroundColor: C.amber, marginRight: 18 }), data.tag]
      ),
      h(
        "div",
        { fontSize: 64, lineHeight: 1, letterSpacing: -2, textTransform: "uppercase", textAlign: "center", maxWidth: 1000 },
        data.title
      ),
      h(
        "div",
        {
          fontSize: 64,
          lineHeight: 1.05,
          letterSpacing: -2,
          textTransform: "uppercase",
          textAlign: "center",
          color: C.amber,
          maxWidth: 1000
        },
        // Inter has no arrow glyph.
        data.subtitle.replace("→", "->")
      ),
      h("div", {
        width: 280,
        height: 1,
        marginTop: 34,
        backgroundImage: `linear-gradient(90deg, transparent, ${C.amber}, transparent)`
      }),
      h(
        "div",
        { marginTop: 30, ...mono, fontSize: 15, color: C.white },
        data.stack.slice(0, 5).map((item) =>
          h("div", { padding: "10px 22px", margin: "0 8px", border: `1px solid ${C.chip}`, backgroundColor: "rgba(0,0,0,0.4)" }, item)
        )
      )
    ]
  );

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
