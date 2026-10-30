const familiesEl = document.querySelector("#families");
const modelsEl = document.querySelector("#models");
const colorsEl = document.querySelector("#colors");
const capacitiesEl = document.querySelector("#capacities");
const heroEl = document.querySelector("#hero");
const nameEl = document.querySelector("#product-name");
const priceEl = document.querySelector("#product-price");
const noteEl = document.querySelector("#product-note");
const compareEl = document.querySelector("#compare");
const formEl = document.querySelector("#search");
const locationEl = document.querySelector("#location");
const checkEl = document.querySelector("#check");
const formErrorEl = document.querySelector("#form-error");
const resultsEl = document.querySelector("#results");
const availableOnlyEl = document.querySelector("#available-only");
const availableOnlyLabel = document.querySelector("#available-only-label");

const state = {
  catalog: null,
  familyId: "iphone18pro",
  modelId: null,
  colorKey: null,
  capacityKey: null,
  lastResult: null,
  lastProducts: [],
};

locationEl.value = readLocation();

function readLocation() {
  try {
    return localStorage.getItem("pickup-location") || "";
  } catch {
    return "";
  }
}

function saveLocation(location) {
  try {
    localStorage.setItem("pickup-location", location);
  } catch {
    // Storage can be blocked; the search still runs.
  }
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function imageUrl(name, width, height) {
  if (!/^[A-Za-z0-9_-]+$/.test(name || "")) return "";
  return `https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/${name}?wid=${width}&hei=${height}&fmt=jpeg&qlt=90`;
}

function safeHttps(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? parsed.href : "";
  } catch {
    return "";
  }
}

function family() {
  return state.catalog?.families.find((item) => item.id === state.familyId) || state.catalog?.families[0];
}

function model() {
  const current = family();
  return current?.models.find((item) => item.id === state.modelId) || current?.models[0];
}

function selectedProduct() {
  const current = model();
  return current?.products.find(
    (product) => product.colorKey === state.colorKey && product.capacityKey === state.capacityKey,
  ) || current?.products[0];
}

function productsForSearch() {
  const current = model();
  const product = selectedProduct();
  if (!current || !product) return [];
  if (!compareEl.checked) return [product];
  return current.products.filter((item) => item.capacityKey === product.capacityKey);
}

function money(product) {
  if (product.priceLabel) return product.priceLabel;
  if (typeof product.price === "number") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.price);
  }
  return "";
}

function renderChoices(container, items, selected, onPick) {
  container.replaceChildren();
  for (const item of items) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = container === colorsEl ? "swatch" : container === capacitiesEl ? "pill" : "choice";
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(item.key === selected));
    button.setAttribute("aria-label", item.name || item.label);
    if (container === colorsEl && item.swatch) {
      const img = document.createElement("img");
      img.alt = "";
      img.src = imageUrl(item.swatch, 64, 64);
      button.append(img);
    } else {
      button.textContent = item.label || item.name;
    }
    button.addEventListener("click", () => onPick(item.key));
    container.append(button);
  }
}

function render() {
  const currentFamily = family();
  const currentModel = model();
  if (!currentFamily || !currentModel) return;
  if (!currentModel.colors.some((color) => color.key === state.colorKey)) {
    state.colorKey = currentModel.colors[0]?.key || null;
  }
  if (!currentModel.capacities.some((capacity) => capacity.key === state.capacityKey)) {
    state.capacityKey = currentModel.capacities[0]?.key || null;
  }
  const product = selectedProduct();

  renderChoices(familiesEl, state.catalog.families.map((item) => ({
    key: item.id,
    name: item.name.replace(/^iPhone\s/, ""),
  })), currentFamily.id, (key) => {
    state.familyId = key;
    state.modelId = null;
    clearResults();
    render();
  });

  const showModels = currentFamily.models.length > 1;
  modelsEl.hidden = !showModels;
  if (showModels) {
    renderChoices(modelsEl, currentFamily.models.map((item) => ({ key: item.id, name: item.name })), currentModel.id, (key) => {
      state.modelId = key;
      clearResults();
      render();
    });
  } else {
    modelsEl.replaceChildren();
  }

  renderChoices(colorsEl, currentModel.colors.map((color) => ({
    key: color.key,
    name: color.name,
    swatch: color.swatch,
  })), state.colorKey, (key) => {
    state.colorKey = key;
    clearResults();
    render();
  });

  renderChoices(capacitiesEl, currentModel.capacities.map((capacity) => ({
    key: capacity.key,
    label: capacity.label,
  })), state.capacityKey, (key) => {
    state.capacityKey = key;
    clearResults();
    render();
  });

  if (!product) return;
  const src = imageUrl(product.image, 360, 396);
  heroEl.src = src;
  heroEl.alt = product.title;
  heroEl.hidden = !src;
  nameEl.textContent = product.title;
  priceEl.textContent = money(product);
  noteEl.textContent = compareEl.checked ? "The search will include every finish at this storage." : "Unlocked price from Apple.";
}

function clearResults() {
  state.lastResult = null;
  state.lastProducts = [];
  availableOnlyLabel.hidden = true;
  resultsEl.innerHTML = `<p class="prompt">Results show up here after you check a location.</p>`;
}

