/**
 * DOM Helper & Utility functions
 */

export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

export function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

export function formatCurrency(amount) {
  if (!amount) return 'Price on Application';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num) {
  if (!num) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

export function showAlert(message, type = 'info', containerId = 'alert-container') {
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = 'alert-container';
    container.style.position = 'fixed';
    container.style.top = '100px';
    container.style.right = '20px';
    container.style.zIndex = '1000';
    container.style.maxWidth = '400px';
    document.body.appendChild(container);
  }

  const alert = document.createElement('div');
  alert.className = `glass-panel ${type === 'error' ? 'border-red-500' : 'glass-panel-gold'}`;
  alert.style.padding = '1rem 1.5rem';
  alert.style.marginBottom = '0.75rem';
  alert.style.borderRadius = 'var(--radius-sm)';
  alert.style.color = type === 'error' ? '#EF4444' : '#D4AF37';
  alert.style.boxShadow = 'var(--shadow-md)';
  alert.style.transition = 'all 0.3s ease';

  alert.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
      <span style="font-size: 0.875rem; font-weight: 500;">${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" style="color: currentColor; cursor: pointer;">&times;</button>
    </div>
  `;

  container.appendChild(alert);

  setTimeout(() => {
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 300);
  }, 4000);
}
