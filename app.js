// Currency Database Catalog
const CURRENCIES = [
  { code: "USD", name: "United States Dollar", flag: "us", symbol: "$" },
  { code: "EUR", name: "Euro", flag: "eu", symbol: "€" },
  { code: "GBP", name: "British Pound Sterling", flag: "gb", symbol: "£" },
  { code: "INR", name: "Indian Rupee", flag: "in", symbol: "₹" },
  { code: "JPY", name: "Japanese Yen", flag: "jp", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", flag: "ca", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", flag: "au", symbol: "$" },
  { code: "CHF", name: "Swiss Franc", flag: "ch", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", flag: "cn", symbol: "¥" },
  { code: "NZD", name: "New Zealand Dollar", flag: "nz", symbol: "$" },
  { code: "SGD", name: "Singapore Dollar", flag: "sg", symbol: "$" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "hk", symbol: "$" },
  { code: "SEK", name: "Swedish Krona", flag: "se", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", flag: "no", symbol: "kr" },
  { code: "MXN", name: "Mexican Peso", flag: "mx", symbol: "$" },
  { code: "ZAR", name: "South African Rand", flag: "za", symbol: "R" },
  { code: "BRL", name: "Brazilian Real", flag: "br", symbol: "R$" },
  { code: "KRW", name: "South Korean Won", flag: "kr", symbol: "₩" },
  { code: "AED", name: "UAE Dirham", flag: "ae", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", flag: "sa", symbol: "ر.س" },
  { code: "TRY", name: "Turkish Lira", flag: "tr", symbol: "₺" },
  { code: "THB", name: "Thai Baht", flag: "th", symbol: "฿" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "my", symbol: "RM" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "id", symbol: "Rp" },
  { code: "PHP", name: "Philippine Peso", flag: "ph", symbol: "₱" },
  { code: "PLN", name: "Polish Zloty", flag: "pl", symbol: "zł" },
  { code: "DKK", name: "Danish Krone", flag: "dk", symbol: "kr" },
  { code: "HUF", name: "Hungarian Forint", flag: "hu", symbol: "Ft" },
  { code: "CZK", name: "Czech Koruna", flag: "cz", symbol: "Kč" },
  { code: "ILS", name: "Israeli New Shekel", flag: "il", symbol: "₪" },
  { code: "CLP", name: "Chilean Peso", flag: "cl", symbol: "$" },
  { code: "ARS", name: "Argentine Peso", flag: "ar", symbol: "$" },
  { code: "COP", name: "Colombian Peso", flag: "co", symbol: "$" },
  { code: "PEN", name: "Peruvian Sol", flag: "pe", symbol: "S/." },
  { code: "EGP", name: "Egyptian Pound", flag: "eg", symbol: "E£" },
  { code: "VND", name: "Vietnamese Dong", flag: "vn", symbol: "₫" },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "kw", symbol: "د.ك" },
  { code: "QAR", name: "Qatari Riyal", flag: "qa", symbol: "ر.ق" },
  { code: "OMR", name: "Omani Rial", flag: "om", symbol: "ر.ع." },
  { code: "BHD", name: "Bahraini Dinar", flag: "bh", symbol: "ب.د" },
  { code: "KZT", name: "Kazakhstani Tenge", flag: "kz", symbol: "₸" },
  { code: "UAH", name: "Ukrainian Hryvnia", flag: "ua", symbol: "₴" },
  { code: "PKR", name: "Pakistani Rupee", flag: "pk", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka", flag: "bd", symbol: "৳" },
  { code: "LKR", name: "Sri Lankan Rupee", flag: "lk", symbol: "₨" },
  { code: "NPR", name: "Nepalese Rupee", flag: "np", symbol: "₨" },
  { code: "DZD", name: "Algerian Dinar", flag: "dz", symbol: "د.ج" },
  { code: "MAD", name: "Moroccan Dirham", flag: "ma", symbol: "د.م." }
];

// Major currencies list for the Quick Rates panel
const POPULAR_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "INR", "CNY"];

// App State
const state = {
  fromCurrency: "USD",
  toCurrency: "EUR",
  amount: 1000,
  rates: {},
  chartInstance: null,
  theme: "dark"
};

// Elements Selectors
const elements = {
  themeToggle: document.getElementById("theme-toggle"),
  amountInput: document.getElementById("amount"),
  amountSymbol: document.getElementById("amount-symbol"),
  
  fromSelect: document.getElementById("from-currency-select"),
  fromTrigger: document.getElementById("from-select-trigger"),
  fromFlag: document.getElementById("from-flag"),
  fromCode: document.getElementById("from-code"),
  fromName: document.getElementById("from-name"),
  fromOptionsContainer: document.getElementById("from-options-container"),
  fromSearch: document.getElementById("from-search"),
  fromClearSearch: document.getElementById("from-clear-search"),
  fromOptionsList: document.getElementById("from-options-list"),
  
  toSelect: document.getElementById("to-currency-select"),
  toTrigger: document.getElementById("to-select-trigger"),
  toFlag: document.getElementById("to-flag"),
  toCode: document.getElementById("to-code"),
  toName: document.getElementById("to-name"),
  toOptionsContainer: document.getElementById("to-options-container"),
  toSearch: document.getElementById("to-search"),
  toClearSearch: document.getElementById("to-clear-search"),
  toOptionsList: document.getElementById("to-options-list"),
  
  swapBtn: document.getElementById("swap-currencies-btn"),
  
  resultCard: document.getElementById("conversion-result-card"),
  resultFormula: document.getElementById("conversion-formula"),
  convertedAmount: document.getElementById("converted-amount"),
  convertedSymbol: document.getElementById("converted-symbol"),
  exchangeRateVal: document.getElementById("exchange-rate-val"),
  lastUpdatedVal: document.getElementById("last-updated-val"),
  
  chartPairLabel: document.getElementById("chart-pair-label"),
  chartLoader: document.getElementById("chart-loader"),
  baseReferenceLabel: document.getElementById("base-reference-label"),
  popularRatesContainer: document.getElementById("popular-rates-container")
};

// ----------------------------------------------------
// Core Initialization & Setup
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  populateDropdownLists();
  setupEventListeners();
  performConversion();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem("aero_theme") || "dark";
  state.theme = savedTheme;
  document.documentElement.setAttribute("data-theme", savedTheme);
  elements.themeToggle.checked = savedTheme === "light";
}

function toggleTheme() {
  const newTheme = elements.themeToggle.checked ? "light" : "dark";
  state.theme = newTheme;
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("aero_theme", newTheme);
  
  // Re-render chart if it exists to apply new theme colors
  if (state.rates[state.fromCurrency]) {
    renderTrendChart();
  }
}

// ----------------------------------------------------
// Dropdowns Populate and Control
// ----------------------------------------------------

function populateDropdownLists() {
  renderOptions(elements.fromOptionsList, "from");
  renderOptions(elements.toOptionsList, "to");
}

function renderOptions(optionsListEl, type, searchQuery = "") {
  optionsListEl.innerHTML = "";
  
  const query = searchQuery.trim().toLowerCase();
  const filteredCurrencies = CURRENCIES.filter(curr => {
    return curr.code.toLowerCase().includes(query) || 
           curr.name.toLowerCase().includes(query);
  });
  
  if (filteredCurrencies.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "no-results-msg";
    emptyLi.textContent = "No currencies match your search";
    optionsListEl.appendChild(emptyLi);
    return;
  }
  
  filteredCurrencies.forEach(curr => {
    const li = document.createElement("li");
    li.className = "select-option-item";
    
    const isSelected = type === "from" ? curr.code === state.fromCurrency : curr.code === state.toCurrency;
    if (isSelected) {
      li.classList.add("selected");
    }
    
    li.innerHTML = `
      <img src="https://flagcdn.com/w40/${curr.flag}.png" alt="${curr.name} flag" class="currency-flag" loading="lazy">
      <span class="currency-code">${curr.code}</span>
      <span class="currency-name">${curr.name}</span>
    `;
    
    li.addEventListener("click", (e) => {
      e.stopPropagation();
      selectCurrency(curr.code, type);
    });
    
    optionsListEl.appendChild(li);
  });
}

function selectCurrency(code, type) {
  const currencyObj = CURRENCIES.find(c => c.code === code);
  if (!currencyObj) return;

  if (type === "from") {
    state.fromCurrency = code;
    elements.fromFlag.src = `https://flagcdn.com/w40/${currencyObj.flag}.png`;
    elements.fromFlag.alt = `${currencyObj.name} flag`;
    elements.fromCode.textContent = code;
    elements.fromName.textContent = currencyObj.name;
    elements.amountSymbol.textContent = currencyObj.symbol;
    elements.fromSelect.classList.remove("active");
    elements.fromSearch.value = "";
    elements.fromClearSearch.style.display = "none";
    renderOptions(elements.fromOptionsList, "from");
  } else {
    state.toCurrency = code;
    elements.toFlag.src = `https://flagcdn.com/w40/${currencyObj.flag}.png`;
    elements.toFlag.alt = `${currencyObj.name} flag`;
    elements.toCode.textContent = code;
    elements.toName.textContent = currencyObj.name;
    elements.toSelect.classList.remove("active");
    elements.toSearch.value = "";
    elements.toClearSearch.style.display = "none";
    renderOptions(elements.toOptionsList, "to");
  }
  
  performConversion();
}

function setupEventListeners() {
  // Theme Switching
  elements.themeToggle.addEventListener("change", toggleTheme);

  // Amount Changes (Input event for real-time conversion)
  elements.amountInput.addEventListener("input", () => {
    let value = parseFloat(elements.amountInput.value);
    if (isNaN(value) || value < 0) {
      state.amount = 0;
    } else {
      state.amount = value;
    }
    updateConversionUI();
  });
  
  // Prevent scientific notations or negative inputs on keypress
  elements.amountInput.addEventListener("keypress", (e) => {
    if (e.key === "-" || e.key === "e") {
      e.preventDefault();
    }
  });

  // Dropdown Toggles
  elements.fromTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    elements.toSelect.classList.remove("active");
    elements.fromSelect.classList.toggle("active");
    if (elements.fromSelect.classList.contains("active")) {
      elements.fromSearch.focus();
    }
  });

  elements.toTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    elements.fromSelect.classList.remove("active");
    elements.toSelect.classList.toggle("active");
    if (elements.toSelect.classList.contains("active")) {
      elements.toSearch.focus();
    }
  });

  // Close dropdowns on clicking outside
  document.addEventListener("click", () => {
    elements.fromSelect.classList.remove("active");
    elements.toSelect.classList.remove("active");
  });

  // Dropdown Keypress listeners (accessibility)
  elements.fromTrigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      elements.fromTrigger.click();
    }
  });
  elements.toTrigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      elements.toTrigger.click();
    }
  });

  // Live Filtering Search Bars
  elements.fromSearch.addEventListener("input", (e) => {
    const val = e.target.value;
    elements.fromClearSearch.style.display = val ? "block" : "none";
    renderOptions(elements.fromOptionsList, "from", val);
  });

  elements.toSearch.addEventListener("input", (e) => {
    const val = e.target.value;
    elements.toClearSearch.style.display = val ? "block" : "none";
    renderOptions(elements.toOptionsList, "to", val);
  });

  // Clear Search Buttons
  elements.fromClearSearch.addEventListener("click", (e) => {
    e.stopPropagation();
    elements.fromSearch.value = "";
    elements.fromClearSearch.style.display = "none";
    renderOptions(elements.fromOptionsList, "from");
    elements.fromSearch.focus();
  });

  elements.toClearSearch.addEventListener("click", (e) => {
    e.stopPropagation();
    elements.toSearch.value = "";
    elements.toClearSearch.style.display = "none";
    renderOptions(elements.toOptionsList, "to");
    elements.toSearch.focus();
  });

  // Swap button
  elements.swapBtn.addEventListener("click", () => {
    const temp = state.fromCurrency;
    
    // Animate Swap Icon slightly
    const icon = elements.swapBtn.querySelector("i");
    icon.style.transform = "rotate(180deg)";
    setTimeout(() => {
      icon.style.transform = "";
    }, 300);

    // Perform the state swap and trigger UI adjustments
    selectCurrency(state.toCurrency, "from");
    selectCurrency(temp, "to");
  });
}

