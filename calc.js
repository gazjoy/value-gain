import { CLICK_AWAY_FACTOR, IMPAIRMENT_STATS } from './data.js';

export function computeResults({ visitors, orders, aov, upliftPercent, currency, networkFactor }) {
  const safeVisitors = Number(visitors) || 0;
  const safeOrders = Number(orders) || 0;
  const safeAov = Number(aov) || 0;
  const safeUplift = Number(upliftPercent) || 0;
  const safeNetwork = Math.max(Number(networkFactor) || 1, 1);

  const baselineConversion = safeVisitors > 0 ? Math.min(safeOrders / safeVisitors, 1) : 0;

  const results = IMPAIRMENT_STATS.map((item) => {
    const prevalenceShare = item.per10k / 10000;
    const disabledVisitors = safeVisitors * prevalenceShare;
    const influencedVisitors = disabledVisitors * (safeNetwork - 1);

    // 69% click-away applies to disabled shoppers only (per Click-Away Pound).
    const lostDisabled = disabledVisitors * CLICK_AWAY_FACTOR;
    const regainedDisabled = lostDisabled * (safeUplift / 100);

    // Influenced network is modeled separately; we apply the uplift share directly.
    const regainedNetwork = influencedVisitors * (safeUplift / 100);

    const regainedVisitors = regainedDisabled + regainedNetwork;
    const potentialOrders = regainedVisitors * baselineConversion;
    const potentialRevenue = potentialOrders * safeAov;

    return {
      ...item,
      disabledVisitors,
      lostDisabled,
      regainedDisabled,
      influencedVisitors,
      regainedNetwork,
      regainedVisitors,
      potentialOrders,
      potentialRevenue,
      baselineConversion,
      networkFactor: safeNetwork,
      currency,
      upliftPercent: safeUplift,
    };
  });

  const totals = results.reduce(
    (acc, r) => {
      acc.orders += r.potentialOrders;
      acc.revenue += r.potentialRevenue;
      acc.visitors += r.regainedVisitors;
      return acc;
    },
    { orders: 0, revenue: 0, visitors: 0 },
  );

  return { results, totals, baselineConversion };
}

