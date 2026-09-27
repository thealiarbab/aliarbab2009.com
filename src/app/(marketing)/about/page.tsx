import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { JourneySection } from "@/components/about/journey-section";
import { WhyIBuiltSection } from "@/components/about/why-i-built-section";
import { InstagramLink } from "@/components/shell/social-links";
import { JsonLd } from "@/components/seo/json-ld";
import { aboutPageJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Class XII student who builds fintech, voice and hardware projects. The long version: the projects, the journey behind them, recognition, and why I built each one.",
  path: "/about",
  ogImageAlt: "About Ali Arbab — long-version bio",
});

export default function AboutPage() {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 pb-16 sm:pt-20">
      <JsonLd data={aboutPageJsonLd()} />
      <div className="brutalist-grid" aria-hidden />

      {/* MASTHEAD */}
      <header className="mb-16 grid grid-cols-12 gap-4 border-b-2 border-[var(--color-border)] pb-6">
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Author
          </p>
          <p className="font-mono text-sm font-medium">{siteConfig.author}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Section
          </p>
          <p className="font-mono text-sm font-medium">/about — long version</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Class
          </p>
          <p className="font-mono text-sm font-medium">XII · final year</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Navigate
          </p>
          <p className="font-mono text-sm font-medium">
            <Link href="/" className="hover:text-[var(--color-primary)]">
              ← home
            </Link>
          </p>
        </div>
      </header>

      {/* § 01 — LETTER */}
      <section className="mb-24 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 01
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Hello
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h1
            className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Hi &mdash; I&apos;m Ali.
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-[var(--color-fg)]">
            <p>
              I&apos;m in my final year of school, I&apos;ve been taking things apart since I was
              three, and I have real trouble stopping once I start building something. Most days
              that means code. On a good day it means code for fifteen hours straight, through every
              meal, until someone makes me stop.
            </p>
            <p>
              I&apos;m happiest inside a machine: opening up a PC, working out why a server
              can&apos;t be reached, following what a packet actually does on its way across the
              internet. I like maths and physics for the same reason &mdash; they explain how things
              work. I used to read constantly; these days building eats that time. What I want most
              from the next few years is simple: to be in a room full of people who get as carried
              away by this as I do.
            </p>
            <p>
              The people around me put up with a lot of it. My smart lock started as a secret
              project, the week I caught myself about to order a sixth late-night burger and decided
              to put that into something I&apos;d actually want to build; my family thought I&apos;d
              lost it and kept poking around until I told them what it was. My mum has woken me with
              a bucket of water. The neighbour I teach has watched me spend two days rescuing his
              PC. They turn up all over this page.
            </p>
            <p>
              The work itself lives on the{" "}
              <Link
                href="/projects"
                className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                project pages
              </Link>
              : a paper-trading coach for teenagers at{" "}
              <a
                href="https://stocksaathi.co.in"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                stocksaathi.co.in
              </a>{" "}
              that placed second nationally, a budget tracker at{" "}
              <a
                href="https://spendincheck.com"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                spendincheck.com
              </a>
              , and four more. This page is about the person behind them.
            </p>
            <p>
              Whoever you are &mdash; admissions officer, recruiter, collaborator, curious reader
              &mdash; thanks for spending a few minutes here. If anything below sparks a question,
              there&apos;s a contact form at{" "}
              <Link
                href="/contact"
                className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                /contact
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* § 02 — STORY (origin → curiosity → turning point → how I work) */}
      <section className="mb-24 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 02
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Story
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h2
            className="mb-8 text-[clamp(2rem,4vw,3.5rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The long way here.
          </h2>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-[var(--color-fg)]">
            <p>
              I was three when I started taking things apart &mdash; toys, mostly, dissected and
              smashed for the crime of being interesting. The software came later. At thirteen,
              working through a school Python book, I wrote a small password-and-login system, and
              something clicked: the same itch, now with no screws to strip.
            </p>
            <p>
              Before that I just thought programmers were the coolest people alive &mdash; they
              could make <em>anything</em>. My phupa &mdash; my uncle &mdash; turned that into a
              direction and told me to start with C. I did. My first real war was a missing
              semicolon that cost me three hours; I&apos;ve respected compilers ever since.
            </p>
            <p>
              What followed was a long stretch of building for its own sake: a Minecraft server for
              friends, a pile of rough Python minigames I&apos;d rather not link, and a genuine
              obsession with how the internet works underneath &mdash; how a server gets discovered
              from the other side of the world, how packets actually move, and how you serve
              something from your own machine when your ISP hides you behind carrier-grade NAT. That
              rabbit hole became{" "}
              <Link
                href="/projects/lamecraft"
                className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                LameCRAFT
              </Link>
              , the home server this site&apos;s whole approach to self-hosting grew out of.
            </p>
            <p>
              The turn from &ldquo;messing around&rdquo; to &ldquo;I build real things&rdquo; has a
              date on it: the buildathon. Thirty-six hours, a brief set on the day, and StockSaathi
              built from nothing. The first morning started with twenty-three minutes of sleep,
              ended by a friend barging in at 5am to pack my things while my mum tried to wake me
              with buckets of water. When the organisers sent everyone home that evening to prepare
              for the judges the next day, I didn&apos;t stop: I kept shipping on a laptop wherever
              I happened to be &mdash; in a Nike store, around the city, and at the friend&apos;s
              mansion we were staying at, until I passed out at 2am, slept straight through the
              burger I&apos;d been waiting for, and had to be carried up two floors to bed by two
              friends.
            </p>
            <p>
              We finished one point behind first place, and the judges kept circling back to two
              things: the idea and the speed. I haven&apos;t really slowed down since.
            </p>
            <p>
              When I lock into something, it&apos;s fifteen-hour days &mdash; through breakfast,
              lunch, dinner, and well past when I should have stopped. I don&apos;t stay stuck for
              days at a time; I chase the bug, ask the people around me, and keep the thing moving.
              If I had to name the one rule I won&apos;t compromise on, it&apos;s speed &mdash; the
              distance between an idea and something you can actually use.
            </p>
            <p>
              Not everything works. The project I learned the most from is the one that burned me
              &mdash; literally, over-soldering a biomimetic bionic hand for a science exhibition.
              It wasn&apos;t ranked and it didn&apos;t win. People still stopped to stare, and I
              walked away knowing more about hardware, patience, and my own limits than any project
              that simply worked has taught me.
            </p>
          </div>

          <div className="mt-10 border-t-2 border-[var(--color-border)] pt-8">
            <p className="mb-6 font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              Two people who made this better
            </p>
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-[var(--color-fg)]">
              <p>
                Since 2024 I&apos;ve been teaching a younger neighbour, now in Class X. It started
                with programming, then spread to everything I was obsessed with: how to host a
                server, how Minecraft and its packets actually work, and what networking looks like
                under the hood. There&apos;s a running joke that I killed his monitor &mdash; it
                died on its own, and I have been blamed for it ever since. He comes over to watch me
                build, and he&apos;s about to get his hands on MagLock. The moment that stuck: his
                PC locked him out, and getting him back in turned into a two-day operation with him
                watching over my shoulder the entire time. When it finally opened, he looked at me
                and said, &ldquo;Now I accept you&apos;re a PC goat.&rdquo; I&apos;ve had worse
                reviews.
              </p>
              <p>
                StockSaathi&apos;s brand ambassador was never a hire.{" "}
                <InstagramLink href="https://www.instagram.com/devaanshh.04/">
                  Devansh
                </InstagramLink>{" "}
                started shouting the project&apos;s name everywhere he went &mdash; loudly enough
                that he was putting his discipline-coordinator badge at risk doing it. When I
                realised he was doing all of it without anyone asking him to, I made it official.
                His first review of the app, verbatim: &ldquo;the UI is sexy.&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-10 border-t-2 border-[var(--color-border)] pt-8">
            <p className="mb-6 font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              Outside the code
            </p>
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-[var(--color-fg)]">
              <p>
                Before any of this, I was a Bed Wars player &mdash; years of Bed Wars and Capture
                the Wool on Hypixel. My 4v4v4v4 record stands at 621 kills, 263 final kills and 82
                beds broken. My favourite moment was being hired as a mercenary on an undercover
                account to help a friend&apos;s team kill the Ender Dragon before the other team
                could.
              </p>
              <p>
                I&apos;ve done maths for fun since sitting the SOF Olympiads as a kid, and I still
                practise mental arithmetic on ZetaMac, where I&apos;ve pushed my score from an
                average of 26 to a best of 35.
              </p>
              <p>
                The hardest thing I&apos;ve done had nothing to do with code: moving countries
                partway through school. New country, new syllabus, new friends, all at once.
              </p>
              <p>
                I do almost everything in last-minute bursts. I once learned every chapter of
                chemistry in a single day before my half-yearly exams. I have also lost four phones.
              </p>
              <p>
                People sometimes read me wrong. A teacher once suspected I&apos;d cheated because my
                answers were too short and direct. I&apos;d just said what was needed and stopped.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t-2 border-[var(--color-border)] pt-8">
            <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              Right now &mdash; Class XII, CBSE science stream
            </p>
            <ul className="grid grid-cols-2 gap-0 border-2 border-[var(--color-border)] sm:grid-cols-4">
              {["Physics", "Chemistry", "Mathematics", "Computer Science"].map((subject, i) => (
                <li
                  key={subject}
                  className={
                    "flex flex-col gap-2 border-[var(--color-border)] p-5" +
                    (i % 2 === 0 ? " border-r-2" : "") +
                    (i < 2 ? " border-b-2 sm:border-b-0" : "") +
                    (i === 1 ? " sm:border-r-2" : "")
                  }
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-base font-medium">{subject}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* § 03 — JOURNEY · § 04 — ACTIVITIES · § 05 — AWARDS */}
      <JourneySection />

      {/* § 06 — WHY I BUILT (per-project motivation essays) */}
      <WhyIBuiltSection />

      {/* § 07 — CLOSE (signoff + colophon + last-reviewed stamp) */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 07
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Close
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h2
            className="mb-8 text-[clamp(2rem,4vw,3.5rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            That&apos;s the long version.
          </h2>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-[var(--color-fg)]">
            <p>
              Six projects, one site. If you&apos;ve scrolled this far, thank you &mdash;
              that&apos;s a meaningful slice of attention and I don&apos;t take it for granted.
            </p>
            <p>
              What&apos;s next: after boards I&apos;m going all-in &mdash; deliberate structure and
              full days on the build instead of drifting. I want to study computer science, not as a
              finish line but as a launchpad: to finally be in a room full of people as obsessed
              with building as I am, and to make things far bigger than one student and a laptop
              can.
            </p>
            <p>
              A note on this site itself: built in Next.js 15 + Tailwind v4 + TypeScript strict,
              deployed to Vercel. The brutalist Swiss-grid is deliberate &mdash; everything reduces
              to type and hairline borders so the work in the project pages can shout. Source is
              open at{" "}
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                github.com/{siteConfig.githubHandle}
              </a>{" "}
              if you want to see how it&apos;s put together.
            </p>
            <p>
              If anything here matches something you&apos;re building or weighing, the shortest path
              is{" "}
              <Link
                href="/contact"
                className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                /contact
              </Link>
              .
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-[var(--color-primary)] px-5 py-3 font-mono text-xs tracking-[0.2em] text-[var(--color-primary-fg)] uppercase transition-transform hover:-translate-y-0.5"
            >
              Browse all projects
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                &rarr;
              </span>
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-transparent px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-bg)]"
            >
              Resume
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-transparent px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-bg)]"
            >
              Contact
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-[var(--color-border)] pt-4">
            <p className="text-2xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              &mdash; Ali
            </p>
            <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
              Last reviewed{" "}
              <time dateTime={siteConfig.lastReviewedISO}>{siteConfig.lastReviewedISO}</time>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
