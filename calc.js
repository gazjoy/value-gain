import { CLICK_AWAY_FACTOR, IMPAIRMENT_STATS } from './data.js';

export function computeResults({ visitors, orders, aov, upliftPercent, currency, networkFactor }) {
  const safeVisitors = Number(visitors) || 0;
  const safeOrders = Number(orders) || 0;
  const safeAov = Number(aov) || 0;
  const safeUplift = Number(upliftPercent) || 0;
  const safeNetwork = Number(networkFactor) || 1;

  const baselineConversion = safeVisitors > 0 ? Math.min(safeOrders / safeVisitors, 1) : 0;

  const results = IMPAIRMENT_STATS.map((item) => {
    const prevalenceShare = item.per10k / 10000;
    const disabledVisitors = safeVisitors * prevalenceShare;
    const influencedVisitors = disabledVisitors * safeNetwork;
    const regainedVisitors = influencedVisitors * CLICK_AWAY_FACTOR * (safeUplift / 100);
    const potentialOrders = regainedVisitors * baselineConversion;
    const potentialRevenue = potentialOrders * safeAov;

    return {
      ...item,
      disabledVisitors,
      influencedVisitors,
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

