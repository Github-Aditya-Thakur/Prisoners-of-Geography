export const GEO_CATEGORIES = [
  'All',
  'Land Barriers & Plains',
  'Maritime Chokepoints',
  'River Basins',
  'Polar & Emerging',
];

export const LIVE_DISPATCH_FEED = [
  {
    id: 'disp-1',
    sector: 'STRAIT OF HORMUZ',
    coords: '26.56°N, 56.25°E',
    metric: '20.8M bbl/day | 92 Tankers in Transit',
    status: 'CRITICAL WATCH',
    note: '21 NM channel width; 24% of global LNG trade passing outbound corridor.',
  },
  {
    id: 'disp-2',
    sector: 'STRAIT OF MALACCA',
    coords: '01.43°N, 102.89°E',
    metric: '228 Vessels/day | 1.7 NM Phillips Narrows',
    status: 'HIGH DENSITY',
    note: 'Primary East Asian crude & semiconductor container artery operating at 91% capacity.',
  },
  {
    id: 'disp-3',
    sector: 'BAB EL-MANDEB & SUEZ',
    coords: '12.58°N, 43.33°E',
    metric: '18 NM Gate | +11 Days Cape Diversion',
    status: 'ELEVATED RISK',
    note: 'Red Sea container rerouting around Cape of Good Hope adding 3,500 NM per voyage.',
  },
  {
    id: 'disp-4',
    sector: 'PANAMA GATUN LOCKS',
    coords: '09.08°N, 79.68°W',
    metric: 'Draft Limit: 45.0 ft | 29 Daily Transits',
    status: 'HYDRO MONITOR',
    note: 'Freshwater watershed reservoir levels governing US East Coast–Asia LNG transit slots.',
  },
  {
    id: 'disp-5',
    sector: 'NORTHERN SEA ROUTE',
    coords: '73.40°N, 126.50°E',
    metric: 'Ice Anomaly: -18% | 14-Day Suez Shortcut',
    status: 'ARCTIC THAW',
    note: 'Nuclear icebreaker escort convoys expanding summer-autumn Eurasian transit window.',
  },
  {
    id: 'disp-6',
    sector: 'BOSPORUS & DARDANELLES',
    coords: '41.12°N, 29.08°E',
    metric: '0.4 NM Narrowest | 114 Vessels/day',
    status: 'MONTREUX ACTIVE',
    note: 'Sole warm-water maritime exit linking Black Sea grain & energy ports to the Mediterranean.',
  },
];

