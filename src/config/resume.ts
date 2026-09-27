/**
 * Resume content — surfaced at /resume (full page) and embedded
 * inline on /about when desired.
 *
 * Composition: this file holds the bits NOT already living in other
 * configs. The full resume is assembled by <ResumeEmbed> from:
 *   - siteConfig                  (name, contact, github)
 *   - src/config/projects.ts      (three projects + stacks)
 *   - src/config/activities.ts    (activities & leadership)
 *   - src/config/awards.ts        (awards & recognition — if any)
 *   - src/config/resume.ts        (THIS file: summary, education,
 *                                  skill groups — the prose-y bits)
 *
 * Privacy hard-rule: same as the rest of the site. NO school name,
 * NO city, NO phone, NO raw Gmail, NO timezone. The resume is the
 * file an admissions officer or recruiter sees first — it must hold
 * the line on doxxing exactly as strictly as the website does.
 */

export type SkillGroup = {
  /** Heading shown in resume — keep ≤ 30 chars. */
  label: string;
  /** Pill-rendered items. Order matters — strongest signal first. */
  items: readonly string[];
};

export type ResumeContent = {
  /** 2-sentence elevator pitch shown above the resume body. */
  summary: string;
  /**
   * Free-form coursework / accolades. Keep generic — no entry whose
   * wording identifies the institution Ali attended. AP exams are not
   * listed anywhere on the site, by Ali's choice.
   */
  coursework: readonly string[];
  /** Skill groups, rendered as pill-rows. */
  skillGroups: readonly SkillGroup[];
  /**
   * Whether public/resume/ali-arbab-resume.pdf exists.
   * Flip to `true` once the scrubbed PDF lands. The download
   * button + sitemap entry both gate on this flag.
   */
  hasPDF: boolean;
  /** Filename inside public/resume/ when hasPDF is true. */
  pdfFilename: string;
};

export const RESUME: ResumeContent = {
  summary:
    "Class XII student who builds and runs production software. Founder of StockSaathi, a live paper-trading coach for Indian teens that placed 2nd nationally at the Masters' Union AI Buildathon and has grown to 170 accounts by word of mouth — plus SpendInCheck, BolHisaab and MagLock Protocol.",
  coursework: [
    "Class XII (CBSE): Physics · Chemistry · Mathematics · Computer Science",
    "Self-directed: behavioural finance, Postgres security (RLS and grants), embedded power design, evaluating LLMs from production logs",
  ],
  skillGroups: [
    {
      label: "Languages",
      items: [
        "TypeScript",
        "JavaScript",
        "Python",
        "Kotlin",
        "SQL + PL/pgSQL",
        "Dart",
        "C++ (Arduino)",
        "HTML/CSS",
      ],
    },
    {
      label: "Frameworks & runtimes",
      items: [
        "Next.js 15 / 16",
        "React 19",
        "Tailwind v4",
        "Jetpack Compose",
        "Flutter",
        "Flask",
        "FastAPI",
        "Vite",
      ],
    },
    {
      label: "Data & backend",
      items: [
        "PostgreSQL (Supabase)",
        "Row-level security + grants",
        "SECURITY DEFINER RPCs",
        "Vercel serverless + Edge",
        "Scheduled jobs (GitHub Actions)",
      ],
    },
    {
      label: "AI",
      items: [
        "Gemini on Vertex AI",
        "Groq (Llama 3.x, Whisper)",
        "Sarvam speech (STT + TTS)",
        "Tool-calling agents",
        "Evaluating from production logs",
      ],
    },
    {
      label: "Hardware",
      items: [
        "ESP32 firmware",
        "ESP32-CAM MJPEG streaming",
        "Fail-secure relay control",
        "Power budgeting (coin cell + LiFePO4)",
        "LoRa mesh (design)",
      ],
    },
    {
      label: "Infra & tooling",
      items: [
        "Vercel",
        "Cloudflare Tunnel",
        "GitHub Actions CI",
        "Vitest + pytest",
        "Sentry",
        "Husky + lint-staged",
      ],
    },
  ],
  hasPDF: false,
  pdfFilename: "ali-arbab-resume.pdf",
} as const;
