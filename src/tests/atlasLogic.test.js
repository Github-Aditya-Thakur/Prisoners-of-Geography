import { describe, it, expect } from 'vitest';
import { REGIONS, DISRUPTION_SCENARIOS } from '../data/geopoliticsData';
import { filterRegions, calculateScenarioImpact } from '../utils/atlasLogic';

describe('Prisoners of Geography Atlas Logic', () => {
  it('filters regions accurately by category and search keyword', () => {
    const maritime = filterRegions(REGIONS, { category: 'Maritime Chokepoints' });
    expect(maritime.length).toBe(5);

    const himalayaSearch = filterRegions(REGIONS, { query: 'Himalayan' });
    expect(himalayaSearch.some((r) => r.id === 'india-shield')).toBe(true);

    const andesSearch = filterRegions(REGIONS, { query: 'Andes' });
    expect(andesSearch.some((r) => r.id === 'latin-andes')).toBe(true);
  });

  it('calculates chokepoint disruption exposure and severity accurately', () => {
    const hormuz = DISRUPTION_SCENARIOS.find((s) => s.id === 'hormuz-closure');
    const impact = calculateScenarioImpact(hormuz, REGIONS);

    expect(impact.affectedCount).toBe(4);
    expect(impact.combinedTradeExposurePercent).toBe(62);
    expect(impact.severityLabel).toBe('Severe Global Shock');
    expect(impact.isTimeSaving).toBe(false);
  });

  it('detects transit time savings in Arctic thaw scenario', () => {
    const arctic = DISRUPTION_SCENARIOS.find((s) => s.id === 'arctic-thaw');
    const impact = calculateScenarioImpact(arctic, REGIONS);

    expect(impact.isTimeSaving).toBe(true);
    expect(impact.affectedCount).toBe(4);
  });
});