export const REGIONS = [
  {
    id: 'russia-plain',
    name: 'Russia & The North European Plain',
    shortLabel: 'RUSSIA / PLAIN',
    category: 'Land Barriers & Plains',
    mapCoords: { x: 655, y: 118 },
    coordinatesLabel: '55.75°N, 37.61°E',
    riskLevel: 'High',
    keyChokepoints: ['GIUK Gap', 'Turkish Straits (Bosporus)', 'Baltic Sea'],
    terrainBarrier: 'Flat North European Funnel & Frozen Arctic Coastline',
    primaryRiverSystem: 'Volga, Dnieper, Don & Ob Basins',
    dailyThroughput: '4.6M bbl/day crude + Black Sea grain exports',
    telemetry: {
      terrainFriction: 78,
      maritimeDependency: 64,
      perimeterExposure: 94,
    },
    liveWatchItems: [
      'Western plain widens from 300 km in Poland to 2,000+ km across the Russian heartland',
      'Arctic ports (Murmansk/Arkhangelsk) constrained by seasonal sea-ice & GIUK naval chokepoint',
    ],
    physicalPrison:
      'A flat, funnel-shaped plain stretching from the Polish corridor to the Ural Mountains with no natural mountain barriers against western land invasions, paired with Arctic ports that freeze for months each year.',
    strategicImperative:
      'Secure depth along the western borderlands and maintain warm-water naval access (Black Sea / Sevastopol and Baltic routes) regardless of the ruling political system.',
    historicalContinuity:
      'From Ivan the Terrible and Catherine the Great to the Soviet buffer states and modern Eurasian security doctrine, geography dictates defensive expansion.',
    tradeSharePercent: 11,
  },
  {
    id: 'china-ring',
    name: 'China & The First Island Chain',
    shortLabel: 'CHINA / 1ST CHAIN',
    category: 'Land Barriers & Plains',
    mapCoords: { x: 760, y: 205 },
    coordinatesLabel: '35.86°N, 104.19°E',
    riskLevel: 'High',
    keyChokepoints: ['Strait of Malacca', 'South China Sea', 'Taiwan Strait'],
    terrainBarrier: 'Himalayas, Gobi Desert & First Island Chain Encirclement',
    primaryRiverSystem: 'Yellow (Huang He) & Yangtze River Heartlands',
    dailyThroughput: '11.2M bbl/day imported crude + 32% global container volume',
    telemetry: {
      terrainFriction: 82,
      maritimeDependency: 89,
      perimeterExposure: 85,
    },
    liveWatchItems: [
      'Over 75% of seaborne energy imports transit the 1.7 NM Malacca bottleneck',
      'Overland CPEC & Central Asian pipelines built to bypass maritime blockade vulnerability',
    ],
    physicalPrison:
      'Boxed in by the Himalayas to the southwest, the Gobi Desert to the north, jungles to the south, and encircled at sea by the First Island Chain (Japan, Taiwan, Philippines).',
    strategicImperative:
      'Protect the Yellow and Yangtze river heartlands, secure overland energy pipelines via Central Asia/Pakistan, and prevent naval blockades at the Strait of Malacca.',
    historicalContinuity:
      'Historically a land power focused on internal unity behind natural walls, now building a blue-water navy and Belt & Road overland corridors to bypass maritime bottlenecks.',
    tradeSharePercent: 18,
  },
  {
    id: 'india-shield',
    name: 'India & The Subcontinental Shield',
    shortLabel: 'INDIA / HIMALAYAS',
    category: 'Land Barriers & Plains',
    mapCoords: { x: 682, y: 245 },
    coordinatesLabel: '20.59°N, 78.96°E',
    riskLevel: 'Moderate',
    keyChokepoints: ['Indian Ocean SLOCs', 'Andaman & Nicobar', 'Siliguri Corridor'],
    terrainBarrier: '8,000m Himalayan Wall, Thar Desert & Peninsular Coast',
    primaryRiverSystem: 'Indus, Ganges & Brahmaputra Indo-Gangetic Plain',
    dailyThroughput: '5.1M bbl/day seaborne crude + Indian Ocean SLOC monitoring',
    telemetry: {
      terrainFriction: 74,
      maritimeDependency: 81,
      perimeterExposure: 68,
    },
    liveWatchItems: [
      'Andaman & Nicobar Command sits directly astride the western mouth of Malacca',
      '22-km wide Siliguri Corridor links mainland heartland to northeastern states',
    ],
    physicalPrison:
      'Protected in the north by the towering Himalayan wall and flanked by the Thar Desert and dense eastern hills, while jutting directly into the center of Indian Ocean shipping lanes.',
    strategicImperative:
      'Maintain strategic autonomy, guard high-altitude Himalayan passes, and leverage peninsular geography to anchor naval security across the Indian Ocean.',
    historicalContinuity:
      'Internal river systems (Indus, Ganges, Brahmaputra) shaped distinct regional centers, while control of the Indian Ocean rim remains vital for energy imports.',
    tradeSharePercent: 9,
  },
  {
    id: 'usa-basin',
    name: 'United States & The Mississippi Basin',
    shortLabel: 'USA / MISSISSIPPI',
    category: 'River Basins',
    mapCoords: { x: 205, y: 190 },
    coordinatesLabel: '38.62°N, 90.19°W',
    riskLevel: 'Low',
    keyChokepoints: ['Panama Canal', 'Gulf of Mexico', 'GIUK Gap'],
    terrainBarrier: 'Two-Ocean Moat, Rocky Mountains & Appalachian Shield',
    primaryRiverSystem: 'Mississippi–Missouri–Ohio Interconnected Network',
    dailyThroughput: '19.5M tons/month grain & industrial barge freight',
    telemetry: {
      terrainFriction: 22,
      maritimeDependency: 46,
      perimeterExposure: 19,
    },
    liveWatchItems: [
      'More miles of interconnected navigable inland waterways than the rest of the world combined',
      'Dual Pacific and Atlantic deep-water coastlines eliminate single-chokepoint entrapment',
    ],
    physicalPrison:
      'Flanked by two vast oceans, friendly neighbors north and south, and endowed with the world’s largest interconnected navigable river network (Mississippi-Missouri) draining into a single port hub.',
    strategicImperative:
      'Prevent any single hegemon from dominating Eurasia while keeping global sea lanes open through forward naval deployments.',
    historicalContinuity:
      'The 1803 Louisiana Purchase united the entire Mississippi watershed, creating unmatched agricultural and industrial transport efficiency.',
    tradeSharePercent: 16,
  },
  {
    id: 'hormuz-gulf',
    name: 'Middle East & Strait of Hormuz',
    shortLabel: 'HORMUZ / GULF',
    category: 'Maritime Chokepoints',
    mapCoords: { x: 608, y: 235 },
    coordinatesLabel: '26.56°N, 56.25°E',
    riskLevel: 'Critical',
    keyChokepoints: ['Strait of Hormuz (21 NM wide)', 'Bab el-Mandeb', 'Suez Canal'],
    terrainBarrier: 'Zagros Mountains, Arabian Desert & 21-NM Maritime Funnel',
    primaryRiverSystem: 'Tigris–Euphrates & Nile Freshwater Basins',
    dailyThroughput: '20.8M bbl/day petroleum + 24% global LNG supply',
    telemetry: {
      terrainFriction: 88,
      maritimeDependency: 96,
      perimeterExposure: 92,
    },
    liveWatchItems: [
      '2-mile-wide inbound/outbound tanker shipping lanes separated by a 2-mile buffer',
      'Sykes-Picot straight-line desert borders intersect mountain & river watershed divides',
    ],
    physicalPrison:
      'Arbitrary post-colonial borders drawn across deserts and mountain ranges split ethnic and sectarian groups, while 20% of global petroleum must squeeze through a 21-nautical-mile channel.',
    strategicImperative:
      'Control transit chokepoints connecting Persian Gulf energy producers to global buyers and secure scarce freshwater river basins (Tigris, Euphrates, Nile).',
    historicalContinuity:
      'Sykes-Picot boundary lines ignored physical terrain, locking modern states into recurring struggles over waterways, pipelines, and highland buffers.',
    tradeSharePercent: 21,
  },
  {
    id: 'malacca-sea',
    name: 'Southeast Asia & Strait of Malacca',
    shortLabel: 'MALACCA STRAIT',
    category: 'Maritime Chokepoints',
    mapCoords: { x: 745, y: 295 },
    coordinatesLabel: '01.43°N, 102.89°E',
    riskLevel: 'High',
    keyChokepoints: ['Strait of Malacca (1.7 NM narrowest)', 'Sunda Strait', 'Lombok Strait'],
    terrainBarrier: 'Sumatra–Malay Peninsula Funnel & Archipelagic Straits',
    primaryRiverSystem: 'Mekong, Irrawaddy & Chao Phraya Deltas',
    dailyThroughput: '83,000+ vessels/year | 16M bbl/day oil transit',
    telemetry: {
      terrainFriction: 65,
      maritimeDependency: 95,
      perimeterExposure: 79,
    },
    liveWatchItems: [
      'Phillips Channel near Singapore narrows to 1.7 nautical miles (2.8 km)',
      'Deep-draft ULCC supertankers exceeding 22m draft must divert via Lombok Strait',
    ],
    physicalPrison:
      'A narrow 800-km maritime funnel between Sumatra and the Malay Peninsula that narrows to just 1.7 nautical miles at the Phillips Channel.',
    strategicImperative:
      'Keep East Asia’s primary energy and container lifeline open; over 80,000 vessels transit annually connecting the Indian and Pacific Oceans.',
    historicalContinuity:
      'From the Srivijaya Empire and Portuguese/British outposts in Singapore to modern naval patrols, whoever monitors Malacca holds leverage over East Asian trade.',
    tradeSharePercent: 25,
  },
  {
    id: 'europe-rivers',
    name: 'Western Europe & Navigable Rivers',
    shortLabel: 'W. EUROPE',
    category: 'River Basins',
    mapCoords: { x: 478, y: 152 },
    coordinatesLabel: '48.85°N, 08.40°E',
    riskLevel: 'Low',
    keyChokepoints: ['English Channel', 'Strait of Gibraltar', 'Danish Straits'],
    terrainBarrier: 'Alps, Pyrenees & Fragmented Peninsular Coastlines',
    primaryRiverSystem: 'Rhine, Danube, Seine, Elbe & Loire (Non-Intersecting)',
    dailyThroughput: '310M tons/year Rhine–Danube inland waterway cargo',
    telemetry: {
      terrainFriction: 41,
      maritimeDependency: 72,
      perimeterExposure: 48,
    },
    liveWatchItems: [
      'Separate river basins fostered distinct nation-states rather than one continental empire',
      'North Sea & Mediterranean deep-water ports drive high export-led industrial density',
    ],
    physicalPrison:
      'Peninsulas, mountain ranges (Alps, Pyrenees), and separate non-connecting rivers (Rhine, Danube, Seine, Loire) fostered multiple competing nation-states rather than a single empire.',
    strategicImperative:
      'Use economic union and shared infrastructure to overcome historical fragmentation between northern industrial plains and southern Mediterranean economies.',
    historicalContinuity:
      'Unlike the unified Mississippi system, Europe’s distinct river basins produced rival powers until post-1945 integration bridged the divide.',
    tradeSharePercent: 14,
  },
  {
    id: 'arctic-frontier',
    name: 'The Arctic & Melting Polar Frontier',
    shortLabel: 'ARCTIC / NSR',
    category: 'Polar & Emerging',
    mapCoords: { x: 525, y: 58 },
    coordinatesLabel: '78.22°N, 15.62°E',
    riskLevel: 'Moderate',
    keyChokepoints: ['Bering Strait', 'Northern Sea Route', 'Northwest Passage'],
    terrainBarrier: 'Multi-Year Sea Ice Pack, Permafrost & Polar Darkness',
    primaryRiverSystem: 'Lena, Yenisei & Mackenzie Arctic Outflows',
    dailyThroughput: '36M tons/year Northern Sea Route freight (rising rapidly)',
    telemetry: {
      terrainFriction: 91,
      maritimeDependency: 58,
      perimeterExposure: 63,
    },
    liveWatchItems: [
      'Lomonosov Ridge continental shelf claims contested under UNCLOS maritime law',
      'Cuts Yokohama–Rotterdam transit from 33 days (Suez) to 19 days via Siberian coast',
    ],
    physicalPrison:
      'Historically an impassable frozen barrier separating North America, Europe, and Russia, now thinning rapidly due to polar warming.',
    strategicImperative:
      'Claim continental shelf mineral rights and control emerging shipping lanes that cut Asia-Europe transit times by up to 40%.',
    historicalContinuity:
      'Once only relevant for Cold War submarine patrols and missile trajectories, the Arctic is becoming the 21st century’s newest contested maritime highway.',
    tradeSharePercent: 4,
  },
  {
    id: 'red-sea-bab',
    name: 'Red Sea, Suez & Bab el-Mandeb',
    shortLabel: 'RED SEA / SUEZ',
    category: 'Maritime Chokepoints',
    mapCoords: { x: 558, y: 268 },
    coordinatesLabel: '12.58°N, 43.33°E',
    riskLevel: 'Critical',
    keyChokepoints: ['Bab el-Mandeb (18 NM)', 'Suez Canal', 'Gulf of Aden'],
    terrainBarrier: 'Horn of Africa–Yemen Narrows & Sinai Desert Isthmus',
    primaryRiverSystem: 'Nile River Basin & Blue Nile Highland Headwaters',
    dailyThroughput: '12% of global seaborne trade & 8.8M bbl/day oil/products',
    telemetry: {
      terrainFriction: 79,
      maritimeDependency: 94,
      perimeterExposure: 89,
    },
    liveWatchItems: [
      'Perim Island divides Bab el-Mandeb into a 2-mile West channel and 16-mile East channel',
      'Disruptions force Europe–Asia vessels onto a 3,500 NM detour around Cape of Good Hope',
    ],
    physicalPrison:
      'A narrow tectonic rift sea bounded by arid coastlines and pinched to 18 miles at Bab el-Mandeb in the south and the man-made Suez Canal in the north.',
    strategicImperative:
      'Keep the fastest Europe-to-Asia maritime corridor open and manage upstream/downstream Nile water-sharing treaties across Ethiopia, Sudan, and Egypt.',
    historicalContinuity:
      'Since the Suez Canal opened in 1869, every major naval power has treated the Red Sea corridor as a vital imperial and commercial artery.',
    tradeSharePercent: 12,
  },
  {
    id: 'korea-japan',
    name: 'Japan, Korea & The Sea of Japan',
    shortLabel: 'JAPAN / KOREA',
    category: 'Maritime Chokepoints',
    mapCoords: { x: 835, y: 185 },
    coordinatesLabel: '37.56°N, 126.97°E',
    riskLevel: 'High',
    keyChokepoints: ['Korea / Tsushima Strait', 'Tsugaru Strait', '38th Parallel DMZ'],
    terrainBarrier: 'Mountainous Archipelago (73% Forest/Mountain) & Peninsula DMZ',
    primaryRiverSystem: 'Han, Nakdong & Shinano Short Fast-Flowing Rivers',
    dailyThroughput: '90%+ imported fossil fuel dependency across East Asian hubs',
    telemetry: {
      terrainFriction: 76,
      maritimeDependency: 97,
      perimeterExposure: 84,
    },
    liveWatchItems: [
      'Seoul sits just 56 km south of the 38th-parallel Demilitarized Zone artillery belt',
      'Japan relies on uninterrupted Pacific & Malacca sea lanes for raw materials and energy',
    ],
    physicalPrison:
      'Japan is a resource-scarce mountainous island chain dependent on maritime imports, while Korea is a narrow peninsula historically caught between continental China/Russia and maritime Japan.',
    strategicImperative:
      'Protect sea lines of communication against blockades and maintain deterrence along the heavily fortified Korean peninsula.',
    historicalContinuity:
      'Centuries of tributary pressure, naval invasions, and Cold War division reflect the peninsula’s role as a strategic land bridge.',
    tradeSharePercent: 10,
  },
  {
    id: 'anatolia-straits',
    name: 'Turkey & The Anatolian Fortress',
    shortLabel: 'TURKEY / STRAITS',
    category: 'Maritime Chokepoints',
    mapCoords: { x: 545, y: 185 },
    coordinatesLabel: '41.12°N, 29.08°E',
    riskLevel: 'High',
    keyChokepoints: ['Bosporus Strait', 'Dardanelles', 'Eastern Mediterranean'],
    terrainBarrier: 'Anatolian High Plateau, Taurus Mountains & 700m-Wide Bosporus',
    primaryRiverSystem: 'Tigris & Euphrates Headwaters (Southeastern Anatolia)',
    dailyThroughput: '3.0M bbl/day Caspian/Black Sea oil + global wheat shipments',
    telemetry: {
      terrainFriction: 71,
      maritimeDependency: 83,
      perimeterExposure: 81,
    },
    liveWatchItems: [
      '1936 Montreux Convention grants Ankara legal control over warship transit into Black Sea',
      'Controls headwaters of both the Tigris and Euphrates rivers flowing into Syria and Iraq',
    ],
    physicalPrison:
      'A rugged mountain-rimmed plateau bridging Europe and Asia while holding the sole maritime key locking the Black Sea fleet inside the Turkish Straits.',
    strategicImperative:
      'Balance NATO maritime commitments with Black Sea regional stability while leveraging upstream water and transit geography.',
    historicalContinuity:
      'From Byzantium and the Ottoman Empire to modern Turkey, whoever holds Istanbul and the Bosporus commands the crossroads of Eurasia.',
    tradeSharePercent: 6,
  },
  {
    id: 'africa-rift',
    name: 'Sub-Saharan Africa & The Great Rift',
    shortLabel: 'AFRICA / RIFT',
    category: 'River Basins',
    mapCoords: { x: 515, y: 315 },
    coordinatesLabel: '01.29°S, 36.82°E',
    riskLevel: 'Moderate',
    keyChokepoints: ['Cape of Good Hope', 'Mozambique Channel', 'Gulf of Guinea'],
    terrainBarrier: 'Sahara Desert, Great Rift Escarpment & Coastal Cataract Waterfalls',
    primaryRiverSystem: 'Congo, Niger, Zambezi & Nile (Interrupted by Cataracts)',
    dailyThroughput: '45%+ global cobalt, platinum & critical battery mineral supply',
    telemetry: {
      terrainFriction: 89,
      maritimeDependency: 67,
      perimeterExposure: 73,
    },
    liveWatchItems: [
      'Livingstone Falls blocks ocean vessels from ascending the Congo River just 150 km inland',
      'Cape of Good Hope serves as the primary emergency bypass when Suez/Red Sea is disrupted',
    ],
    physicalPrison:
      'Isolated from Eurasia by the Sahara Desert, lacking natural deep-water harbors, and crisscrossed by rivers that plunge over coastal escarpment waterfalls—preventing cheap inland water trade.',
    strategicImperative:
      'Build cross-border rail and port corridors to overcome river navigation barriers and connect mineral-rich interiors to global markets.',
    historicalContinuity:
      'Colonial borders ignored tribal and topographic realities, leaving modern states with vast distances and high infrastructure costs.',
    tradeSharePercent: 5,
  },
  {
    id: 'latin-andes',
    name: 'Latin America, The Andes & Amazon',
    shortLabel: 'LATAM / ANDES',
    category: 'Land Barriers & Plains',
    mapCoords: { x: 305, y: 335 },
    coordinatesLabel: '14.23°S, 51.92°W',
    riskLevel: 'Low',
    keyChokepoints: ['Panama Canal', 'Strait of Magellan', 'Drake Passage'],
    terrainBarrier: '7,000-km Andes Mountain Spine & Dense Amazon Rainforest',
    primaryRiverSystem: 'Amazon & Paraná–Río de la Plata Basins',
    dailyThroughput: '38% global soybean, copper & lithium export corridors',
    telemetry: {
      terrainFriction: 85,
      maritimeDependency: 61,
      perimeterExposure: 34,
    },
    liveWatchItems: [
      'Andes peaks average 4,000m, severing Pacific coast economies from the Atlantic interior',
      'Southern Cone Río de la Plata basin provides South America’s prime agricultural river artery',
    ],
    physicalPrison:
      'The towering Andes wall hugs the Pacific coast while the impenetrable Amazon jungle fills the interior, pushing populations to isolated coastal pockets with minimal east-west rail/road links.',
    strategicImperative:
      'Overcome interior geographic fragmentation through bi-oceanic corridors and protect Panama Canal watershed capacity.',
    historicalContinuity:
      'Unlike North America’s unified plains, South America’s physical barriers prevented continental political unification after independence.',
    tradeSharePercent: 7,
  },
  {
    id: 'central-asia',
    name: 'Central Asia & The Eurasian Heartland',
    shortLabel: 'CENTRAL ASIA',
    category: 'Land Barriers & Plains',
    mapCoords: { x: 645, y: 168 },
    coordinatesLabel: '41.29°N, 69.24°E',
    riskLevel: 'Moderate',
    keyChokepoints: ['Trans-Caspian Middle Corridor', 'Fergana Valley', 'Wakhan Corridor'],
    terrainBarrier: 'Double-Landlocked Steppe, Pamir/Tian Shan Peaks & Arid Basins',
    primaryRiverSystem: 'Amu Darya & Syr Darya (Endorheic Aral Basin)',
    dailyThroughput: 'Trans-Eurasian rail freight & Caspian–China gas pipelines',
    telemetry: {
      terrainFriction: 83,
      maritimeDependency: 35,
      perimeterExposure: 77,
    },
    liveWatchItems: [
      'Uzbekistan is one of only two doubly landlocked nations on Earth',
      'Middle Corridor rail volume across the Caspian Sea surged as an alternative northern route',
    ],
    physicalPrison:
      'Completely landlocked in the center of Eurasia, ringed by high mountain ranges and deserts, with convoluted Soviet-era borders slicing through the fertile Fergana Valley.',
    strategicImperative:
      'Maintain multi-vector diplomacy between Russia, China, and Europe while expanding east-west overland rail and energy pipelines.',
    historicalContinuity:
      'Once the heart of the Silk Road and Mackinder’s Heartland theory, the region remains a pivotal overland transit hub.',
    tradeSharePercent: 3,
  },
];

