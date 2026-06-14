// Google Sheets CSV URL
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSq5nEMUW5FJyvob4I7Q4N08h86M4jfLsOMD_sorea7_5veqpCuMA1HrerIpg6mz4Z-OrRv6_djjJ7g/pub?output=csv';
const WHATSAPP_NUMBER = '918075771781';

let allProducts = [];
let categories = new Set(['All']);

// Fetch and parse CSV
async function fetchProducts() {
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();
    const products = parseCSV(csvText);
    
    allProducts = products;
    
    // Extract categories
    products.forEach(product => {
      if (product.category) {
        categories.add(product.category);
      }
    });
    
    // Render
    renderFilters();
    renderProducts(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    document.getElementById('products-grid').innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--muted);">Unable to load products. Please try again later.</p>';
  }
}

// Parse CSV text
function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  const products = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = parseCSVLine(lines[i]);
    const product = {};
    
    headers.forEach((header, index) => {
      product[header.toLowerCase().trim()] = (values[index] || '').trim();
    });
    
    if (product.name) {
      products.push(product);
    }
  }

  return products;
}

// Parse a single CSV line (handles quoted values)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

// Render filter buttons
function renderFilters() {
  const filterContainer = document.getElementById('products-filters');
  filterContainer.innerHTML = '';

  const sortedCategories = Array.from(categories).sort();
  
  sortedCategories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (category === 'All' ? ' active' : '');
    btn.textContent = category;
    btn.dataset.category = category;
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (category === 'All') {
        renderProducts(allProducts);
      } else {
        const filtered = allProducts.filter(p => p.category === category);
        renderProducts(filtered);
      }
    });
    
    filterContainer.appendChild(btn);
  });
}

// Render products grid
function renderProducts(products) {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  if (products.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--muted);">No products found in this category.</p>';
    return;
  }

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    
    const displayPrice = product.offer === 'TRUE' && product.offer_price ? product.offer_price : product.price;
    const originalPrice = product.price;
    
    let priceHTML = '';
    if (product.offer === 'TRUE' && product.offer_price && product.offer_price !== product.price) {
      priceHTML = `
        <span class="product-offer-badge">Offer</span>
        <div class="product-price-original">₹${originalPrice}</div>
        <div class="product-price">₹${displayPrice}</div>
      `;
    } else {
      priceHTML = `<div class="product-price">₹${displayPrice}</div>`;
    }
    
    const imageArea = product.image ? 
      `<img src="${product.image}" alt="${product.name}" loading="lazy">` :
      `<span class="product-emoji-fallback">${product.emoji || '🌰'}</span>`;
    
    const whatsappMessage = encodeURIComponent(
      `Hi Zeia! I want to order ${product.name} ${product.unit} – ₹${displayPrice}.`
    );
    
    card.innerHTML = `
      <div class="product-image-area">
        ${imageArea}
      </div>
      <p class="product-name">${product.name}</p>
      ${product.category ? `<p class="product-category">${product.category}</p>` : ''}
      ${product.description ? `<p class="product-desc">${product.description}</p>` : ''}
      <div class="product-pricing">
        ${priceHTML}
        ${product.unit ? `<div class="product-unit">${product.unit}</div>` : ''}
      </div>
      <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}" target="_blank" class="product-action">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.306-1.51A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.214-3.724.892.923-3.632-.234-.374A9.818 9.818 0 1112 21.818z"/></svg>
        Order on WhatsApp
      </a>
    `;
    
    grid.appendChild(card);
    
    // Trigger reveal animation
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 60);
  });
}

// Load products on page load
document.addEventListener('DOMContentLoaded', fetchProducts);
