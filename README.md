# Zeia — Premium Nuts, Dry Fruits & Spices

A beautiful, static website for Zeia with a dynamic product catalogue powered by Google Sheets.

## 📁 Project Structure

```
zeia-site/
├── index.html              # Homepage
├── products.html           # Products page
├── css/
│   └── style.css          # All styling
├── js/
│   ├── main.js            # Mobile menu & animations
│   └── products.js        # Product fetching & filtering
├── assets/
│   ├── logo.svg
│   └── logo.png
└── README.md              # This file
```

## 🚀 Features

- **Completely Static** — No backend, databases, or build tools needed
- **Google Sheets Powered** — Update products by editing a single spreadsheet
- **Responsive Design** — Beautiful on all devices
- **Fast Loading** — Pure HTML, CSS, and vanilla JavaScript
- **WhatsApp Integration** — One-click ordering via WhatsApp

## 📋 How to Update Products

### Google Sheet Setup

Your products are stored in this Google Sheet:
[https://docs.google.com/spreadsheets/d/11_Ax-0mtsRp60A3fRzz2UCGnPonhm925rviOHV3idBE/edit?usp=sharing](https://docs.google.com/spreadsheets/d/11_Ax-0mtsRp60A3fRzz2UCGnPonhm925rviOHV3idBE/edit?usp=sharing)

The sheet must be **published to the web** as CSV (this is already done).

### CSV Columns (Required)

| Column | Description | Example |
|--------|-------------|---------|
| `name` | Product name | "Cashew BBQ" |
| `category` | Product category | "Cashews" |
| `price` | Regular price | "675" |
| `unit` | Package size | "500g" |
| `offer` | Is there an offer? | "TRUE" or "FALSE" |
| `offer_price` | Discounted price (if offer=TRUE) | "625" |
| `emoji` | Emoji placeholder | "🥜" |
| `description` | Product description | "Smoky, savory..." |
| `image` | Image URL (optional) | "https://..." |

### Update Workflows

**Change a Price:**
1. Open the Google Sheet
2. Edit the `price` or `offer_price` cell
3. Save
4. Website updates automatically ✨

**Add a New Product:**
1. Add a new row to the sheet
2. Fill in all columns
3. Save
4. Website updates automatically ✨

**Delete a Product:**
1. Delete the row from the sheet
2. Save
3. Website updates automatically ✨

**Mark an Offer:**
1. Set `offer` = `TRUE`
2. Enter `offer_price` value
3. Save
4. Product displays with "OFFER" badge and strikethrough price ✨

**Add Product Image:**
1. Upload image to your hosting (e.g., imgur, imgbb, or your own server)
2. Paste image URL in `image` column
3. Save
4. Website displays image instead of emoji ✨

## 🌐 Deployment

### Option 1: GitHub Pages (Recommended)

1. Create a GitHub repository
2. Push this folder to the repo
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose `main` branch, `/root` folder
6. Site is live at: `https://yourusername.github.io/zeia-site`

### Option 2: Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Drag-and-drop this folder
3. Site is live in seconds

### Option 3: Manual Hosting

Upload the entire folder to your web host via FTP/SFTP.

## ⚙️ Technical Details

- **No external dependencies** — Pure HTML, CSS, JavaScript
- **CSV fetching** — Google Sheets published CSV is fetched via Fetch API
- **Real-time updates** — Changes appear on next page load
- **Mobile-first** — Fully responsive on all devices
- **Animations** — Smooth reveal animations on scroll

## 🎨 Design System

The website uses Zeia's premium branding:

- **Colors:**
  - Green: #1E4D3A
  - Gold: #C8922A
  - Beige: #F2EDE3

- **Fonts:**
  - Headings: Cormorant Garamond (serif)
  - Body: DM Sans (sans-serif)

## 📱 Mobile Menu

The navigation automatically becomes a hamburger menu on mobile devices. No configuration needed.

## 📞 WhatsApp Configuration

The WhatsApp number is set to: **+918075771781**

To change it, edit these files and replace `918075771781`:
- `index.html` (all WhatsApp links)
- `js/products.js` (line 3: `WHATSAPP_NUMBER`)

## 🔗 Support

For questions or updates, contact Zeia directly on WhatsApp.

---

Made with ❤️ for Zeia — Nature's Finest, Always Fresh
