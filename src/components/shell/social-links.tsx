import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Social profile marks + links. Inline SVG (no icon font, no network):
 * each mark is a single path drawn in currentColor so it follows the
 * surrounding text colour and theme.
 */

type IconProps = { className?: string };

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-4 w-4", className)} fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-4 w-4", className)} fill="currentColor">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const SOCIALS = [
  { label: "GitHub", handle: siteConfig.githubHandle, href: siteConfig.github, Icon: GitHubIcon },
  {
    label: "Instagram",
    handle: siteConfig.instagramHandle,
    href: siteConfig.instagram,
    Icon: InstagramIcon,
  },
  { label: "X", handle: siteConfig.xHandle, href: siteConfig.x, Icon: XIcon },
] as const;

/**
 * An inline link to someone's Instagram, dressed as Instagram: the
 * brand gradient on the text and a small glyph. Used where the site
 * credits a person by their Instagram (e.g. StockSaathi's ambassador).
 */
export function InstagramLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="instagram-link inline-flex items-baseline gap-1 font-medium whitespace-nowrap"
    >
      <InstagramIcon className="instagram-link-icon h-[0.9em] w-[0.9em] translate-y-[0.1em] self-center" />
      <span className="instagram-link-text">{children}</span>
    </a>
  );
}
