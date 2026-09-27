/**
 * Lab — hardware that is designed but not yet built, plus the one piece
 * that was. Surfaced at /lab.
 *
 * Status is load-bearing: "in-design" means a finished architecture on
 * paper, nothing soldered. Never promote an entry to "built" without a
 * physical prototype; a visitor who asks to see it has to be shown one.
 *
 * Privacy: describe purposes generically. No routes, no addresses, no
 * neighbourhood detail — the Nexus modules in particular are described
 * by what they sense, never by where they'd go.
 */

export type LabStatus = "built" | "in-design";

export type LabSpec = {
  label: string;
  value: string;
};

export type LabEntry = {
  id: string;
  name: string;
  status: LabStatus;
  /** One-sentence summary. */
  summary: string;
  /** Short paragraphs of design reasoning. */
  body: readonly string[];
  /** Key figures and parts, as label/value rows. */
  specs: readonly LabSpec[];
  /** Decisions that were proposed and then cut — the part worth reading. */
  cut?: readonly string[];
};

export const LAB: readonly LabEntry[] = [
  {
    id: "arc-reactor",
    name: "Arc Reactor wearable",
    status: "in-design",
    summary:
      "A flat, chest-worn vitals monitor that streams ECG, blood oxygen and motion continuously, and can call for help over satellite when there's no phone signal.",
    body: [
      "It started much smaller. I wanted to control my PC from my earbuds: tap once to open Discord, tap again for YouTube, no screen needed. Then it picked up a more serious job, letting my mum know I'm safe without me having to text her, and grew into a full vitals monitor. It's worn on the chest because that's where it can hide, and because, honestly, a glowing disc on your chest looks cool. Of everything in the lab, it's the one I most want to build. The blocker isn't money, it's time, and it's first in line after Class XII.",
      "The constraint that shaped everything: it has to sit flat under a school shirt without a bulge. So compute is split in two. An always-on ESP32-S3 runs the sensors, keeps rolling trend averages in RTC memory and decides when something is an emergency. A Raspberry Pi Compute Module 4 stays completely power-gated off behind a load switch, and only wakes when the ESP32 flags an emergency — to compose a richer message, add GPS and context, and send it.",
      "Power is two electrically separate domains, on purpose. Coin cells run the ESP32 and every sensor; a flat LiFePO4 pack sits untouched for the emergency path. A dying coin cell can never drain the reserve meant for the one moment that matters.",
      "No standard lithium-polymer cell anywhere: a pouch cell that can go into thermal runaway has no business against someone's chest. LiFePO4 costs some energy density and doesn't vent violently; coin cells come in rigid cases that can't swell. The enclosure still gets a protection IC, a thermistor, an isolation layer between cells and body, and room for a cell to swell.",
    ],
    specs: [
      { label: "Always-on brain", value: "ESP32-S3 — vitals, trend detection, trigger logic" },
      { label: "Emergency brain", value: "Raspberry Pi CM4, power-gated until triggered" },
      { label: "ECG", value: "AD8232 on the chest, ~170µA, hardware shutdown pin" },
      { label: "SpO₂ / PPG", value: "MAX30102 on the chest, ~0.6–1.2mA at 50 sps" },
      { label: "Motion", value: "MPU6050 — fall detection and posture" },
      { label: "Also sensed", value: "Skin temperature, respiration via a belly strain band" },
      { label: "Radios", value: "SIM7600G-H cellular + Iridium 9603N satellite (SBD)" },
      { label: "Sensing mode", value: "Continuous streaming, report every 5 minutes" },
      { label: "Domain A", value: "2–3 × CR2477 coin cells, ~2.05mA average draw" },
      { label: "Domain A runtime", value: "~30 days on two cells, ~43 days on three" },
      { label: "Domain B", value: "~3,000mAh flat LiFePO4, idle until an emergency" },
      { label: "Emergency runtime", value: "~2.4 hours at full ~1.27A draw" },
    ],
    cut: [
      "An hourly Compute Module wake-up for trend analysis — the ESP32 can keep rolling averages itself, so the big chip never needs a routine job.",
      "ECG waveform pattern-matching against past readings — not what the device is for.",
      "Running the Compute Module from coin cells — its peak draw is 50–100× what a coin cell can deliver continuously, so the voltage would collapse, not just drain.",
      "One shared battery with a firmware reserve floor — replaced by two fully isolated domains.",
      "A supercapacitor to jump-start the Compute Module — right for millisecond bursts, wrong for tens of seconds. A small 1–2F supercap does stay on the trigger line, so the wake signal fires even from a nearly flat coin cell.",
    ],
  },
  {
    id: "nexus-modules",
    name: "Nexus modules",
    status: "in-design",
    summary:
      "A small mesh of weatherproof sensor nodes that tracks an approaching animal — where it is, how fast it's moving, how soon it arrives — without ever identifying a person.",
    body: [
      "Each node senses presence and motion with mmWave radar, plus vibration, temperature, humidity, pressure and light. There is deliberately no microphone and no camera on any module: the system is built to answer 'is something coming, and how fast' and to be structurally incapable of answering 'who is that'.",
      "Nodes talk to each other over LoRa in India's 865–867MHz band, with a few gateway nodes carrying cellular backhaul. A hub correlates the timing of detections across neighbouring nodes into a live track — distance, velocity and an ETA — instead of a pile of isolated pings.",
      "Mounting has to be reversible: a fixed magnetic shell holds the solar panel and charging circuit, and the battery-and-electronics core swaps out on magnetic pogo pins without disturbing it. VHB tape or magnets, no drilling — and only on property where there's permission.",
    ],
    specs: [
      { label: "Presence", value: "mmWave radar (LD2410 / LD2450)" },
      { label: "Tamper", value: "MPU6050 vibration" },
      { label: "Environment", value: "BME280 + BH1750" },
      {
        label: "Deliberately absent",
        value: "Microphones, cameras, anything that identifies people",
      },
      { label: "Mesh", value: "LoRa, 865–867MHz, cellular gateway nodes" },
      { label: "Power", value: "Solar shell + magnetic swap-out core" },
      { label: "Fusion", value: "Hub correlates node timing into position, speed, ETA" },
    ],
  },
  {
    id: "reactor-hud",
    name: "Reactor HUD",
    status: "in-design",
    summary:
      "One fused display joining the wearable's vitals, the Nexus modules' tracks and public data — traffic, weather, air quality, transit, civic alerts — with an automatic check-in.",
    body: [
      "The HUD is where the other two designs meet. If the wearer hasn't checked in by an expected arrival time, it pings a trusted contact on its own — alongside the satellite emergency path, not instead of it.",
    ],
    specs: [
      { label: "Local inputs", value: "Arc Reactor vitals + Nexus module tracks" },
      { label: "Public inputs", value: "Traffic, weather, AQI, transit, news and civic alerts" },
      { label: "Safety net", value: "Missed check-in alerts a trusted contact" },
    ],
  },
  {
    id: "maggy-box",
    name: "Maggy, as a box on the door",
    status: "in-design",
    summary:
      "MagLock's voice assistant moved off the phone and into a small device at the door, with its own microphone and speaker.",
    body: [
      "Maggy already locks, unlocks and remembers from inside MagLock's app. The next step gives her a body: a box by the door that hears the request and acts on the lock directly. The hard requirement is latency — respond and act in under three seconds, or it's slower than using a key.",
    ],
    specs: [
      { label: "Hardware", value: "Microphone + speaker, mounted at the door" },
      { label: "Budget", value: "Hear, decide and act in under 3 seconds" },
      { label: "Reach", value: "MagLock's locks first; later the rest of my systems" },
    ],
  },
  {
    id: "bionic-hand",
    name: "Bionic hand exoskeleton",
    status: "built",
    summary:
      "A biomimetic bionic hand and hand-exoskeleton prototype, built as a robotics group project and shown at a science exhibition.",
    body: [
      "The one entry on this page that exists as a physical prototype today — the others are finished designs waiting on parts and time.",
    ],
    specs: [
      { label: "Built", value: "December 2025, robotics group project" },
      { label: "Shown", value: "Science exhibition" },
    ],
  },
];
