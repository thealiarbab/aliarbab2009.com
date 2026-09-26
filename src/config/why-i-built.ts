/**
 * Why-I-built — surfaced in /about § 06 as first-person essays
 * explaining the motivation behind each project.
 *
 * Structure per entry: problem (what's wrong with the status quo),
 * why-me (how Ali specifically came to it), learned (what shipping
 * actually taught him). Each block runs ~60-90 words. The
 * pull-quote is the line worth a reader pausing on.
 *
 * Privacy hard-rule: no city, no school, no peer/teacher names. Talk
 * about audiences (Indian teenagers, Hindi-first shopkeepers, the
 * household network) — those are product facts. Don't talk about
 * institutions Ali specifically attended.
 *
 * Truth rule: every "learned" block describes something that actually
 * happened in the project's history — a bug in its logs, a decision in
 * its docs. No invented percentages, no fine-tuning that never ran. A
 * reader who asks "tell me more about that" has to get a real story.
 *
 * Linked to PROJECTS by slug. If a project gets added/removed, this
 * file silently follows; missing entries just don't render.
 */

export type WhyIBuiltEntry = {
  /** Matches Project.slug. */
  slug: string;
  /** ~60-80 words. What's wrong with the status quo. */
  problem: string;
  /** ~60-80 words. Why Ali specifically. */
  why: string;
  /** ~60-80 words. What shipping actually taught him. */
  learned: string;
  /** Optional one-line resonant quote. Pulled out in editorial type. */
  pullQuote?: string;
};

export const WHY_I_BUILT: readonly WhyIBuiltEntry[] = [
  {
    slug: "stocksaathi",
    problem:
      "Indian high-school curricula teach the mechanics of money — compound interest, GST, simple budgeting — and skip behavioural finance entirely. Teenagers leave school with formulas but no instinct for how their own brain will sabotage them once real rupees are involved. The market education that exists is written for adults, in English, by full-time investors. It reads like job training, not learning.",
    why: "I'm 17. I've watched the people around me get their first taste of investing through whatever influencer's reel showed up that morning. The advice ranges from technically wrong to actively harmful. I'm one peer group away from the audience that needs this — not a finance professional translating down, but someone who started where they're starting now.",
    learned:
      "My users can't tell a real number from an invented one, so a confident wrong answer is the worst thing the coach can do. I learned that by reading over a thousand logged coach messages: it had made up an entire trading record for one user and defended it for four turns, while every automated test I'd written stayed green. Telling a model not to lie was only half the fix. Giving it the real data was the other half.",
    pullQuote:
      "Telling a model not to lie was only half the fix. Giving it the real data was the other half.",
  },
  {
    slug: "spendincheck",
    problem:
      "Most expense trackers are very good at telling you what you spent and very bad at telling you whether that was a problem. A list of transactions can't answer the only question that matters at the end of the month: am I over or under, and by how much? Investments usually live in a different app entirely, so net worth is a guess.",
    why: "My Class XII Computer Science practical had to be a Python program backed by an SQL database, and I didn't want to build something I'd never open again. So I built the tracker I actually wanted — then kept going after it was submitted, because the parts that made it good for an exam were exactly the parts that made it easy to turn into a real product.",
    learned:
      "Keeping every SQL query in one module, returning plain data, meant I could throw away the whole frontend and rebuild it in React without writing a single new query. And testing against a real Postgres database instead of a mock caught the bug that matters most in a finance app: a query that forgets its user filter looks perfectly correct in Python and only misbehaves in the database.",
    pullQuote:
      "A query that forgets its user filter looks perfectly correct in Python and only misbehaves in the database.",
  },
  {
    slug: "bolhisaab",
    problem:
      "The shopkeeper at the corner store knows their books down to the rupee, in their head. To get that knowledge into accounting software they have to translate it twice — into English, then into the app's idea of what counts as a credit versus a debit. That translation tax means most don't bother, and the books stay in a paper notebook that doesn't survive a flood.",
    why: "I grew up hearing shopkeepers settle accounts in Hindi mixed with two or three other languages, naming customers and amounts in a flow no accounting app is designed around. Before writing code I went and asked local shopkeepers how they actually keep their books. Voice was the obvious interface once I noticed nobody had built it for them.",
    learned:
      "Understanding Hindi was the easy part. The hard part was that speech recognition returns 'Ram' one time and 'राम' the next, and every mismatch quietly created a duplicate customer holding half their debt. Fixing it took Devanagari-to-Latin transliteration, phonetic matching, and a one-tap merge for the duplicates already made. I also learned to measure models instead of trusting their reputations: a much larger model failed strict JSON output most of the time, so the small, fast one stayed primary.",
    pullQuote:
      "Understanding Hindi was the easy part. Knowing that Ram and राम are the same customer was not.",
  },
  {
    slug: "maglock",
    problem:
      "Every consumer smart lock I looked at routed door-state data through a server in some other country, behind a vendor account that could be cancelled, throttled or monetised at will. A locked door is the most basic privacy primitive a home has. It shouldn't be conditional on a third party's business model.",
    why: "I wanted a lock where the whole chain — the firmware on the relays, the camera at the door, the app on the phone — was mine to read and fix. Nothing leaves the house except through a tunnel I control, and if that tunnel goes down the lock keeps working on the home network. The house decides, not a vendor.",
    learned:
      "Hardware fails in ways a browser never does. The camera's video stream blocked the ESP32's web-server thread, so the lock stopped answering the moment someone watched the feed. Wiring the relays so the doors fail secure meant a power cut locks the house instead of opening it. And I hardcoded my WiFi password into the firmware early on — the easiest mistake to make, and the hardest to walk back once code is public.",
    pullQuote:
      "A locked door is the most basic privacy primitive a home has — it shouldn't be conditional on a third party's business model.",
  },
  {
    slug: "sovereign-alpha",
    problem:
      "Claims that a language model can beat the market are nearly impossible to check, because most backtests quietly cheat. If a simulated trade on a Tuesday can see Wednesday's news or Wednesday's price, the results look brilliant and mean nothing. A single leaked row invalidates every number built on top of it, and nobody reading the chart can tell.",
    why: "I'm heading toward quantitative finance and wanted to answer that question honestly rather than trust someone's screenshot of a Sharpe ratio. So I designed a harness where cheating is structurally impossible: everything runs locally, every run can be reproduced byte for byte, and the simulation cannot see its own future.",
    learned:
      "Rules you care about should break the build, not live in a README. The temporal firewall is enforced by a planted set of future-dated rows that fails CI if anything touches it, plus property-based tests on every transform. Building a synthetic data generator first meant every module could be finished and tested before the hardware and the real corpus ever arrive.",
    pullQuote:
      "One silent leak of tomorrow's data into today invalidates every result built on top of it.",
  },
  {
    slug: "lamecraft",
    problem:
      "Hosting a handful of personal sites and tools usually means either paying for servers you barely use or forwarding ports on your home router and hoping nothing finds them. And everything I built looked different from everything else, because every project started its styling from zero.",
    why: "I wanted a corner of the internet that ran on my own machine, and one visual language I could carry from project to project. LameCRAFT became both: the server my pages run on, the control panel I use to watch it, and the design system that MagLock's app and my study pages are built from.",
    learned:
      "Write a design system down as data, not as a mood board. The Command Nexus palette lives in one JSON spec — tokens, fonts, motion rules and a list of things never to do — so any page, app or tool can reproduce it exactly. And a tunnel beats port forwarding: nothing on the home network is exposed, and there's no hosting bill.",
    pullQuote: "Create once, mutate forever.",
  },
];
