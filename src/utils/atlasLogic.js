export function filterRegions(regions, { category = 'All', query = '' } = {}) {
  const cleanQuery = query.trim().toLowerCase();

  return regions.filter((region) => {
    const matchesCategory = category === 'All' || region.category === category;
    if (!matchesCategory) return false;

    if (!cleanQuery) return true;

    const haystack = [
      region.name,
      region.category,
      region.physicalPrison,
      region.strategicImperative,
      ...(region.keyChokepoints || []),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(cleanQuery);
  });
}

export function calculateScenarioImpact(scenario, allRegions) {
  if (!scenario) {
    return {
      affectedCount: 0,
      combinedTradeExposurePercent: 0,
      isTimeSaving: false,
      severityLabel: 'Baseline',
    };
  }

  const matched = allRegions.filter((r) => scenario.affectedRegions.includes(r.name));
  const combinedTradeExposurePercent = matched.reduce(
    (sum, r) => sum + (r.tradeSharePercent || 0),
    0
  );
  const isTimeSaving = scenario.globalTradeDelayDays < 0;

  let severityLabel = 'Moderate Shift';
  if (scenario.globalOilImpactPercent >= 20) severityLabel = 'Severe Global Shock';
  else if (scenario.globalOilImpactPercent >= 12) severityLabel = 'High Supply Disruption';

  return {
    affectedCount: matched.length,
    combinedTradeExposurePercent,
    isTimeSaving,
    severityLabel,
  };
}   