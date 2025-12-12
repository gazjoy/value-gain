import { CLICK_AWAY_FACTOR, IMPAIRMENT_STATS, formatCurrency, formatNumber } from './data.js';

const form = document.getElementById('calc-form');
const cardsContainer = document.getElementById('cards');
const totalRevenueEl = document.getElementById('total-revenue');
const totalOrdersEl = document.getElementById('total-orders');
const upliftValueEl = document.getElementById('uplift-value');
const currencySelector = document.getElementById('currency');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const visitors = Number(formData.get('visitors')) || 0;
  const orders = Number(formData.get('orders')) || 0;
  const aov = Number(formData.get('aov')) || 0;
  const networkFactor = Number(formData.get('networkFactor')) || 1;
  const upliftPercent = Number(formData.get('uplift')) || 0;
  const currency = formData.get('currency') || 'GBP';

  const baselineConversion = visitors > 0 ? Math.min(orders / visitors, 1) : 0;
  const results = IMPAIRMENT_STATS.map((item) => {
    const prevalenceShare = item.per10k / 10000;
    const disabledVisitors = visitors * prevalenceShare;
    // Apply network factor to account for friends/family influenced by accessibility barriers.
    const influencedVisitors = disabledVisitors * networkFactor;
    const regainedVisitors = influencedVisitors * CLICK_AWAY_FACTOR * (upliftPercent / 100);
    const potentialOrders = regainedVisitors * baselineConversion;
    const potentialRevenue = potentialOrders * aov;

    return {
      ...item,
      disabledVisitors,
      regainedVisitors,
      potentialOrders,
      potentialRevenue,
      baselineConversion,
      networkFactor,
      currency,
    };
  });

  renderResults(results, currency, upliftPercent, networkFactor);
});

function renderResults(results, currency, upliftPercent, networkFactor) {
  const totalOrders = results.reduce((acc, r) => acc + r.potentialOrders, 0);
  const totalRevenue = results.reduce((acc, r) => acc + r.potentialRevenue, 0);

  totalRevenueEl.textContent = formatCurrency(totalRevenue, currency);
  totalOrdersEl.textContent = `${formatNumber(totalOrders)} potential orders`;
  upliftValueEl.textContent = `${upliftPercent}% of the 69% currently leaving`;

  cardsContainer.innerHTML = '';
  results.forEach((r) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <p class="card__title">${r.label} <span class="pill">${formatNumber(r.per10k)} / 10k</span></p>
      <p class="card__body">Approximate UK prevalence. Revenue assumes regaining ${upliftPercent}% of the 69% who currently click away when accessibility is poor, including influenced friends/family (network ${networkFactor}×).</p>
      <div class="stat-row"><span>Potential revenue</span><strong>${formatCurrency(r.potentialRevenue, currency)}</strong></div>
      <div class="stat-row"><span>Potential orders</span><strong>${formatNumber(r.potentialOrders)}</strong></div>
      <div class="stat-row"><span>Reachable visitors</span><strong>${formatNumber(r.regainedVisitors)}</strong></div>
      <a class="pill" href="${r.source}" target="_blank" rel="noreferrer">Source</a>
    `;
    cardsContainer.appendChild(card);
  });
}

// Initial seed values for quick demo.
form.visitors.value = 100000;
form.orders.value = 2500;
form.aov.value = 75;
form.uplift.value = 75;
form.networkFactor.value = 1.5;
form.currency.value = 'GBP';
upliftValueEl.textContent = `${form.uplift.value}% of the 69% currently leaving`;
form.dispatchEvent(new Event('submit'));

form.uplift.addEventListener('input', (e) => {
  upliftValueEl.textContent = `${e.target.value}% of the 69% currently leaving`;
});

