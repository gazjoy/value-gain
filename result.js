import { formatCurrency, formatNumber } from './data.js';
import { computeResults } from './calc.js';

const params = new URLSearchParams(window.location.search);

const inputs = {
  visitors: params.get('visitors') || 100000,
  orders: params.get('orders') || 2500,
  aov: params.get('aov') || 75,
  networkFactor: params.get('networkFactor') || 1.5,
  upliftPercent: params.get('uplift') || 75,
  currency: params.get('currency') || 'GBP',
};

const headlineRevenueEl = document.getElementById('headline-revenue');
const headlineOrdersEl = document.getElementById('headline-orders');
const headlineParamsEl = document.getElementById('headline-params');
const tableBody = document.querySelector('#breakdown-table tbody');

const thRevenue = document.getElementById('th-revenue');
const thOrders = document.getElementById('th-orders');
const thVisitors = document.getElementById('th-visitors');
const toggleModeBtn = document.getElementById('toggle-mode');

const base = computeResults(inputs);
let mode = 'monthly'; // or 'annual'

function render() {
  const multiplier = mode === 'annual' ? 12 : 1;
  const label = mode === 'annual' ? 'annual' : 'monthly';

  const results = base.results.map((r) => ({
    ...r,
    potentialRevenue: r.potentialRevenue * multiplier,
    potentialOrders: r.potentialOrders * multiplier,
    regainedVisitors: r.regainedVisitors * multiplier,
  }));

  const totals = results.reduce(
    (acc, r) => {
      acc.orders += r.potentialOrders;
      acc.revenue += r.potentialRevenue;
      acc.visitors += r.regainedVisitors;
      return acc;
    },
    { orders: 0, revenue: 0, visitors: 0 },
  );

  headlineRevenueEl.textContent = formatCurrency(totals.revenue, inputs.currency);
  headlineOrdersEl.textContent = `${formatNumber(totals.orders)} potential orders (${label})`;
  headlineParamsEl.textContent = `Uplift: ${inputs.upliftPercent}% of 69% | Network: ${inputs.networkFactor}× | Currency: ${inputs.currency} | View: ${label}`;
  thRevenue.textContent = `Potential revenue (${label})`;
  thOrders.textContent = `Potential orders (${label})`;
  thVisitors.textContent = `Reachable visitors (${label})`;

  tableBody.innerHTML = '';
  results.forEach((r) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${r.label}</td>
      <td>${formatCurrency(r.potentialRevenue, inputs.currency)}</td>
      <td>${formatNumber(r.potentialOrders)}</td>
      <td>${formatNumber(r.regainedVisitors)}</td>
      <td>${formatNumber(r.per10k)}</td>
    `;
    tableBody.appendChild(row);
  });

  toggleModeBtn.textContent = mode === 'annual' ? 'Switch to monthly view' : 'Switch to annual view';
}

toggleModeBtn.addEventListener('click', () => {
  mode = mode === 'annual' ? 'monthly' : 'annual';
  render();
});

render();