// ----------------------------------------------------
// API Communication and Conversion Calculation
// ----------------------------------------------------

async function performConversion() {
  const from = state.fromCurrency;
  
  // Show loaders
  elements.chartLoader.classList.add("active");
  
  try {
    const ratesData = await fetchExchangeRates(from);
    state.rates[from] = ratesData.rates;
    state.lastUpdated = ratesData.time_last_update_utc;
    
    updateConversionUI();
    populatePopularRates();
    renderTrendChart();
  } catch (error) {
    console.error("Exchange Rate Fetch Failed:", error);
    elements.convertedAmount.textContent = "Error";
    elements.exchangeRateVal.innerHTML = `<span style="color: #ef4444">Could not retrieve active exchange rates.</span>`;
  } finally {
    elements.chartLoader.classList.remove("active");
  }
}

// Fetch Rates with Cache validation (1 Hour Cache validity)
async function fetchExchangeRates(baseCode) {
  const cacheKey = `aero_rates_${baseCode}`;
  const cached = localStorage.getItem(cacheKey);
  const cacheTime = localStorage.getItem(`${cacheKey}_time`);
  
  // 1 hour check
  if (cached && cacheTime && (Date.now() - parseInt(cacheTime) < 3600000)) {
    return JSON.parse(cached);
  }
  
  // Fetch fresh rates
  const url = `https://open.er-api.com/v6/latest/${baseCode}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API returned response status ${response.status}`);
  }
  
  const data = await response.json();
  if (data.result !== "success") {
    throw new Error(`API responded with failure result code`);
  }
  
  // Save cache
  localStorage.setItem(cacheKey, JSON.stringify(data));
  localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
  
  return data;
}

