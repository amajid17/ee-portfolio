import { useState } from "react";
import {
  ArrowUpRight, Mail, Copy, Check, Send, MapPin, CalendarClock,
  Cpu, Activity, Layers, Terminal, BarChart2, GitBranch, Zap,
  ToggleLeft, FlaskConical, ShieldAlert, ScanLine, WifiOff, ServerCrash
} from "lucide-react";
import { PROFILE } from "../data";
import { Reveal, SectionHeading } from "./chrome";

/* ─────────────────────────────────────────────
   Pipeline diagram
───────────────────────────────────────────── */
function PipelineDiagram() {
  return (
    <div className="rounded-[14px] border border-[rgba(62,255,123,0.2)] bg-black/50 p-5 md:p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#6b7f75]">
          4 TX · 1 RX · RPi 5 · USB serial
        </p>
        <span className="flex items-center gap-1.5 font-mono2 text-[10px] text-[#3eff7b]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3eff7b] animate-pulse" /> STAGE 1–2 ACTIVE
        </span>
      </div>

      <svg viewBox="0 0 580 220" className="w-full h-auto" role="img" aria-label="SPECTRA system pipeline diagram">
        <defs>
          <marker id="arr3" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(62,255,123,0.55)" />
          </marker>
          <marker id="arr3d" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(62,255,123,0.25)" />
          </marker>
        </defs>

        {/* TX nodes */}
        {[38, 82, 126, 170].map((y, i) => (
          <g key={i}>
            <rect x={4} y={y - 14} width={62} height={28} rx="6"
              fill="#0b1210" stroke="rgba(62,255,123,0.4)" strokeWidth="1.2" />
            <text x={35} y={y + 2} textAnchor="middle" fill="#3eff7b" fontSize="9"
              fontFamily="JetBrains Mono" fontWeight="600">TX {i + 1}</text>
            <text x={35} y={y + 12} textAnchor="middle" fill="#6b7f75" fontSize="7.5"
              fontFamily="JetBrains Mono">heartbeat</text>
            <path d={`M66,${y} Q125,${y} 138,104`}
              fill="none" stroke="rgba(62,255,123,0.2)" strokeWidth="1.1" strokeDasharray="5 4">
              <animate attributeName="stroke-dashoffset" from="0" to="18"
                dur={`${1.3 + i * 0.18}s`} repeatCount="indefinite" />
            </path>
          </g>
        ))}

        {/* Offline node indicator */}
        <rect x={4} y={190} width={62} height={22} rx="6"
          fill="rgba(255,93,93,0.06)" stroke="rgba(255,93,93,0.3)" strokeWidth="1"
          strokeDasharray="4 3" />
        <text x={35} y={204} textAnchor="middle" fill="#ff8a8a" fontSize="8"
          fontFamily="JetBrains Mono">TX? offline</text>
        <text x={35} y={14} textAnchor="middle" fill="#6b7f75" fontSize="8.5"
          fontFamily="JetBrains Mono">4× TX nodes</text>

        {/* RX node */}
        <circle cx={160} cy={104} r={26} fill="#0e1a15" stroke="#3eff7b" strokeWidth="1.5" />
        <circle cx={160} cy={104} r={7} fill="#3eff7b">
          <animate attributeName="opacity" values="1;0.35;1" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <text x={160} y={141} textAnchor="middle" fill="#a8bab0" fontSize="9"
          fontFamily="JetBrains Mono">RX</text>

        {/* GPIO label */}
        <rect x={100} y={162} width={120} height={20} rx="5"
          fill="rgba(62,255,123,0.05)" stroke="rgba(62,255,123,0.18)" strokeWidth="1" />
        <text x={160} y={175} textAnchor="middle" fill="#6b7f75" fontSize="8"
          fontFamily="JetBrains Mono">GPIO → fault profile</text>

        {/* USB serial arrow */}
        <path d="M186,104 L222,104" stroke="rgba(62,255,123,0.45)" strokeWidth="1.5"
          markerEnd="url(#arr3)" />
        <text x={204} y={98} textAnchor="middle" fill="#6b7f75" fontSize="8"
          fontFamily="JetBrains Mono">USB</text>

        {/* RPi box */}
        <rect x={224} y={30} width={168} height={152} rx="10"
          fill="#0e1a15" stroke="rgba(62,255,123,0.45)" strokeWidth="1.3" />
        <text x={308} y={50} textAnchor="middle" fill="#6b7f75" fontSize="8.5"
          fontFamily="JetBrains Mono">RASPBERRY Pi 5</text>

        {/* Health monitor sub-column */}
        <rect x={232} y={58} width={68} height={110} rx="6"
          fill="rgba(255,93,93,0.04)" stroke="rgba(255,93,93,0.2)" strokeWidth="1" />
        <text x={266} y={72} textAnchor="middle" fill="#ff8a8a" fontSize="8"
          fontFamily="JetBrains Mono">HEALTH</text>
        {["heartbeat", "packet Δ", "telemetry", "power?"].map((t, i) => (
          <text key={t} x={266} y={86 + i * 13} textAnchor="middle" fill="#6b7f75"
            fontSize="7.5" fontFamily="JetBrains Mono">{t}</text>
        ))}

        {/* Signal pipeline sub-column */}
        <rect x={308} y={58} width={76} height={110} rx="6"
          fill="rgba(62,255,123,0.04)" stroke="rgba(62,255,123,0.2)" strokeWidth="1" />
        <text x={346} y={72} textAnchor="middle" fill="#3eff7b" fontSize="8"
          fontFamily="JetBrains Mono">PIPELINE</text>
        {["preprocess", "1D CNN", "correct", "verify"].map((t, i) => (
          <text key={t} x={346} y={86 + i * 13} textAnchor="middle" fill="#a8bab0"
            fontSize="7.5" fontFamily="JetBrains Mono">{t}</text>
        ))}

        {/* → Dashboard */}
        <path d="M392,104 L428,104" stroke="rgba(62,255,123,0.3)" strokeWidth="1.3"
          strokeDasharray="4 3" markerEnd="url(#arr3d)" />
        <rect x={430} y={64} width={142} height={80} rx="8"
          fill="#0b1210" stroke="rgba(62,255,123,0.22)" strokeWidth="1" />
        <text x={501} y={85} textAnchor="middle" fill="#a8bab0" fontSize="9"
          fontFamily="JetBrains Mono">DASHBOARD</text>
        <text x={501} y={101} textAnchor="middle" fill="#e9f1ec" fontSize="10"
          fontWeight="600" fontFamily="Space Grotesk">React · FastAPI</text>
        <text x={501} y={116} textAnchor="middle" fill="#6b7f75" fontSize="8"
          fontFamily="JetBrains Mono">node health · diag</text>
        <text x={501} y={128} textAnchor="middle" fill="#6b7f75" fontSize="8"
          fontFamily="JetBrains Mono">recovery · replay</text>
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {[
          ["HEALTH",   "Node status, packet gaps, power evidence"],
          ["DIAGNOSE", "HW fault vs signal impairment"],
          ["CORRECT",  "Software fix only when recoverable"],
          ["VERIFY",   "Fresh CSI vs healthy baseline"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-[8px] border border-white/[0.07] bg-white/[0.02] px-2 py-2 text-center">
            <p className="font-mono2 text-[9px] tracking-[0.12em] text-[#3eff7b]">{k}</p>
            <p className="text-[10px] text-[#a8bab0] mt-0.5 leading-snug">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Three AI layers card
   FIX: default collapsed so right column isn't
   enormous on load; button label scoped to
   "example" only since layers always visible.
───────────────────────────────────────────── */
function AILayersCard() {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="rounded-[14px] border border-white/[0.08] bg-[#0b1210] overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#6b7f75]">
          AI architecture · 3 layers
        </p>
        <button
          type="button"
          onClick={() => setShowExample((v) => !v)}
          className="font-mono2 text-[10px] text-[#3eff7b] hover:underline focus-visible:underline"
          aria-expanded={showExample}
          aria-controls="llm-example"
        >
          {showExample ? "hide example" : "show example"}
        </button>
      </div>

      {/* Layer stack — always visible */}
      <div className="divide-y divide-white/[0.05]">
        {/* Layer 1 */}
        <div className="px-5 py-4 flex gap-3 items-start">
          <div className="w-6 h-6 rounded-md bg-[rgba(62,255,123,0.12)] border border-[rgba(62,255,123,0.25)] grid place-items-center shrink-0 mt-0.5">
            <span className="font-mono2 text-[10px] text-[#3eff7b] font-bold">1</span>
          </div>
          <div>
            <p className="text-[12.5px] font-semibold text-white">Signal processing</p>
            <p className="font-mono2 text-[9px] tracking-[0.1em] uppercase text-[#6b7f75] mb-1">Measurement layer</p>
            <p className="text-[12px] leading-relaxed text-[#6b7f75]">
              Parses CSI by sender ID, aligns measurement windows, extracts amplitude,
              phase-related, temporal, and packet-quality features, detects movement,
              and estimates supported signal impairments from raw samples.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {["Python", "NumPy", "SciPy", "pandas"].map((t) => (
                <span key={t} className="font-mono2 text-[9px] px-2 py-0.5 rounded border border-white/10 text-[#6b7f75]">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Layer 2 */}
        <div className="px-5 py-4 flex gap-3 items-start">
          <div className="w-6 h-6 rounded-md bg-[rgba(62,255,123,0.12)] border border-[rgba(62,255,123,0.25)] grid place-items-center shrink-0 mt-0.5">
            <span className="font-mono2 text-[10px] text-[#3eff7b] font-bold">2</span>
          </div>
          <div>
            <p className="text-[12.5px] font-semibold text-white">Fault-diagnosis AI</p>
            <p className="font-mono2 text-[9px] tracking-[0.1em] uppercase text-[#6b7f75] mb-1">Decision-support layer</p>
            <p className="text-[12px] leading-relaxed text-[#6b7f75]">
              A trained 1D CNN classifies CSI-related measurement faults. Rule-based health
              monitoring runs in parallel to detect offline nodes, missing telemetry, and
              observable hardware failures the CNN was not designed to handle. Both tracks
              report structured evidence — neither authorizes corrections directly.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {["PyTorch", "scikit-learn", "diagnostic rules"].map((t) => (
                <span key={t} className="font-mono2 text-[9px] px-2 py-0.5 rounded border border-white/10 text-[#6b7f75]">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Layer 3 */}
        <div className="px-5 py-4 flex gap-3 items-start">
          <div className="w-6 h-6 rounded-md bg-[rgba(168,114,255,0.15)] border border-[rgba(168,114,255,0.3)] grid place-items-center shrink-0 mt-0.5">
            <span className="font-mono2 text-[10px] text-[#c4b5fd] font-bold">3</span>
          </div>
          <div>
            <p className="text-[12.5px] font-semibold text-white">LLM intelligence</p>
            <p className="font-mono2 text-[9px] tracking-[0.1em] uppercase text-[#6b7f75] mb-1">Natural-language layer · optional</p>
            <p className="text-[12px] leading-relaxed text-[#6b7f75]">
              Receives structured diagnostic evidence from layers 1 and 2. Explains what
              was observed, answers operator questions about system status, summarizes fault
              incidents, and generates experiment reports in plain language. Does not invent
              telemetry, assert unconfirmed causes as fact, or independently authorize
              corrective actions.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {["LLM API", "local model"].map((t) => (
                <span key={t} className="font-mono2 text-[9px] px-2 py-0.5 rounded border border-[rgba(168,114,255,0.25)] text-[#c4b5fd]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LLM example — toggled */}
      {showExample && (
        <div id="llm-example" className="border-t border-white/[0.06] bg-black/30 px-5 py-4">
          <p className="font-mono2 text-[9px] tracking-[0.14em] uppercase text-[#6b7f75] mb-3">
            Example · Node 3 goes offline
          </p>

          {/* Structured input to LLM */}
          <div className="rounded-[8px] border border-white/[0.07] bg-white/[0.02] px-3.5 py-3 mb-2 font-mono2 text-[11px] text-[#6b7f75] leading-relaxed overflow-x-auto">
            <span className="text-[#3eff7b]">health_monitor</span>
            {" → "}
            <span className="text-[#a8bab0]">
              node_id: 3 · last_heartbeat: 8s ago · csi_frames: 0 · power_evidence: none · cause: undetermined
            </span>
          </div>

          {/* LLM response */}
          <div className="rounded-[8px] border border-[rgba(168,114,255,0.2)] bg-[rgba(168,114,255,0.04)] px-4 py-3.5">
            <p className="font-mono2 text-[9px] tracking-[0.12em] uppercase text-[#c4b5fd] mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c4b5fd]" /> SPECTRA AI Assistant
            </p>
            <p className="text-[12.5px] leading-[1.7] text-[#e9f1ec]">
              "Node 3 has stopped reporting. The last heartbeat was received 8 seconds ago,
              and no new CSI measurements are available. The cause is undetermined — possible
              explanations include loss of power, a firmware failure, or a disconnected
              communication link. Check the node's power status and connectivity.
              Signal correction is unavailable until measurements resume."
            </p>
          </div>

          <p className="mt-2.5 font-mono2 text-[9px] text-[#4a5a53] leading-relaxed">
            The LLM explains structured evidence. It reported an undetermined cause — not a confirmed power failure. It cannot command recovery.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Senior Design section
───────────────────────────────────────────── */
export function SeniorDesign() {
  return (
    <section
      id="senior-design"
      className="scroll-mt-[80px] py-[72px] md:py-[100px] border-t border-white/[0.06] bg-[#070d0b] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(62,255,123,0.08),transparent)] pointer-events-none" />

      <div className="relative max-w-[1180px] mx-auto px-5 md:px-8">
        <SectionHeading
          num="04 · SENIOR DESIGN 2025–26"
          title="SPECTRA — cooperative Wi-Fi sensing with AI-based fault diagnosis and recovery."
          blurb="Four ESP32-S3 transmitters, one receiver, a Raspberry Pi 5. The system is designed to distinguish hardware availability failures, communication faults, and recoverable signal-measurement impairments — and attempt automated correction only where technically valid. Everything below is designed and actively being built. Results are pending experimental validation."
          right={
            <span className="font-mono2 text-[10px] tracking-[0.12em] uppercase bg-[rgba(62,255,123,0.12)] text-[#3eff7b] border border-[rgba(62,255,123,0.3)] font-semibold rounded-full px-3.5 py-1.5">
              Active · Stage 1–2
            </span>
          }
        />

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-5 items-start">

          {/* ── LEFT column ── */}
          <div className="space-y-4">

            {/* What it is */}
            <Reveal className="rounded-[16px] border border-white/[0.08] bg-[#0b1210] p-6 md:p-8 card-ring">
              <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#3eff7b] mb-3">What it is</p>
              <p className="text-[14.5px] leading-[1.75] text-[#a8bab0]">
                SPECTRA is a cooperative Wi-Fi sensing research prototype. Four{" "}
                <span className="text-white font-medium">ESP32-S3 transmitters</span> send
                coordinated, sequenced packets to one receiver, which captures Channel State
                Information and — under GPIO switch control — applies a selected synthetic
                measurement impairment. That stream travels over USB serial to a{" "}
                <span className="text-white font-medium">Raspberry Pi 5</span>, which runs
                two parallel tracks: a{" "}
                <span className="text-white font-medium">health monitor</span> watching for
                node availability and hardware-level faults, and a{" "}
                <span className="text-white font-medium">signal pipeline</span> running
                preprocessing, a 1D CNN for measurement-fault classification, a correction
                engine, and fresh-data verification. A{" "}
                <span className="text-white font-medium">React + FastAPI dashboard</span> surfaces
                both tracks in real time.
              </p>

              {/* Honest scope note */}
              <div className="mt-5 rounded-[10px] border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                <p className="font-mono2 text-[10px] tracking-[0.14em] uppercase text-[#6b7f75] mb-1.5">Architectural scope</p>
                <p className="text-[13px] leading-[1.65] text-[#6b7f75]">
                  One receiver means per-link fault analysis, not a fully distributed
                  multi-receiver system. The fault injector applies{" "}
                  <span className="text-[#a8bab0]">software-level</span> measurement
                  impairments — it does not retune the radio hardware. Simulated phase drift
                  is not proof that real RF oscillator errors have been corrected. Hardware
                  recovery (restoring power, reconnecting a node) is tracked separately from
                  software correction of measurement impairments.
                </p>
              </div>

              {/* 6 capability cards */}
              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                {[
                  [ServerCrash, "Hardware health monitoring",
                    "Heartbeat timeouts, packet gap analysis, CSI acquisition indicators, and optional power-monitor data combine to flag nodes as offline, suspected power-failed, or unreachable — with cause marked uncertain when evidence is insufficient."],
                  [WifiOff, "Fault taxonomy",
                    "Distinguishes hardware availability failures, communication faults, firmware or CSI-acquisition issues, and recoverable signal-measurement impairments. Missing packets alone do not constitute proof of a hardware fault."],
                  [ToggleLeft, "GPIO-controlled fault injection",
                    "Switch bank on the receiver selects an impairment profile applied to the CSI stream. Switch states are ground-truth labels only — never supplied to the trained model as inputs."],
                  [FlaskConical, "1D CNN fault classifier",
                    "Trains on CSI windows with phase-offset, phase-drift, gain-scaling, and timing impairments. Fault categories are finalized after data collection confirms each is distinguishable from normal environmental variation."],
                  [ShieldAlert, "Correction engine",
                    "Maps an accepted diagnosis to a technically valid recovery routine. Withholds correction when the diagnosis is uncertain, evidence is absent, or the required information is unavailable."],
                  [ScanLine, "Mandatory fresh-data verify",
                    "After every correction the system acquires new CSI and compares movement-detection performance against the healthy baseline. Recovery is not declared because the injector switched off."],
                ].map(([Icon, t, d]) => {
                  const I = Icon as typeof ServerCrash;
                  return (
                    <div key={t as string} className="rounded-[12px] border border-white/[0.07] bg-white/[0.02] p-4">
                      <span className="w-8 h-8 rounded-[8px] grid place-items-center bg-[rgba(62,255,123,0.1)] text-[#3eff7b] border border-[rgba(62,255,123,0.2)] mb-2.5">
                        <I size={15} />
                      </span>
                      <p className="text-[13px] font-semibold text-white mb-1">{t as string}</p>
                      <p className="text-[12.5px] leading-relaxed text-[#6b7f75]">{d as string}</p>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* My scope */}
            <Reveal delay={0.06} className="rounded-[16px] border border-white/[0.08] bg-[#0b1210] p-6 md:p-7 card-ring">
              <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#3eff7b] mb-4">My scope on the project</p>
              <div className="space-y-3">
                {[
                  [BarChart2, "React + FastAPI dashboard",
                    "Live node health, CSI visualizations, fault notifications, diagnosis confidence, correction history, before/after performance, and experiment replay."],
                  [Terminal, "Python backend",
                    "CSI ingestion, telemetry monitoring, experiment management, model inference, correction routing, and health-monitoring coordination over FastAPI."],
                  [Layers, "Signal processing",
                    "CSI parsing by sender ID, sequence-number validation, window alignment, feature extraction, movement detection, and impairment simulation."],
                  [Cpu, "ML pipeline",
                    "Dataset preparation with session-level train/test splits, PyTorch 1D CNN training, optional GRU comparison, and held-out evaluation — in progress."],
                  [GitBranch, "Edge deployment",
                    "Profiling inference latency and memory on the Raspberry Pi 5; ONNX Runtime as an optional deployment path after performance validation."],
                ].map(([Icon, label, desc]) => {
                  const I = Icon as typeof BarChart2;
                  return (
                    <div key={label as string} className="flex gap-3 items-start">
                      <span className="w-7 h-7 rounded-[7px] grid place-items-center bg-[rgba(62,255,123,0.08)] text-[#3eff7b] border border-[rgba(62,255,123,0.18)] shrink-0 mt-0.5">
                        <I size={13} />
                      </span>
                      <div>
                        <span className="text-[13px] font-semibold text-white">{label as string} · </span>
                        <span className="text-[13px] text-[#6b7f75]">{desc as string}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Evaluation */}
            <Reveal delay={0.1} className="rounded-[16px] border border-[rgba(62,255,123,0.25)] bg-[linear-gradient(135deg,rgba(62,255,123,0.08),rgba(62,255,123,0.02))] p-6 md:p-7">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-[10px] bg-[#3eff7b] grid place-items-center text-black shrink-0">
                  <Zap size={18} />
                </span>
                <div>
                  <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#3eff7b] mb-1">
                    How this gets evaluated
                  </p>
                  <p className="font-display font-semibold text-[17px] text-white leading-snug mb-2">
                    Three methods. Same data. Held-out sessions.
                  </p>
                  <p className="text-[13.5px] text-[#a8bab0] leading-relaxed mb-3">
                    Fixed preprocessing, rule-based diagnosis, and AI-assisted selection are
                    compared on the same recordings, injected conditions, and test partitions.
                    Recovery is measured against the healthy baseline on fresh data — not
                    relative to the impaired state. No result is claimed until it appears on
                    the independent test set.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Movement F1 · false-alarm rate",
                      "Fault macro-F1 · confusion matrix",
                      "Recovery Δ vs healthy baseline",
                      "False-recovery rate",
                      "Packet delivery ratio",
                      "Inference latency on RPi",
                    ].map((t) => (
                      <span key={t} className="font-mono2 text-[10px] px-2.5 py-1 rounded border border-[rgba(62,255,123,0.25)] text-[#3eff7b] bg-[rgba(62,255,123,0.06)]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT column ── */}
          <div className="space-y-4">
            <Reveal delay={0.1}><PipelineDiagram /></Reveal>

            <Reveal delay={0.13}><AILayersCard /></Reveal>

            {/* Build sequence */}
            <Reveal delay={0.15} className="rounded-[14px] border border-white/[0.08] bg-[#0b1210] p-6">
              <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#6b7f75] mb-4">
                8-stage build sequence
              </p>
              <div className="space-y-0">
                {(
                  [
                    ["S1–S2", "CSI acquisition + 4-TX operation",
                      "ESP-IDF firmware, USB serial pipeline, sender IDs, heartbeats, transmission schedule", true],
                    ["S3–S4", "Movement detection + fault injection",
                      "Non-AI baseline detector, GPIO switch-controlled impairments, labels isolated from model inputs", false],
                    ["S5–S6", "Health monitor + CNN + correction",
                      "Node fault taxonomy, 1D CNN training, correction engine, fresh-data verify loop", false],
                    ["S7–S8", "Dashboard, deployment + custom PCBs",
                      "React + FastAPI on RPi 5, then 4 TX + 1 RX carrier PCBs after bench prototype validates", false],
                  ] as [string, string, string, boolean][]
                ).map(([q, t, d, active], i) => (
                  <div key={q} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                        active
                          ? "bg-[#3eff7b] shadow-[0_0_10px_rgba(62,255,123,.7)]"
                          : "border border-white/20 bg-transparent"
                      }`} />
                      {i < 3 && <span className="w-px flex-1 bg-white/10 my-1" />}
                    </div>
                    <div className="pb-5">
                      <p className="font-mono2 text-[10px] tracking-[0.12em] text-[#3eff7b]">
                        {q}{active ? " · ACTIVE" : ""}
                      </p>
                      <p className="text-[13.5px] font-semibold text-white">{t}</p>
                      <p className="text-[12px] text-[#6b7f75]">{d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.07] flex flex-wrap gap-1.5">
                {[
                  "ESP32-S3", "ESP-IDF / C", "Python", "FastAPI", "React", "TypeScript",
                  "PyTorch", "NumPy · SciPy", "pandas", "scikit-learn",
                  "WebSockets", "ONNX Runtime", "RPi 5",
                ].map((t) => (
                  <span key={t} className="font-mono2 text-[10px] px-2.5 py-1 rounded border border-white/10 text-[#a8bab0]">{t}</span>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-2 font-mono2 text-[11px] text-[#6b7f75]">
                <Activity size={13} className="text-[#3eff7b] shrink-0 mt-0.5" />
                <span>Custom PCBs — 4 TX carrier + 1 RX carrier — designed only after bench prototype validates firmware and injection mechanism.</span>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Contact
───────────────────────────────────────────── */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — fail silently
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body    = encodeURIComponent(`${form.msg}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="scroll-mt-[80px] py-[72px] md:py-[100px] border-t border-white/[0.06]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        <SectionHeading
          num="05 · CONTACT"
          title="Let's talk hardware."
          blurb="Fastest reply by email — I read everything. Lab reports, résumé, transcript and references available on request."
        />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-5 items-stretch">

          {/* CTA card */}
          <Reveal className="rounded-[20px] border border-[rgba(62,255,123,0.25)] bg-[linear-gradient(160deg,#0e1a15,#0b1210_60%)] p-8 md:p-10 relative overflow-hidden card-ring flex flex-col">
            <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(62,255,123,0.18),transparent)] pointer-events-none" />
            <p className="font-mono2 text-[11px] tracking-[0.18em] uppercase text-[#3eff7b] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3eff7b] animate-pulse" /> {PROFILE.availability}
            </p>
            <h3 className="font-display font-bold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.5vw,3rem)] text-white mb-4">
              Have a bench<br />I can learn on?
            </h3>
            <p className="text-[14.5px] text-[#a8bab0] leading-relaxed mb-8 max-w-[44ch]">
              Internships, lab assistant roles, or feedback on SPECTRA — if it involves
              a scope probe or a soldering iron, I want to hear about it.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#3eff7b] text-black font-mono2 text-[12px] font-semibold tracking-[0.08em] uppercase rounded-[10px] px-6 py-4 hover:bg-white transition-colors"
              >
                <Mail size={15} /> {PROFILE.email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(62,255,123,0.35)] text-[#3eff7b] font-mono2 text-[12px] tracking-[0.08em] uppercase rounded-[10px] px-5 py-4 hover:bg-[rgba(62,255,123,0.1)] transition-colors"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3">
              <div className="rounded-[10px] border border-white/[0.08] bg-black/30 p-4">
                <p className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#6b7f75] mb-1 flex items-center gap-1.5">
                  <MapPin size={11} /> Based in
                </p>
                <p className="text-[13px] text-white font-medium">
                  Jamaica, Queens<br />
                  <span className="text-[#6b7f75] font-normal">On-site NYC · hybrid OK</span>
                </p>
              </div>
              <div className="rounded-[10px] border border-white/[0.08] bg-black/30 p-4">
                <p className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#6b7f75] mb-1 flex items-center gap-1.5">
                  <CalendarClock size={11} /> Reply time
                </p>
                <p className="text-[13px] text-white font-medium">
                  Within 24h<br />
                  <span className="text-[#6b7f75] font-normal">Usually same evening</span>
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-2.5">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-white/10 py-3 font-mono2 text-[11px] tracking-[0.08em] uppercase text-[#a8bab0] hover:text-[#3eff7b] hover:border-[rgba(62,255,123,0.4)] transition-colors">
                GitHub <ArrowUpRight size={13} />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-white/10 py-3 font-mono2 text-[11px] tracking-[0.08em] uppercase text-[#a8bab0] hover:text-[#3eff7b] hover:border-[rgba(62,255,123,0.4)] transition-colors">
                LinkedIn <ArrowUpRight size={13} />
              </a>
              <a href="https://expo.dev/@amajid17" target="_blank" rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-white/10 py-3 font-mono2 text-[11px] tracking-[0.08em] uppercase text-[#a8bab0] hover:text-[#3eff7b] hover:border-[rgba(62,255,123,0.4)] transition-colors">
                Apps <ArrowUpRight size={13} />
              </a>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={0.1} className="rounded-[20px] border border-white/[0.08] bg-[#0b1210] p-8 md:p-10 card-ring">
            <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#6b7f75] mb-1">
              Quick note → opens your mail app
            </p>
            <h4 className="font-display font-semibold text-[20px] text-white tracking-tight mb-6">
              No backend. No tracking. Just email.
            </h4>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#6b7f75] block mb-2">Your name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Engineer"
                    className="w-full rounded-[10px] bg-black/40 border border-white/10 px-4 py-3.5 text-[14px] text-white placeholder:text-[#4a5a53] focus:border-[#3eff7b] outline-none transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#6b7f75] block mb-2">Your email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full rounded-[10px] bg-black/40 border border-white/10 px-4 py-3.5 text-[14px] text-white placeholder:text-[#4a5a53] focus:border-[#3eff7b] outline-none transition-colors"
                  />
                </label>
              </div>
              <label className="block">
                <span className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#6b7f75] block mb-2">Message</span>
                <textarea
                  required
                  rows={6}
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  placeholder="Hi Abdullah — we have a summer opening in sensing or embedded systems. Are you available for a 20-min chat?"
                  className="w-full rounded-[10px] bg-black/40 border border-white/10 px-4 py-3.5 text-[14px] text-white placeholder:text-[#4a5a53] focus:border-[#3eff7b] outline-none transition-colors resize-y"
                />
              </label>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-black font-mono2 text-[12px] font-semibold tracking-[0.08em] uppercase rounded-[10px] py-4 hover:bg-[#3eff7b] transition-colors"
              >
                {sent ? <><Check size={15} /> Opening mail…</> : <><Send size={15} /> Send via email</>}
              </button>
              <p className="font-mono2 text-[10px] text-[#6b7f75] text-center tracking-[0.04em]">
                Prefer attachments? Email your JD directly — I reply with résumé + reports.
              </p>
            </form>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
