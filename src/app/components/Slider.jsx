import { Avatar } from "@/components/ui/Avatar";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ChartLine,
  CircleCheck,
  Ear,
  Search,
  ShieldCheck,
  TrendingUp,
  Video,
  Volume2,
} from "lucide-react";
import Link from "next/link";

const POPULAR_DRILLS = [
  "Cardiovascular Viva",
  "Neuro Cranial Nerves",
  "Thorax Viscera Cards",
  "Surgery Instruments",
];

const AUSCULTATION_BARS = [
  "h-3 bg-tertiary/50",
  "h-6 bg-tertiary",
  "h-4 bg-tertiary/70",
  "h-7 bg-tertiary",
  "h-3 bg-tertiary/60",
  "h-5 bg-tertiary",
  "h-8 bg-tertiary",
  "h-4 bg-tertiary/60",
  "h-6 bg-tertiary",
  "h-3 bg-tertiary/50",
  "h-5 bg-tertiary",
  "h-7 bg-tertiary",
  "h-4 bg-tertiary/70",
  "h-2 bg-tertiary/40",
];

const TRAJECTORY_ROWS = [
  "14 Viscera & Embryo Model Viva Cards Cleared",
  "3 ECG & Chest X-Ray Simulator Stations",
  "Zero-Anxiety External Examiner Prep",
];

