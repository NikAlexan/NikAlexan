import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";

// Builds a 1200x630 OpenGraph image for each case study, in both languages.
export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection("case-studies", ({ data }) => data.published !== false);
  return entries.map((entry) => {
    const [lang, slug] = entry.id.split("/");
    return { params: { lang, slug }, props: { data: entry.data } };
  });
};

// Runs at build time from the site/ directory.
const font = (path: string) => readFile(join(process.cwd(), "node_modules", path));

const loadFonts = async () => {
  const [sansLatin, sansCyrillic, monoLatin, monoCyrillic] = await Promise.all([
    font("@fontsource/inter/files/inter-latin-300-normal.woff"),
    font("@fontsource/inter/files/inter-cyrillic-300-normal.woff"),
    font("@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff"),
    font("@fontsource/ibm-plex-mono/files/ibm-plex-mono-cyrillic-400-normal.woff")
  ]);
  return [
    { name: "Sans", data: sansLatin, weight: 300 as const },
    { name: "SansCyrillic", data: sansCyrillic, weight: 300 as const },
    { name: "Mono", data: monoLatin, weight: 400 as const },
    { name: "MonoCyrillic", data: monoCyrillic, weight: 400 as const }
  ];
};

const COLORS = { bg: "#fdfcf0", ink: "#1c1c1c", accent: "#a85d3d", muted: "#6b665d" };

export const GET: APIRoute = async ({ props }) => {
  const { data } = props as { data: { tag: string; title: string; subtitle: string; stack: string[] } };

  const h = (type: string, style: Record<string, unknown>, children: unknown) => ({
    type,
    props: { style, children }
  });

  const tree = h(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "64px 72px",
      background: COLORS.bg,
      border: `2px solid ${COLORS.accent}`,
      fontFamily: "Sans, SansCyrillic",
      color: COLORS.ink
    },
    [
      h("div", { display: "flex", fontFamily: "Mono, MonoCyrillic", fontSize: 24, color: COLORS.accent, letterSpacing: 2 }, data.tag.toUpperCase()),
      h("div", { display: "flex", flexDirection: "column" }, [
        h("div", { display: "flex", fontSize: 76, lineHeight: 1.05, textTransform: "uppercase" }, data.title),
        h("div", { display: "flex", fontSize: 76, lineHeight: 1.05, textTransform: "uppercase", color: COLORS.accent }, data.subtitle)
      ]),
      h("div", { display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontFamily: "Mono, MonoCyrillic", fontSize: 22, color: COLORS.muted }, [
        h("div", { display: "flex", flexWrap: "wrap", maxWidth: 820 }, data.stack.slice(0, 6).join(" · ")),
        h("div", { display: "flex", color: COLORS.ink }, "nikalexan.com")
      ])
    ]
  );

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
