# Beaute & Elegance Admin Dashboard

A professional, beautiful admin dashboard for managing the Beaute & Elegance e-commerce platform.

## Features

✨ **Complete Admin Management System**

- **📊 Dashboard Overview** - Real-time statistics and performance metrics
- **📦 Product Management** - Add, edit, and delete products with full inventory tracking
- **🛒 Order Management** - Track orders with status updates and customer information
- **📈 Stock Management** - Monitor inventory levels with alerts for low stock
- **🎯 Promotion Management** - Create and manage discount campaigns
- **👥 User Management** - Manage customer accounts and profiles
- **⚙️ Settings** - Configure store settings, notifications, and security

## Design

Built with the same elegant aesthetic as the main Beaute & Elegance website:

- **Color Scheme**: Soft pinks (#f0d9d9, #d1b2b2), teals, and professional grays
- **Typography**: MoonTime (branding), Andada Pro (headings), Open Sans (body)
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile
- **Modern UI**: Clean cards, smooth transitions, and intuitive navigation

## Tech Stack

- **Framework**: SvelteKit 2.0
- **Styling**: CSS3 with custom design system
- **No External UI Libraries**: Built with pure Svelte components
- **Responsive**: Mobile-first approach with media queries

## Getting Started

### Installation

```bash
cd admin
npm install
```

### Development

```bash
npm run dev
```

The dashboard will be available at `http://localhost:5175`

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
admin/
├── src/
│   ├── lib/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Sidebar.svelte
│   │   │   ├── TopBar.svelte
│   │   │   ├── Card.svelte
│   │   │   ├── StatCard.svelte
│   │   │   ├── DataTable.svelte
│   │   │   ├── Modal.svelte
│   │   │   ├── Button.svelte
│   │   │   ├── FormInput.svelte
│   │   │   └── FormTextarea.svelte
│   │   └── assets/           # Images, fonts, icons
│   ├── routes/
│   │   ├── +layout.svelte    # Main layout
│   │   ├── +page.svelte      # Dashboard home
│   │   ├── products/
│   │   ├── orders/
│   │   ├── stock/
│   │   ├── promotions/
│   │   ├── users/
│   │   └── settings/
│   └── app.css               # Global styles
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.js
```

## Features Overview

### Dashboard
- Sales performance metrics
- Category distribution
- Recent orders
- Top-performing products

### Products
- Full CRUD operations
- Category management
- Stock tracking
- Price management

### Orders
- Order tracking with status updates
- Order timeline visualization
- Customer information
- Order summary details

### Stock Management
- Real-time inventory levels
- Low stock alerts
- Restock functionality
- Visual stock level indicators

### Promotions
- Create discount campaigns
- Percentage and fixed amount discounts
- Category-specific promotions
- Campaign timeline tracking

### Users
- Customer profile management
- Account status control
- Purchase history
- Spending analytics

### Settings
- Admin profile management
- Store configuration
- Notification preferences
- Security settings

## Styling Guide

All components follow the brand's elegant aesthetic:

- **Primary Color**: #d1b2b2 (dusty rose)
- **Secondary Color**: #b37777 (deeper rose)
- **Backgrounds**: #f0d9d9, #f9f8f8, #fafafa
- **Text Colors**: #333 (dark), #888 (muted)
- **Success**: #27ae60
- **Warning**: #f39c12
- **Danger**: #e74c3c

## Responsive Design

The dashboard is fully responsive:

- **Desktop**: Full sidebar + main content
- **Tablet**: Collapsible sidebar (768px breakpoint)
- **Mobile**: Mobile-optimized sidebar toggle (480px breakpoint)

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 Beaute & Elegance. All rights reserved.

## Support

For issues or feature requests, please contact the development team.