export default function Slider() {
  return (
    <section className="relative w-full overflow-hidden bg-[#080614] pt-12 pb-24 lg:pt-16 lg:pb-32 border-b border-outline-variant/30">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[480px] rounded-full bg-primary-container/20 blur-[140px]" />
        <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] rounded-full bg-secondary-container/20 blur-[130px]" />
        <div className="absolute top-1/2 -right-20 w-[440px] h-[440px] rounded-full bg-tertiary-container/20 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#c3c0ff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-high/80 border border-primary/40 backdrop-blur-xl shadow-lg shadow-primary/10 mb-8">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary shadow-[0_0_8px_#68dba9]" />
          </span>
          <span className="text-[11px] sm:text-[12px] font-display font-bold tracking-wider text-primary uppercase">
            Elevated Clinical Mentorship &bull; 1,200+ Honors Candidates
          </span>
        </div>

        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Ace your MBBS Viva with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-tertiary drop-shadow-sm">
              doctors who passed with Honors.
            </span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8">
            Direct 1-on-1 bedside simulations, high-yield viscera viva cards, and surgical OSCE
            drills taught by BMDC verified registrars and demonstrators from DMC, CMC &amp; SSMC.
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto mb-14">
          <div className="relative flex items-center p-2 rounded-2xl bg-surface-container-low/95 border border-primary/30 backdrop-blur-xl shadow-2xl transition-all hover:border-primary/60">
            <div className="flex items-center pl-3.5 pr-2 text-outline">
              <Search className="w-[22px] h-[22px] text-primary" />
            </div>
            <input
              type="text"
              placeholder="Search by subject e.g. Pathology, or mentor from DMC, CMC..."
              className="w-full bg-transparent text-body-md text-white placeholder:text-outline focus:outline-none py-2 px-1"
            />
            <Link
              href="#tutors-directory"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-container to-[#6049e8] text-white text-label-md font-bold shadow-lg hover:from-primary-container/90 hover:to-[#6d57ef] transition-all shrink-0"
            >
              <span>Match Tutor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-3.5 text-xs text-on-surface-variant">
            <span className="font-medium text-outline flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-tertiary" /> Popular Drills:
            </span>
            {POPULAR_DRILLS.map((drill) => (
              <Link
                key={drill}
                href="#tutors-directory"
                className="px-2.5 py-1 rounded-full bg-surface-container-high/70 hover:bg-surface-container-highest border border-white/10 text-white transition-colors"
              >
                {drill}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-4 rounded-2xl bg-surface-container-low/90 border border-white/10 p-5 shadow-xl flex flex-col justify-between hover:border-tertiary/40 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
                  <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                    Today&apos;s Clinical Case
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-tertiary/10 text-tertiary border border-tertiary/30">
                  Daily OSPE
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Ear className="w-4 h-4 text-tertiary" /> Mitral Regurgitation
                  </span>
                  <span className="text-[10px] font-mono text-outline">Grade 3/6 Pan-systolic</span>
                </div>
                <div className="flex items-center gap-1 h-8 my-2 px-2 bg-surface-container-high rounded-lg">
                  {AUSCULTATION_BARS.map((bar, index) => (
                    <span
                      key={index}
                      className={`w-1 rounded animate-pulse ${bar}`}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-on-surface-variant font-mono mt-1">
                  Radiation to left axilla with high-pitched blowing systolic murmur.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/10">
                <Avatar size="xs" name="Dr. Nusrat Jahan" className="bg-surface-container-highest" />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    Dr. Nusrat Jahan <span className="text-[10px] text-tertiary font-mono">CMC</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant italic mt-0.5">
                    &quot;In viva, examiner always asks for differentiation between MR and TR. Note
                    the respiratory variation.&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <button
                type="button"
                className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-white text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-tertiary" />
                <span>Listen Auscultation Audio</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl bg-gradient-to-b from-surface-container-high/90 to-surface-container-low/95 border-2 border-primary/50 p-6 shadow-2xl flex flex-col justify-between relative group hover:border-primary transition-all duration-300 transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary-container to-[#6049e8] text-white text-[11px] font-bold font-display tracking-wider shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary motion-safe:animate-ping" />
              FEATURED MENTOR OF THE DAY
            </div>

            <div className="pt-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <Avatar size="lg" name="Dr. Ariful Islam" ring="primary" status="tertiary" statusLabel="Available now" />
                  <div>
                    <h3 className="text-headline-sm text-white flex items-center gap-1.5">
                      <span>Dr. Ariful Islam</span>
                      <BadgeCheck className="w-[18px] h-[18px] text-tertiary" />
                    </h3>
                    <div className="text-xs text-primary font-medium mt-0.5">
                      Dhaka Medical College (DMC)
                    </div>
                    <div className="text-[11px] text-tertiary-fixed-dim font-mono">
                      BMDC #A-84921 &bull; Cardiology Resident
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-surface-container-lowest/70 border border-white/10">
                  <span className="text-[10px] uppercase text-outline block">Viva Score</span>
                  <span className="font-bold text-white text-sm font-display">Honors 88%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-lowest/70 border border-white/10">
                  <span className="text-[10px] uppercase text-outline block">Availability</span>
                  <span className="font-bold text-tertiary text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> In 15 mins
                  </span>
                </div>
              </div>

              <div className="mt-3 p-3 rounded-xl bg-surface-container/60 border border-white/10">
                <div className="text-[11px] text-on-surface-variant flex items-center justify-between">
                  <span>Specialty:</span>
                  <span className="text-white font-medium">Physiology &amp; Cardiovascular OSPE</span>
                </div>
                <div className="text-[11px] text-on-surface-variant flex items-center justify-between mt-1">
                  <span>Mentored:</span>
                  <span className="text-white font-medium">380+ MBBS Candidates</span>
                </div>
              </div>
            </div>

            <div className="pt-5 space-y-2">
              <Link
                href="#tutors-directory"
                className="w-full py-3 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white text-label-md font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-container/30 transition-all"
              >
                <CalendarCheck className="w-[18px] h-[18px]" />
                <span>Instant Book Session (৳1,200/hr)</span>
              </Link>
              <div className="flex items-center justify-center gap-4 text-[11px] text-outline pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-tertiary" /> Escrow Protected
                </span>
                <span className="flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-primary" /> 1-on-1 HD Viva Room
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl bg-surface-container-low/90 border border-white/10 p-5 shadow-xl flex flex-col justify-between hover:border-primary/40 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <ChartLine className="w-[18px] h-[18px] text-primary" />
                  <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                    Student Trajectory
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30">
                  Verified Result
                </span>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-lowest/80 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold text-white block">Sayeed Kabir</span>
                    <span className="text-[10px] text-on-surface-variant">
                      Shaheed Suhrawardy Med (SSMC)
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-mono text-[10px] font-bold">
                    +42% Viva Score
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-on-surface-variant">Anatomy 1st Prof Board</span>
                    <span className="text-tertiary font-bold">Passed with Honors</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-tertiary w-[92%]" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-outline font-mono">
                    <span>Baseline: 52%</span>
                    <span>Honors Threshold: 75%</span>
                    <span className="text-white font-bold">Achieved: 88%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {TRAJECTORY_ROWS.map((row) => (
                  <div key={row} className="flex items-center gap-2 text-xs text-white">
                    <CircleCheck className="w-4 h-4 text-tertiary" />
                    <span>{row}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2">
              <Link
                href="#how-it-works"
                className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <span>Read Candidate Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