function updateConversionUI() {
  const rates = state.rates[state.fromCurrency];
  if (!rates) return;
  
  const rate = rates[state.toCurrency];
  if (!rate) {
    elements.convertedAmount.textContent = "N/A";
    return;
  }
  
  // Conversion Calculation
  const converted = state.amount * rate;
  
  // Format numbers nicely
  const formattedAmount = formatCurrencyNumber(state.amount);
  const formattedConverted = formatCurrencyNumber(converted);
  
  // Update result elements
  elements.resultFormula.textContent = `${formattedAmount} ${state.fromCurrency} =`;
  elements.convertedAmount.textContent = formattedConverted;
  elements.convertedSymbol.textContent = state.toCurrency;
  
  // Update detail subtexts
  elements.exchangeRateVal.innerHTML = `1 ${state.fromCurrency} = <strong>${rate.toFixed(5)} ${state.toCurrency}</strong>`;
  
  // Parse last updated date format to be readable
  let displayDate = "Just now";
  if (state.lastUpdated) {
    try {
      const date = new Date(state.lastUpdated);
      displayDate = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      displayDate = state.lastUpdated;
    }
  }
  elements.lastUpdatedVal.textContent = displayDate;
}

function formatCurrencyNumber(number) {
  if (number === 0) return "0.00";
  
  // Format large values, restrict decimal digits dynamically
  let decimals = 2;
  if (number < 0.01) {
    decimals = 5;
  } else if (number < 1) {
    decimals = 4;
  }
  
  return number.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

// ----------------------------------------------------
// Popular Rates Generation
// ----------------------------------------------------

function populatePopularRates() {
  const base = state.fromCurrency;
  const rates = state.rates[base];
  if (!rates) return;
  
  elements.baseReferenceLabel.textContent = `Based on 1 ${base}`;
  elements.popularRatesContainer.innerHTML = "";
  
  POPULAR_CURRENCIES.forEach(code => {
    // Skip if popular currency is same as base
    if (code === base) return;
    
    const rate = rates[code];
    if (!rate) return;
    
    const currencyObj = CURRENCIES.find(c => c.code === code);
    if (!currencyObj) return;
    
    const gridItem = document.createElement("div");
    gridItem.className = "rate-grid-item";
    gridItem.innerHTML = `
      <div class="rate-grid-item-left">
        <img src="https://flagcdn.com/w40/${currencyObj.flag}.png" alt="${currencyObj.name} flag" loading="lazy">
        <span class="code">${code}</span>
      </div>
      <div class="rate-grid-item-right">
        <span class="value">${rate.toFixed(4)}</span>
        <span class="label">${currencyObj.symbol} / ${state.fromCurrency}</span>
      </div>
    `;
    
    // Clicking grid items sets target target currency
    gridItem.addEventListener("click", () => {
      selectCurrency(code, "to");
    });
    
    elements.popularRatesContainer.appendChild(gridItem);
  });
}

// ----------------------------------------------------
// Trend Chart Visualization (Simulated 7-Day Trend)
// ----------------------------------------------------

function renderTrendChart() {
  const from = state.fromCurrency;
  const to = state.toCurrency;
  const rates = state.rates[from];
  if (!rates) return;
  
  const currentRate = rates[to];
  if (!currentRate) return;
  
  elements.chartPairLabel.textContent = `${from} / ${to}`;
  
  // Generate simulated 7-day rates around the current mid-market rate
  // This simulates micro-fluctuations to show trend paths beautifully
  const chartLabels = [];
  const chartData = [];
  
  const today = new Date();
  let baseSeedRate = currentRate;
  
  // Generate data from 6 days ago to today
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    chartLabels.push(d.toLocaleDateString([], { weekday: 'short', day: 'numeric' }));
    
    if (i === 0) {
      // Last point is the exact current rate
      chartData.push(currentRate);
    } else {
      // Random walk variation within +/- 1.2%
      const fluctuation = (Math.random() - 0.5) * 0.024;
      const pointRate = baseSeedRate * (1 + fluctuation);
      chartData.push(pointRate);
      // Update seed to make it path-dependent
      baseSeedRate = pointRate;
    }
  }
  
  // Determine color palette based on trend (Upward/Downward)
  const isUpward = chartData[chartData.length - 1] >= chartData[0];
  
  // Get theme styles for color configuration
  const cssStyles = getComputedStyle(document.documentElement);
  const accentColor = cssStyles.getPropertyValue(isUpward ? '--secondary-accent' : '--primary-accent').trim();
  const accentHoverColor = cssStyles.getPropertyValue(isUpward ? '--secondary-accent-hover' : '--primary-accent-hover').trim();
  const textColor = cssStyles.getPropertyValue('--text-muted').trim();
  const gridColor = state.theme === "dark" ? 'rgba(255, 255, 255, 0.04)' : 'rgba(99, 102, 241, 0.06)';
  
  // Destroy previous Chart instance if exists
  if (state.chartInstance) {
    state.chartInstance.destroy();
  }
  
  const ctx = document.getElementById('rateTrendChart').getContext('2d');
  
  // Create gradient fill for line underneath
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 200);
  if (state.theme === "dark") {
    gradientFill.addColorStop(0, hexToRgba(accentColor, 0.25));
    gradientFill.addColorStop(1, hexToRgba(accentColor, 0.0));
  } else {
    gradientFill.addColorStop(0, hexToRgba(accentColor, 0.2));
    gradientFill.addColorStop(1, hexToRgba(accentColor, 0.01));
  }
  
  state.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [{
        label: `${from} to ${to}`,
        data: chartData,
        borderColor: accentColor,
        borderWidth: 3,
        pointBackgroundColor: accentColor,
        pointBorderColor: state.theme === "dark" ? '#14102c' : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 0, // hide points until hover
        pointHoverRadius: 6,
        pointHoverBackgroundColor: accentHoverColor,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
        fill: true,
        backgroundColor: gradientFill,
        tension: 0.35 // smooth line curve
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: state.theme === "dark" ? '#14102c' : '#ffffff',
          titleColor: state.theme === "dark" ? '#f3f0ff' : '#110e30',
          bodyColor: accentColor,
          borderColor: state.theme === "dark" ? 'rgba(255, 255, 255, 0.08)' : 'rgba(99, 102, 241, 0.15)',
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `1 ${from} = ${context.parsed.y.toFixed(5)} ${to}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: textColor,
            font: {
              family: 'Plus Jakarta Sans',
              size: 10,
              weight: 500
            }
          }
        },
        y: {
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor,
            font: {
              family: 'Plus Jakarta Sans',
              size: 10,
              weight: 500
            },
            callback: function(value) {
              return value.toFixed(3);
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}

// Utility helper to convert Hex / Custom color variables to Rgba values
function hexToRgba(colorStr, alpha) {
  // If HSL style string (as in custom variables)
  if (colorStr.startsWith('hsl')) {
    // strip hsl/hsla tags
    const values = colorStr.replace(/hsla?\(|\)/g, '').split(',');
    const h = parseInt(values[0]);
    const s = parseInt(values[1]);
    const l = parseInt(values[2]);
    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
  }
  
  // Standard Hex values
  let hex = colorStr.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
