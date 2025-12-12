const form = document.getElementById('calc-form');
const upliftValueEl = document.getElementById('uplift-value');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const params = new URLSearchParams({
    visitors: formData.get('visitors') || 0,
    orders: formData.get('orders') || 0,
    aov: formData.get('aov') || 0,
    networkFactor: formData.get('networkFactor') || 1,
    uplift: formData.get('uplift') || 0,
    currency: formData.get('currency') || 'GBP',
  });
  window.location.href = `result.html?${params.toString()}`;
});

// Initial seed values for quick demo.
form.visitors.value = 100000;
form.orders.value = 2500;
form.aov.value = 75;
form.uplift.value = 75;
form.networkFactor.value = 1.5;
form.currency.value = 'GBP';
upliftValueEl.textContent = `${form.uplift.value}% of the 69% currently leaving`;

form.uplift.addEventListener('input', (e) => {
  upliftValueEl.textContent = `${e.target.value}% of the 69% currently leaving`;
});