function checkedLabel(iso) {
  const when = new Date(iso);
  if (Number.isNaN(when.getTime())) return "";
  return when.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function renderResults() {
  const data = state.lastResult;
  const products = state.lastProducts;
  if (!data) return;
  const onlyAvailable = availableOnlyEl.checked;
  const stores = data.stores.filter((store) => !onlyAvailable || store.availableCount > 0);
  const withStock = data.stores.filter((store) => store.availableCount > 0).length;
  const names = products.map((product) => product.color || product.title).join(", ");
  const single = products.length === 1;

  const storeHtml = stores.map((store) => {
    const byPart = new Map(store.parts.map((part) => [part.partNumber, part]));
    const place = [store.city, store.state].filter(Boolean).join(", ");
    const address = [store.street, place, store.postalCode].filter(Boolean).join(", ");
    const map = safeHttps(`https://maps.apple.com/?q=${encodeURIComponent(address || store.name)}`);
    const storeUrl = safeHttps(store.url);
    const status = single ? byPart.get(products[0].partNumber) : null;
    const finishes = single ? "" : `<div class="finishes">${products.map((product) => {
      const part = byPart.get(product.partNumber);
      const yes = Boolean(part?.available);
      return `<span class="finish ${yes ? "yes" : "no"}">${esc(product.color)} · ${esc(part?.quote || (yes ? "Available" : "Not available"))}</span>`;
    }).join("")}</div>`;
    const quote = single
      ? `<p class="quote ${status?.available ? "yes" : "no"}">${esc(status?.quote || (status?.available ? "Available" : "Not available for pickup"))}</p>`
      : finishes;
    const hours = store.hours?.length
      ? `<details><summary>Hours</summary><ul class="hours">${store.hours.map((hour) => `<li><span>${esc(hour.days)}</span><span>${esc(hour.hours)}</span></li>`).join("")}</ul></details>`
      : "";
    const links = [
      storeUrl ? `<a href="${esc(storeUrl)}" target="_blank" rel="noreferrer">Store page</a>` : "",
      map ? `<a href="${esc(map)}" target="_blank" rel="noreferrer">Directions</a>` : "",
      single && safeHttps(products[0].buyUrl) ? `<a href="${esc(safeHttps(products[0].buyUrl))}" target="_blank" rel="noreferrer">Buy</a>` : "",
    ].filter(Boolean).join("");
    return `<article class="store">
      <h3>${esc(store.name)}</h3>
      <p class="distance">${esc(store.distanceLabel)}</p>
      <p class="place">${esc(place)}${store.phone ? ` · ${esc(store.phone)}` : ""}</p>
      ${quote}
      <p class="address">${esc(store.street)}</p>
      ${hours}
      <div class="links">${links}</div>
    </article>`;
  }).join("");

  availableOnlyLabel.hidden = false;
  resultsEl.innerHTML = `
    <p class="summary"><strong>${withStock} of ${data.stores.length}</strong> ${data.stores.length === 1 ? "store has" : "stores have"} pickup nearby.</p>
    <p class="checking-for">${esc(single ? products[0].title : `${products[0]?.capacity || ""} · ${names}`)} · ${esc(data.location)}</p>
    <p class="checked-at">Checked ${esc(checkedLabel(data.checkedAt))}</p>
    ${stores.length ? storeHtml : `<p class="prompt">None of these stores have pickup for this search.</p>`}
  `;
}

function showError(message) {
  formErrorEl.hidden = !message;
  formErrorEl.textContent = message || "";
}

async function loadCatalog() {
  checkEl.disabled = true;
  const response = await fetch("/api/catalog");
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "Could not load the iPhone lineup.");
  state.catalog = body;
  const initial = family();
  state.modelId = initial?.models[0]?.id || null;
  checkEl.disabled = false;
  render();
}

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const products = productsForSearch();
  if (!products.length) return;
  const location = locationEl.value.trim();
  showError("");
  checkEl.disabled = true;
  checkEl.textContent = "Checking…";
  resultsEl.innerHTML = `<p class="prompt">Checking Apple Stores near ${esc(location)}…</p>`;
  try {
    const params = new URLSearchParams();
    params.set("location", location);
    for (const product of products) params.append("parts", product.partNumber);
    const response = await fetch(`/api/availability?${params}`);
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || "Apple didn’t return store availability.");
    saveLocation(location);
    state.lastResult = body;
    state.lastProducts = products;
    availableOnlyEl.checked = false;
    renderResults();
  } catch (error) {
    resultsEl.innerHTML = `<p class="prompt">Results show up here after a successful check.</p>`;
    showError(error.message);
  } finally {
    checkEl.disabled = false;
    checkEl.textContent = "Check stores";
  }
});

compareEl.addEventListener("change", () => {
  clearResults();
  render();
});

availableOnlyEl.addEventListener("change", renderResults);

loadCatalog().catch((error) => {
  nameEl.textContent = "The lineup didn’t load.";
  showError(error.message);
  checkEl.disabled = true;
});