export const DISRUPTION_SCENARIOS = [
  {
    id: 'hormuz-closure',
    title: 'Strait of Hormuz Naval Blockade',
    chokepoint: 'Strait of Hormuz',
    globalOilImpactPercent: 21,
    globalTradeDelayDays: 14,
    affectedRegions: [
      'Middle East & Strait of Hormuz',
      'China & The First Island Chain',
      'India & The Subcontinental Shield',
      'Western Europe & Navigable Rivers',
    ],
    detourRoute: 'Overland East-West Saudi pipelines + Cape of Good Hope tanker rerouting',
    strategicNote:
      'Immediate spike in crude oil prices; Asian importers face acute LNG and crude bottlenecks within 15 days.',
  },
  {
    id: 'malacca-closure',
    title: 'Strait of Malacca Chokepoint Disruption',
    chokepoint: 'Strait of Malacca',
    globalOilImpactPercent: 16,
    globalTradeDelayDays: 9,
    affectedRegions: [
      'Southeast Asia & Strait of Malacca',
      'China & The First Island Chain',
      'India & The Subcontinental Shield',
      'Japan, Korea & The Sea of Japan',
    ],
    detourRoute: 'Rerouting through Sunda and Lombok Straits (adds 1,000+ nautical miles)',
    strategicNote:
      'Over 80% of East Asian crude imports must divert south through deeper Indonesian straits, straining global container capacity.',
  },
  {
    id: 'bab-el-mandeb',
    title: 'Red Sea & Bab el-Mandeb Corridor Crisis',
    chokepoint: 'Bab el-Mandeb & Suez Canal',
    globalOilImpactPercent: 12,
    globalTradeDelayDays: 11,
    affectedRegions: [
      'Red Sea, Suez & Bab el-Mandeb',
      'Western Europe & Navigable Rivers',
      'Sub-Saharan Africa & The Great Rift',
      'India & The Subcontinental Shield',
    ],
    detourRoute: 'Full container & tanker diversion around South Africa’s Cape of Good Hope',
    strategicNote:
      'Adds 3,500 nautical miles and 11+ days to Asia–Europe supply chains, spiking freight rates and port congestion.',
  },
  {
    id: 'taiwan-quarantine',
    title: 'First Island Chain & Taiwan Quarantine',
    chokepoint: 'Taiwan Strait & Luzon Gap',
    globalOilImpactPercent: 14,
    globalTradeDelayDays: 16,
    affectedRegions: [
      'China & The First Island Chain',
      'Japan, Korea & The Sea of Japan',
      'Southeast Asia & Strait of Malacca',
      'United States & The Mississippi Basin',
    ],
    detourRoute: 'East of Luzon & Philippine Sea deep-water maritime detours',
    strategicNote:
      'Halts 48% of the global container fleet transiting the Taiwan Strait and disrupts advanced semiconductor logistics.',
  },
  {
    id: 'panama-drought',
    title: 'Panama Canal Low-Water Draft Restriction',
    chokepoint: 'Panama Canal & Gatun Watershed',
    globalOilImpactPercent: 7,
    globalTradeDelayDays: 8,
    affectedRegions: [
      'United States & The Mississippi Basin',
      'Latin America, The Andes & Amazon',
      'Japan, Korea & The Sea of Japan',
      'China & The First Island Chain',
    ],
    detourRoute: 'US West Coast rail land-bridge or Strait of Magellan / Cape Horn transit',
    strategicNote:
      'Freshwater lake depletion restricts Neo-Panamax LNG & grain carriers linking US Gulf ports with East Asia.',
  },
  {
    id: 'arctic-thaw',
    title: 'Year-Round Northern Sea Route Opening',
    chokepoint: 'Bering Strait & Northern Sea Route',
    globalOilImpactPercent: 5,
    globalTradeDelayDays: -12,
    affectedRegions: [
      'The Arctic & Melting Polar Frontier',
      'Russia & The North European Plain',
      'Western Europe & Navigable Rivers',
      'China & The First Island Chain',
    ],
    detourRoute: 'Shanghai to Rotterdam via Arctic coast (cuts 4,000 nautical miles vs. Suez)',
    strategicNote:
      'Reduces Suez Canal reliance by ~12 days per voyage while intensifying territorial disputes over Arctic icebreaker ports.',
  },
];