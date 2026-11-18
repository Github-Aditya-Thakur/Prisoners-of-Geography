# Prisoners of Geography — Diplomatic Atlas

An interactive geopolitical cartography console and maritime chokepoint war-game simulator inspired by *Prisoners of Geography*, built with custom SVG mapping and zero external map API dependencies.

## Overview

**Prisoners of Geography — Diplomatic Atlas** models how physical terrain barriers, navigable river basins, and narrow maritime bottlenecks shape national security imperatives and global supply chains. Styled as a tactical naval command console, the platform combines interactive vector cartography, toggleable topographic layers, live AIS/satellite telemetry feeds, and a 6-scenario chokepoint disruption simulator.

## Key Features

- **14 Global Strategic Theatres:** Comprehensive geopolitical dossiers covering *Russia & The North European Plain*, *China & The First Island Chain*, *India & The Subcontinental Shield*, *United States & The Mississippi Basin*, *Middle East & Strait of Hormuz*, *Southeast Asia & Strait of Malacca*, *Western Europe & Navigable Rivers*, *The Arctic & Melting Polar Frontier*, *Red Sea, Suez & Bab el-Mandeb*, *Japan, Korea & The Sea of Japan*, *Turkey & The Anatolian Fortress*, *Sub-Saharan Africa & The Great Rift*, *Latin America, The Andes & Amazon*, and *Central Asia & The Eurasian Heartland*.
- **Custom Interactive SVG Cartography (Zero API Keys):**
  - Latitude/longitude graticules, stylized continental polygons, and 14 clickable theatre nodes with radar sonar lock animations.
  - Toggleable physical geography overlays: **Mountain Barriers (`▲ BARRIERS`)**, **Navigable River Basins (`≈ RIVERS`)**, and animated **Maritime Sea Lanes (`⇢ SLOCs`)**.
- **6-Scenario Chokepoint War-Game Engine:** Simulates crude oil supply shocks, transit delay/time-saving deltas, detour protocols, and combined trade exposure across *Strait of Hormuz*, *Strait of Malacca*, *Bab el-Mandeb & Suez*, *Taiwan Strait*, *Panama Canal*, and the *Northern Sea Route*.
- **Real-Time Telemetry & Chokepoint Matrix:**
  - Live `UTC` command clock and auto-rotating AIS/Satellite maritime dispatch stream with play, pause, and step controls.
  - Quick-lock **Maritime Chokepoint Matrix** displaying channel widths and daily vessel/oil throughput.
  - Quantitative 0–100 telemetry indices (*Terrain Friction*, *Maritime Dependency*, *Perimeter Exposure*) and one-click clipboard briefing export.

## Tech Stack & Architecture

- **Frontend:** React (Hooks-driven state, synchronized `UTC` timers, memoized filtering & impact selectors)
- **Build Tool:** Vite (`@vitejs/plugin-react` + Oxc JSX transform)
- **Styling & UI:** Tailwind CSS v4 (`@tailwindcss/vite`), custom hardware-accelerated CSS3 keyframe animations (`routeFlow`, `sonarPing`), and custom tactical scrollbars
- **Cartography & Brand Assets:** Hand-crafted SVG world map (`viewBox="55 15 890 445"`), Lucide React icons, and custom SVG compass favicon (`public/favicon.svg`)
- **Testing:** Vitest (`src/tests/atlasLogic.test.js`)
- **Hosting & CI/CD:** GitHub + Vercel Edge Network (100% static client-side bundle)

## Project Structure

```text
├── public/
│   └── favicon.svg                # Custom SVG compass browser tab icon
├── src/
│   ├── data/
│   │   └── geopoliticsData.js     # 14 strategic theatres, live AIS dispatches & 6 war-game scenarios
│   ├── utils/
│   │   └── atlasLogic.js          # Multi-field region filtering & scenario impact calculation engine
│   ├── tests/
│   │   └── atlasLogic.test.js     # Vitest unit test suite
│   ├── App.jsx                    # Tactical command console, SVG map & quantitative dossier UI
│   └── main.jsx                   # React root entry point
├── index.html                     # HTML entry linking custom favicon and page metadata
└── package.json                   # Project scripts and dependencies
