import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Anchor,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCopy,
  Compass,
  Crosshair,
  Gauge,
  Globe,
  Layers,
  Mountain,
  Navigation,
  Pause,
  Play,
  Radio,
  Search,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Waves,
} from 'lucide-react';
import {
  GEO_CATEGORIES,
  LIVE_DISPATCH_FEED,
  REGIONS,
  DISRUPTION_SCENARIOS,
} from './data/geopoliticsData';
import { filterRegions, calculateScenarioImpact } from './utils/atlasLogic';

const RISK_STYLES = {
  Critical: {
    badge: 'bg-rose-950/80 text-rose-300 border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.2)]',
    dot: '#f43f5e',
    ring: 'rgba(244, 63, 94, 0.35)',
  },
  High: {
    badge: 'bg-amber-950/80 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
    dot: '#f59e0b',
    ring: 'rgba(245, 158, 11, 0.35)',
  },
  Moderate: {
    badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)]',
    dot: '#22d3ee',
    ring: 'rgba(34, 211, 238, 0.35)',
  },
  Low: {
    badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
    dot: '#10b981',
    ring: 'rgba(16, 185, 129, 0.35)',
  },
};

const CHOKEPOINT_MATRIX = [
  {
    name: 'Strait of Hormuz',
    width: '21 NM',
    flow: '20.8M bbl/d',
    status: 'Critical',
    regionId: 'hormuz-gulf',
    scenarioId: 'hormuz-closure',
  },
  {
    name: 'Strait of Malacca',
    width: '1.7 NM',
    flow: '228 ships/d',
    status: 'High',
    regionId: 'malacca-sea',
    scenarioId: 'malacca-closure',
  },
  {
    name: 'Bab el-Mandeb',
    width: '18 NM',
    flow: '12% Trade',
    status: 'Critical',
    regionId: 'red-sea-bab',
    scenarioId: 'bab-el-mandeb',
  },
  {
    name: 'Taiwan Strait',
    width: '70 NM',
    flow: '48% Fleet',
    status: 'High',
    regionId: 'china-ring',
    scenarioId: 'taiwan-quarantine',
  },
  {
    name: 'Bosporus Strait',
    width: '0.4 NM',
    flow: '114 ships/d',
    status: 'High',
    regionId: 'anatolia-straits',
    scenarioId: 'baseline',
  },
  {
    name: 'Panama Canal',
    width: '110 ft Lock',
    flow: '45 ft Draft',
    status: 'Moderate',
    regionId: 'usa-basin',
    scenarioId: 'panama-drought',
  },
];

