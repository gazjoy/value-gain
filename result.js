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

const { results, totals } = computeResults(inputs);

headlineRevenueEl.textContent = formatCurrency(totals.revenue, inputs.currency);
headlineOrdersEl.textContent = `${formatNumber(totals.orders)} potential orders`;
headlineParamsEl.textContent = `Uplift: ${inputs.upliftPercent}% of 69% | Network: ${inputs.networkFactor}× | Currency: ${inputs.currency}`;

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