function formatUtcClock(date) {
  return date.toISOString().slice(11, 19) + ' UTC';
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionId, setSelectedRegionId] = useState(REGIONS[0].id);
  const [activeScenarioId, setActiveScenarioId] = useState('baseline');
  const [copiedBrief, setCopiedBrief] = useState(false);

  // Interactive Map Layer Toggles
  const [showMountains, setShowMountains] = useState(true);
  const [showRivers, setShowRivers] = useState(true);
  const [showSeaLanes, setShowSeaLanes] = useState(true);

  // Live Satellite & Maritime Telemetry Stream state
  const [utcNow, setUtcNow] = useState(() => new Date());
  const [dispatchIdx, setDispatchIdx] = useState(0);
  const [isStreamLive, setIsStreamLive] = useState(true);
  const [vesselPulseOffset, setVesselPulseOffset] = useState(0);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setUtcNow(new Date());
      if (isStreamLive) {
        setVesselPulseOffset((prev) => (prev === 2 ? -1 : prev + 1));
      }
    }, 1000);

    return () => clearInterval(clockTimer);
  }, [isStreamLive]);

  useEffect(() => {
    if (!isStreamLive) return;
    const feedTimer = setInterval(() => {
      setDispatchIdx((prev) => (prev + 1) % LIVE_DISPATCH_FEED.length);
    }, 5500);
    return () => clearInterval(feedTimer);
  }, [isStreamLive]);

  const activeDispatch = LIVE_DISPATCH_FEED[dispatchIdx];

  const filteredRegions = useMemo(
    () =>
      filterRegions(REGIONS, {
        category: selectedCategory,
        query: searchQuery,
      }),
    [selectedCategory, searchQuery]
  );

  const selectedRegion = useMemo(
    () =>
      REGIONS.find((r) => r.id === selectedRegionId) ||
      filteredRegions[0] ||
      REGIONS[0],
    [selectedRegionId, filteredRegions]
  );

  const activeScenario = useMemo(
    () => DISRUPTION_SCENARIOS.find((s) => s.id === activeScenarioId) || null,
    [activeScenarioId]
  );

  const scenarioImpact = useMemo(
    () => calculateScenarioImpact(activeScenario, REGIONS),
    [activeScenario]
  );

  async function handleCopyBriefing() {
    if (!selectedRegion) return;
    const text = [
      `STRATEGIC BRIEFING: ${selectedRegion.name} (${selectedRegion.coordinatesLabel})`,
      `Category: ${selectedRegion.category} | Risk Level: ${selectedRegion.riskLevel} | Global Trade Share: ${selectedRegion.tradeSharePercent}%`,
      `Terrain Barrier: ${selectedRegion.terrainBarrier}`,
      `River System: ${selectedRegion.primaryRiverSystem}`,
      `Throughput: ${selectedRegion.dailyThroughput}`,
      `Key Chokepoints: ${selectedRegion.keyChokepoints.join(', ')}`,
      `Physical Constraint: ${selectedRegion.physicalPrison}`,
      `Strategic Imperative: ${selectedRegion.strategicImperative}`,
      `Historical Continuity: ${selectedRegion.historicalContinuity}`,
    ].join('\n');

    await navigator.clipboard.writeText(text);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#05090e] text-stone-100 flex flex-col selection:bg-teal-500/30 selection:text-teal-200">
      <style>{`
        @keyframes routeFlow {
          to {
            stroke-dashoffset: -40;
          }
        }
        @keyframes sonarPing {
          0% {
            r: 8;
            opacity: 0.85;
          }
          100% {
            r: 26;
            opacity: 0;
          }
        }
        .animate-route-flow {
          animation: routeFlow 2.2s linear infinite;
        }
        .animate-sonar {
          animation: sonarPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        /* Modern Sleek Tactical Scrollbars (Global + Panels) */
        html,
        .tactical-scroll {
          scrollbar-width: thin;
          scrollbar-color: #134e4a #05090e;
        }
        html::-webkit-scrollbar,
        .tactical-scroll::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        html::-webkit-scrollbar-track,
        .tactical-scroll::-webkit-scrollbar-track {
          background: #05090e;
          border-radius: 9999px;
        }
        html::-webkit-scrollbar-thumb,
        .tactical-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #0f766e 0%, #115e59 100%);
          border-radius: 9999px;
          border: 1px solid rgba(45, 212, 191, 0.2);
        }
        html::-webkit-scrollbar-thumb:hover,
        .tactical-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2dd4bf 0%, #f59e0b 100%);
        }
        html::-webkit-scrollbar-button,
        html::-webkit-scrollbar-button:single-button,
        .tactical-scroll::-webkit-scrollbar-button,
        .tactical-scroll::-webkit-scrollbar-button:single-button {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>

      {/* Editorial Cartographic Header */}
      <header className="border-b border-teal-950/80 bg-gradient-to-r from-[#071018] via-[#0a1620] to-[#071018] sticky top-0 z-20 shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-md bg-gradient-to-br from-amber-500/20 via-teal-500/10 to-stone-900 border border-amber-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] flex items-center justify-center text-amber-300 shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-serif font-bold text-xl tracking-wide text-stone-50">
                  Prisoners of Geography
                </h1>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] bg-amber-500/15 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-xs">
                  Diplomatic Atlas
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Global terrain barriers, navigable river basins &amp; live maritime chokepoint telemetry
              </p>
            </div>
          </div>

          {/* Live UTC Clock & Telemetry Badges */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <div className="flex items-center gap-2 bg-[#0b1722] border border-emerald-700/60 px-3 py-1.5 rounded-xs text-emerald-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{formatUtcClock(utcNow)}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-[#0b1722] border border-teal-800/60 px-3 py-1.5 rounded-xs text-teal-200 shadow-inner">
              <span>{REGIONS.length} THEATRES</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0b1722] border border-amber-800/60 px-3 py-1.5 rounded-xs text-amber-200 shadow-inner">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span>{DISRUPTION_SCENARIOS.length} WAR-GAMES</span>
            </div>
          </div>
        </div>
      </header>

      {/* Real-Time Satellite & Chokepoint Telemetry Ticker */}
      <div className="bg-[#07111a] border-b border-teal-900/60">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider bg-teal-500/15 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded-xs">
              <Activity className="w-3 h-3 text-teal-400" />
              AIS / SAT TELEMETRY
            </span>
            <span className="font-mono font-bold text-amber-300">
              {activeDispatch.sector}
            </span>
            <span className="font-mono text-[11px] text-stone-500 hidden md:inline">
              [{activeDispatch.coords}]
            </span>
            <span className="font-mono text-[11px] text-cyan-300 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-xs">
              {activeDispatch.metric}
            </span>
            <span className="text-stone-300 hidden xl:inline">
              &mdash; {activeDispatch.note}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-[10px] text-stone-400 mr-1">
              {dispatchIdx + 1}/{LIVE_DISPATCH_FEED.length}
            </span>
            <button
              onClick={() =>
                setDispatchIdx(
                  (prev) => (prev - 1 + LIVE_DISPATCH_FEED.length) % LIVE_DISPATCH_FEED.length
                )
              }
              aria-label="Previous telemetry feed"
              className="p-1 rounded-xs bg-[#0d1b28] border border-stone-700 hover:border-teal-400 text-stone-300 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsStreamLive((prev) => !prev)}
              aria-label={isStreamLive ? 'Pause live stream' : 'Resume live stream'}
              className="p-1 rounded-xs bg-[#0d1b28] border border-stone-700 hover:border-amber-400 text-amber-300 cursor-pointer"
            >
              {isStreamLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() =>
                setDispatchIdx((prev) => (prev + 1) % LIVE_DISPATCH_FEED.length)
              }
              aria-label="Next telemetry feed"
              className="p-1 rounded-xs bg-[#0d1b28] border border-stone-700 hover:border-teal-400 text-stone-300 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tactile Naval Command Switchboard (Chokepoint Simulator) */}
      <section className="border-b border-stone-800/90 bg-[radial-gradient(ellipse_at_top,#0d1d2b_0%,#060b11_75%)]">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-amber-300">
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Chokepoint War-Game Console ({DISRUPTION_SCENARIOS.length} Scenarios)</span>
            </div>
            <span className="font-mono text-[11px] text-teal-300/80">
              ACTIVE AIS VESSELS TRACKED: {842 + vesselPulseOffset}
            </span>
          </div>

          {/* 3D Tactile Console Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2.5">
            <button
              onClick={() => setActiveScenarioId('baseline')}
              className={`group relative overflow-hidden text-left px-3 py-2.5 rounded-md border transition-all duration-150 cursor-pointer select-none ${
                activeScenarioId === 'baseline'
                  ? 'bg-gradient-to-b from-teal-500 to-teal-700 border-teal-300/70 text-slate-950 font-bold shadow-[0_3px_0_0_#115e59,0_0_20px_rgba(20,184,166,0.35)] translate-y-[1px]'
                  : 'bg-gradient-to-b from-[#132230] to-[#0b151e] border-stone-700/80 text-stone-200 hover:border-teal-500/60 hover:-translate-y-0.5 shadow-[0_4px_0_0_#04080c] active:translate-y-[3px] active:shadow-none'
              }`}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="flex items-center justify-between gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-wider opacity-80">
                  MODE 00
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeScenarioId === 'baseline'
                      ? 'bg-slate-950 ring-2 ring-white/60'
                      : 'bg-teal-500/40 group-hover:bg-teal-400'
                  }`}
                />
              </div>
              <div className="text-xs font-semibold mt-1 line-clamp-1">
                Normal Transit
              </div>
            </button>

            {DISRUPTION_SCENARIOS.map((scenario, idx) => {
              const isSelected = activeScenarioId === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => setActiveScenarioId(scenario.id)}
                  className={`group relative overflow-hidden text-left px-3 py-2.5 rounded-md border transition-all duration-150 cursor-pointer select-none ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-400 to-amber-600 border-amber-200 text-slate-950 font-bold shadow-[0_3px_0_0_#92400e,0_0_22px_rgba(245,158,11,0.4)] translate-y-[1px]'
                      : 'bg-gradient-to-b from-[#132230] to-[#0b151e] border-stone-700/80 text-stone-200 hover:border-amber-400/60 hover:-translate-y-0.5 shadow-[0_4px_0_0_#04080c] active:translate-y-[3px] active:shadow-none'
                  }`}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider opacity-80 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      SIM 0{idx + 1}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected
                          ? 'bg-red-700 animate-ping'
                          : 'bg-amber-500/40 group-hover:bg-amber-400'
                      }`}
                    />
                  </div>
                  <div className="text-xs font-semibold mt-1 line-clamp-1" title={scenario.title}>
                    {scenario.chokepoint}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Scenario Impact Readout */}
          {activeScenario && (
            <div className="bg-[#09131c] border-l-4 border-l-amber-400 border border-amber-500/30 rounded-r-lg p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center shadow-lg">
              <div className="lg:col-span-7 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-xs bg-amber-400 text-slate-950">
                    {scenarioImpact.severityLabel}
                  </span>
                  <span className="text-xs font-semibold text-stone-100">
                    {activeScenario.title}
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {activeScenario.strategicNote}
                </p>
                <p className="text-xs text-teal-300">
                  <span className="font-semibold">Detour Protocol:</span>{' '}
                  {activeScenario.detourRoute}
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-3 gap-2.5 font-mono">
                <div className="bg-[#050a0f] border border-stone-800 rounded-md p-2.5 text-center">
                  <div className="text-[10px] uppercase text-stone-400">Oil Impact</div>
                  <div className="text-base font-bold text-amber-400 mt-0.5">
                    {activeScenario.globalOilImpactPercent}%
                  </div>
                </div>

                <div className="bg-[#050a0f] border border-stone-800 rounded-md p-2.5 text-center">
                  <div className="text-[10px] uppercase text-stone-400">Transit Shift</div>
                  <div
                    className={`text-sm font-bold mt-1 inline-flex items-center gap-1 ${
                      scenarioImpact.isTimeSaving ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {scenarioImpact.isTimeSaving ? (
                      <>
                        <TrendingDown className="w-3.5 h-3.5" />
                        {Math.abs(activeScenario.globalTradeDelayDays)}d faster
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-3.5 h-3.5" />+
                        {activeScenario.globalTradeDelayDays}d
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-[#050a0f] border border-stone-800 rounded-md p-2.5 text-center">
                  <div className="text-[10px] uppercase text-stone-400">Exposure</div>
                  <div className="text-base font-bold text-cyan-400 mt-0.5">
                    {scenarioImpact.combinedTradeExposurePercent}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Atlas Workspace */}
      <main className="max-w-7xl w-full mx-auto px-4 py-6 space-y-6 flex-1">
        {/* Architectural Cartographic Index Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-800/90 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            {GEO_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-3.5 py-2 text-xs font-medium tracking-wide transition-all duration-150 cursor-pointer rounded-t-md border-t border-x ${
                    isActive
                      ? 'bg-gradient-to-b from-teal-950/90 to-[#09131c] border-teal-500/60 text-teal-200 shadow-[0_-2px_12px_rgba(20,184,166,0.2)] -translate-y-0.5'
                      : 'bg-[#091118] border-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-[#0e1923] hover:border-stone-700'
                  }`}
                >
                  {category}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 via-amber-300 to-teal-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-teal-500/70 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter terrain, river, strait, or nation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#09131c] border border-stone-700/80 focus:border-teal-400 focus:shadow-[0_0_12px_rgba(20,184,166,0.2)] focus:outline-none rounded-md pl-9 pr-3 py-2 text-xs text-stone-100 placeholder-stone-500 transition"
            />
          </div>
        </div>

        {/* Equal-Height Map + Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT COLUMN (7 Cols): Zoomed SVG Map + Full-Height Lower Tactical Deck */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* 1. Zoomed Edge-to-Edge Interactive SVG World Map */}
            <div className="bg-[#081018] border border-stone-800 rounded-lg overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.65)] shrink-0">
              <div className="px-4 py-3 bg-[#0b1520] border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-teal-200">
                  <Crosshair className="w-4 h-4 text-amber-400" />
                  <span>GLOBAL THEATRE MAP ({REGIONS.length} NODES)</span>
                </div>

                {/* Interactive Physical Layer Toggles */}
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                  <button
                    onClick={() => setShowMountains((v) => !v)}
                    className={`px-2 py-1 rounded-xs border cursor-pointer transition ${
                      showMountains
                        ? 'bg-amber-500/20 border-amber-400/60 text-amber-200'
                        : 'bg-[#070d14] border-stone-700 text-stone-500'
                    }`}
                  >
                    ▲ BARRIERS
                  </button>
                  <button
                    onClick={() => setShowRivers((v) => !v)}
                    className={`px-2 py-1 rounded-xs border cursor-pointer transition ${
                      showRivers
                        ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-200'
                        : 'bg-[#070d14] border-stone-700 text-stone-500'
                    }`}
                  >
                    ≈ RIVERS
                  </button>
                  <button
                    onClick={() => setShowSeaLanes((v) => !v)}
                    className={`px-2 py-1 rounded-xs border cursor-pointer transition ${
                      showSeaLanes
                        ? 'bg-teal-500/20 border-teal-400/60 text-teal-200'
                        : 'bg-[#070d14] border-stone-700 text-stone-500'
                    }`}
                  >
                    ⇢ SLOCs
                  </button>
                </div>
              </div>

              <div className="relative bg-[#04080d] p-1.5">
                <svg
                  viewBox="55 15 890 445"
                  className="w-full h-auto select-none"
                  role="img"
                  aria-label="Interactive Geopolitical World Map"
                >
                  {/* Latitude & Longitude Graticule Lines */}
                  <g stroke="#132232" strokeWidth="0.8" strokeDasharray="3 3">
                    <line x1="55" y1="92" x2="945" y2="92" />
                    <line x1="55" y1="184" x2="945" y2="184" />
                    <line x1="55" y1="276" x2="945" y2="276" />
                    <line x1="55" y1="368" x2="945" y2="368" />
                    <line x1="200" y1="15" x2="200" y2="460" />
                    <line x1="400" y1="15" x2="400" y2="460" />
                    <line x1="600" y1="15" x2="600" y2="460" />
                    <line x1="800" y1="15" x2="800" y2="460" />
                  </g>

                  {/* Equator & Arctic Circle Labels */}
                  <text x="68" y="88" fill="#3b526b" fontSize="9" fontFamily="monospace">
                    ARCTIC CIRCLE (66.5°N)
                  </text>
                  <text x="68" y="272" fill="#3b526b" fontSize="9" fontFamily="monospace">
                    EQUATOR (0°)
                  </text>

                  {/* Stylized Continental Landmasses */}
                  <g fill="#111e2d" stroke="#284361" strokeWidth="1.3">
                    {/* Arctic Ice Shelf */}
                    <polygon points="330,30 730,30 710,68 530,78 360,65" fill="#152638" />
                    {/* Greenland */}
                    <polygon points="345,58 415,52 405,112 355,118" />
                    {/* North America */}
                    <polygon points="95,95 295,95 315,155 265,230 220,255 185,235 130,175" />
                    {/* South America */}
                    <polygon points="265,270 345,285 365,345 320,430 285,425 265,335" />
                    {/* Western & Central Europe */}
                    <polygon points="445,105 555,100 560,185 450,192 438,150" />
                    {/* Africa */}
                    <polygon points="450,205 555,205 585,275 540,390 495,385 465,295 435,255" />
                    {/* Russia & Northern Eurasia */}
                    <polygon points="558,88 875,92 895,155 795,180 560,182" />
                    {/* Middle East */}
                    <polygon points="558,195 635,198 632,265 570,265" />
                    {/* Indian Subcontinent */}
                    <polygon points="648,198 708,198 680,285" />
                    {/* China & East Asia */}
                    <polygon points="708,175 830,175 820,255 712,250" />
                    {/* Southeast Asia & Maritime Archipelago */}
                    <polygon points="718,258 770,258 765,310 725,305" />
                    <polygon points="755,318 845,318 840,342 750,338" />
                    {/* Australia */}
                    <polygon points="785,352 885,352 890,415 795,420" />
                  </g>

                  {/* Physical Geography Overlay 1: Major Navigable River Basins */}
                  {showRivers && (
                    <g fill="none" stroke="#38bdf8" strokeWidth="1.8" opacity="0.65">
                      <path d="M 185,140 Q 205,175 215,218" />
                      <path d="M 282,305 L 338,312 M 305,355 L 315,398" />
                      <path d="M 472,135 L 480,165 M 482,162 L 532,168" />
                      <path d="M 526,210 L 528,285" />
                      <path d="M 612,115 L 605,165 M 685,105 L 682,160" />
                      <path d="M 655,205 L 650,242 M 668,215 L 698,232" />
                      <path d="M 730,192 L 795,196 M 725,218 L 802,222" />
                    </g>
                  )}

                  {/* Physical Geography Overlay 2: Major Mountain Barriers */}
                  {showMountains && (
                    <g fill="#f59e0b" opacity="0.55" fontSize="9" fontFamily="monospace">
                      <text x="145" y="165">▲▲▲</text>
                      <text x="272" y="345">▲▲</text>
                      <text x="282" y="385">▲▲</text>
                      <text x="482" y="162">▲▲</text>
                      <text x="588" y="218">▲▲</text>
                      <text x="665" y="206">▲▲▲▲</text>
                      <text x="665" y="176">▲▲▲</text>
                    </g>
                  )}

                  {/* Animated Maritime Sea Lanes */}
                  {showSeaLanes && (
                    <g
                      fill="none"
                      stroke={activeScenario ? '#f59e0b' : '#2dd4bf'}
                      strokeWidth="1.6"
                      strokeDasharray="5 5"
                      opacity="0.68"
                      className="animate-route-flow"
                    >
                      <path d="M 275,185 Q 380,145 455,155" />
                      <path d="M 235,248 Q 160,265 110,235" />
                      <path d="M 485,185 L 545,185 M 485,185 Q 535,225 558,268 Q 585,255 608,235 Q 645,255 682,245 Q 715,275 745,295 Q 785,245 835,185" />
                      <path d="M 445,265 Q 465,375 518,405 Q 585,375 645,285" />
                      <path d="M 495,115 Q 530,62 745,105 Q 845,135 835,185" />
                    </g>
                  )}

                  {/* Interactive Regional Nodes */}
                  {REGIONS.map((region) => {
                    const isFilteredIn = filteredRegions.some((r) => r.id === region.id);
                    const isSelected = selectedRegion?.id === region.id;
                    const isScenarioAffected = activeScenario?.affectedRegions.includes(
                      region.name
                    );
                    const style = RISK_STYLES[region.riskLevel] || RISK_STYLES.Moderate;

                    return (
                      <g
                        key={region.id}
                        transform={`translate(${region.mapCoords.x}, ${region.mapCoords.y})`}
                        onClick={() => setSelectedRegionId(region.id)}
                        className="cursor-pointer transition-opacity"
                        opacity={isFilteredIn ? 1 : 0.22}
                      >
                        {isScenarioAffected && (
                          <circle
                            r="21"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="2"
                            strokeDasharray="3 2"
                          />
                        )}

                        {isSelected && (
                          <>
                            <circle
                              r="15"
                              fill="none"
                              stroke="#2dd4bf"
                              strokeWidth="1.5"
                              className="animate-sonar"
                            />
                            <circle
                              r="13"
                              fill={style.ring}
                              stroke="#fef08a"
                              strokeWidth="1.5"
                            />
                          </>
                        )}

                        <circle
                          r={isSelected ? '6.5' : '5'}
                          fill={style.dot}
                          stroke="#04080d"
                          strokeWidth="1.8"
                        />

                        <g transform="translate(0, -12)">
                          <rect
                            x="-46"
                            y="-11"
                            width="92"
                            height="14"
                            rx="2"
                            fill={isSelected ? '#0f766e' : '#08111a'}
                            stroke={isSelected ? '#fde047' : '#284159'}
                            strokeWidth="0.9"
                            opacity="0.94"
                          />
                          <text
                            textAnchor="middle"
                            y="-1.5"
                            fill={isSelected ? '#fefce8' : '#e2e8f0'}
                            fontSize="7.5"
                            fontWeight="700"
                            fontFamily="monospace"
                          >
                            {region.shortLabel}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Legend & Target Lock Footer */}
              <div className="px-4 py-2.5 bg-[#060c12] border-t border-stone-800 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-stone-400">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Critical
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> High
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" /> Moderate
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Low
                  </span>
                </div>
                <span className="text-teal-300">
                  LOCK: {selectedRegion.coordinatesLabel}
                </span>
              </div>
            </div>

            {/* 2. Parallel-Height Tactical Command Deck (Full Box Utilization) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
              {/* Critical Maritime Bottlenecks Quick-Jump Matrix */}
              <div className="bg-[#081018] border border-stone-800 rounded-lg p-4 shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Anchor className="w-3.5 h-3.5 text-amber-400" />
                    Maritime Chokepoint Matrix
                  </span>
                  <span className="font-mono text-[10px] text-stone-500">CLICK TO LOCK</span>
                </div>

                <div className="flex-1 flex flex-col justify-between divide-y divide-stone-800/70 pt-1">
                  {CHOKEPOINT_MATRIX.map((cp) => {
                    const isCurrent = selectedRegion.id === cp.regionId;
                    return (
                      <button
                        key={cp.name}
                        onClick={() => {
                          setSelectedRegionId(cp.regionId);
                          if (cp.scenarioId !== 'baseline') {
                            setActiveScenarioId(cp.scenarioId);
                          }
                        }}
                        className={`w-full py-2.5 px-2.5 flex items-center justify-between gap-2 text-left transition cursor-pointer rounded-xs ${
                          isCurrent
                            ? 'bg-teal-950/60 text-teal-200 border-l-2 border-l-teal-400'
                            : 'hover:bg-[#0d1924] text-stone-300'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold">{cp.name}</div>
                          <div className="font-mono text-[10px] text-stone-400 mt-0.5">
                            Width: {cp.width} &bull; {cp.flow}
                          </div>
                        </div>
                        <span
                          className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-xs border shrink-0 ${
                            (RISK_STYLES[cp.status] || RISK_STYLES.Moderate).badge
                          }`}
                        >
                          {cp.status}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Satellite / AIS Dispatch Log (Fills 100% of Container Height) */}
              <div className="bg-[#081018] border border-stone-800 rounded-lg p-4 shadow-md flex flex-col min-h-0">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2.5 shrink-0">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-teal-400" />
                    Live AIS Sector Dispatches
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    STREAMING
                  </span>
                </div>

                <div className="tactical-scroll mt-3 space-y-2.5 flex-1 basis-0 min-h-[320px] max-h-[420px] lg:max-h-none overflow-y-auto pr-1.5">
                  {LIVE_DISPATCH_FEED.map((item, idx) => {
                    const isHighlighted = idx === dispatchIdx;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setDispatchIdx(idx)}
                        className={`p-3 rounded-md border text-xs cursor-pointer transition ${
                          isHighlighted
                            ? 'bg-teal-950/45 border-teal-400/60 shadow-[0_0_15px_rgba(20,184,166,0.12)]'
                            : 'bg-[#050a0f] border-stone-800/80 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                          <span className="font-bold text-amber-300">{item.sector}</span>
                          <span className="text-cyan-300">{item.status}</span>
                        </div>
                        <div className="font-mono text-[10px] text-stone-400 mt-1">
                          {item.metric}
                        </div>
                        <p className="text-[11px] text-stone-300 mt-1 leading-relaxed">
                          {item.note}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5 Cols): Quantitative Geopolitical Dossier */}
          <aside className="lg:col-span-5 bg-gradient-to-b from-[#0b1520] to-[#081018] border border-stone-800 rounded-lg p-5 shadow-[0_10px_35px_rgba(0,0,0,0.65)] flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-stone-800 pb-3.5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-teal-300 bg-teal-950/80 border border-teal-500/40 px-2 py-0.5 rounded-xs">
                    {selectedRegion.category}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider font-semibold border px-2 py-0.5 rounded-xs ${
                      (RISK_STYLES[selectedRegion.riskLevel] || RISK_STYLES.Moderate).badge
                    }`}
                  >
                    {selectedRegion.riskLevel} Friction
                  </span>
                  <span className="font-mono text-[10px] text-stone-400">
                    {selectedRegion.coordinatesLabel}
                  </span>
                </div>
                <h2 className="font-serif text-xl font-bold text-stone-50 mt-2">
                  {selectedRegion.name}
                </h2>
              </div>

              <button
                onClick={handleCopyBriefing}
                className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider bg-gradient-to-b from-[#162838] to-[#0c1824] hover:from-teal-900/60 hover:to-teal-950 text-amber-200 border border-amber-400/50 px-3 py-2 rounded-md cursor-pointer shrink-0 shadow-[0_3px_0_0_#04080d] active:translate-y-[2px] active:shadow-none transition-all"
              >
                {copiedBrief ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>Briefing</span>
                  </>
                )}
              </button>
            </div>

            {/* Physical Geography Telemetry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="bg-[#050a0f] border border-stone-800/90 rounded-md p-2.5 space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-amber-300">
                  <Mountain className="w-3.5 h-3.5" />
                  <span>Primary Barrier</span>
                </div>
                <p className="text-stone-200 font-medium leading-snug">
                  {selectedRegion.terrainBarrier}
                </p>
              </div>

              <div className="bg-[#050a0f] border border-stone-800/90 rounded-md p-2.5 space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-cyan-300">
                  <Waves className="w-3.5 h-3.5" />
                  <span>River Watershed</span>
                </div>
                <p className="text-stone-200 font-medium leading-snug">
                  {selectedRegion.primaryRiverSystem}
                </p>
              </div>
            </div>

            {/* Quantitative Risk & Dependency Gauges */}
            <div className="bg-[#050a0f] border border-stone-800/90 rounded-md p-3 space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-stone-400">
                <span className="inline-flex items-center gap-1 text-teal-300">
                  <Gauge className="w-3.5 h-3.5" />
                  Geopolitical Telemetry Indices
                </span>
                <span>Trade Share: {selectedRegion.tradeSharePercent}%</span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between font-mono text-[10px] mb-1">
                    <span className="text-stone-400">TERRAIN FRICTION</span>
                    <span className="text-amber-300">
                      {selectedRegion.telemetry.terrainFriction}/100
                    </span>
                  </div>
                  <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
                      style={{ width: `${selectedRegion.telemetry.terrainFriction}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-[10px] mb-1">
                    <span className="text-stone-400">MARITIME CHOKEPOINT DEPENDENCY</span>
                    <span className="text-cyan-300">
                      {selectedRegion.telemetry.maritimeDependency}/100
                    </span>
                  </div>
                  <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-600 to-cyan-400 transition-all duration-300"
                      style={{ width: `${selectedRegion.telemetry.maritimeDependency}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-[10px] mb-1">
                    <span className="text-stone-400">PERIMETER / BORDER EXPOSURE</span>
                    <span className="text-rose-300">
                      {selectedRegion.telemetry.perimeterExposure}/100
                    </span>
                  </div>
                  <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300"
                      style={{ width: `${selectedRegion.telemetry.perimeterExposure}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-1.5 border-t border-stone-800/80 font-mono text-[10px] text-stone-300">
                <span className="text-teal-400 font-semibold">THROUGHPUT:</span>{' '}
                {selectedRegion.dailyThroughput}
              </div>
            </div>

            {/* Key Chokepoints */}
            <div className="flex flex-wrap gap-1.5">
              {selectedRegion.keyChokepoints.map((cp) => (
                <span
                  key={cp}
                  className="inline-flex items-center gap-1.5 text-xs bg-[#050a0f] border border-teal-900/70 text-stone-200 px-2.5 py-1 rounded-xs"
                >
                  <Anchor className="w-3 h-3 text-amber-400" />
                  {cp}
                </span>
              ))}
            </div>

            {/* Live Intelligence Watchlist Bullets */}
            <div className="bg-teal-950/25 border border-teal-800/50 rounded-md p-3 space-y-1.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-teal-300 font-semibold">
                Real-Time Strategic Watchlist
              </div>
              <ul className="space-y-1 text-xs text-stone-300">
                {selectedRegion.liveWatchItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">&#9656;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 1. The Physical Prison */}
            <div className="bg-[#060c13] border-l-2 border-l-amber-400 border border-stone-800/90 rounded-r-md p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-semibold text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>The Physical Prison (Terrain)</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedRegion.physicalPrison}
              </p>
            </div>

            {/* 2. Strategic Imperative */}
            <div className="bg-[#060c13] border-l-2 border-l-teal-400 border border-stone-800/90 rounded-r-md p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-semibold text-teal-300">
                <Activity className="w-4 h-4 text-teal-400" />
                <span>Strategic Imperative</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedRegion.strategicImperative}
              </p>
            </div>

            {/* 3. Historical Continuity */}
            <div className="bg-[#060c13] border-l-2 border-l-emerald-400 border border-stone-800/90 rounded-r-md p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-semibold text-emerald-300">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Historical Continuity</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedRegion.historicalContinuity}
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom Tactical Reticle Region Cards */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-stone-400">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Global Theatre Index ({filteredRegions.length} of {REGIONS.length})</span>
            </div>
            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="font-mono text-xs text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
              >
                RESET FILTERS
              </button>
            )}
          </div>

          {filteredRegions.length === 0 ? (
            <div className="bg-[#081018] border border-stone-800 rounded-md p-8 text-center text-xs text-stone-400">
              No geopolitical theatres match your query. Click &ldquo;RESET FILTERS&rdquo; to restore all regions.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {filteredRegions.map((region) => {
                const isSelected = selectedRegion?.id === region.id;
                const isImpacted = activeScenario?.affectedRegions.includes(region.name);
                return (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegionId(region.id)}
                    className={`group relative text-left p-3.5 rounded-md border transition-all duration-150 cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-gradient-to-b from-teal-950/70 to-[#08121a] border-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.18)] -translate-y-0.5'
                        : 'bg-[#081018] border-stone-800 hover:border-amber-400/50 hover:-translate-y-0.5 hover:bg-[#0b1621]'
                    }`}
                  >
                    <span
                      className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors ${
                        isSelected
                          ? 'border-amber-300'
                          : 'border-stone-600 group-hover:border-amber-400'
                      }`}
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors ${
                        isSelected
                          ? 'border-amber-300'
                          : 'border-stone-600 group-hover:border-amber-400'
                      }`}
                    />

                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase text-stone-400">
                        {region.coordinatesLabel}
                      </span>
                      {isImpacted ? (
                        <span className="font-mono text-[9px] font-bold uppercase text-slate-950 bg-amber-400 px-1.5 py-0.5 rounded-xs">
                          Impacted
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-teal-400">
                          {region.tradeSharePercent}% Trade
                        </span>
                      )}
                    </div>
                    <div className="font-serif font-bold text-sm text-stone-100 line-clamp-1">
                      {region.name}
                    </div>
                    <div className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                      {region.physicalPrison}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/90 bg-[#070d14] py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-stone-500">
          <span className="flex items-center gap-2 text-stone-400">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            PRISONERS OF GEOGRAPHY // DIPLOMATIC ATLAS
          </span>
          <span>14 STRATEGIC THEATRES &bull; REAL-TIME AIS/SAT TELEMETRY &amp; WAR-GAME ENGINE</span>
        </div>
      </footer>
    </div>
  );
}