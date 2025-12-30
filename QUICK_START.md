# 🚀 Quick Start Guide - Dashboard Testing

## Getting Started in 3 Steps

### Step 1: Go to Login Page
```
URL: http://localhost:5173/login
```

### Step 2: Enter Any Email and Password
```
Email: test@example.com
Password: anything (not validated in demo)
```

### Step 3: Click "Connexion"
```
You'll be redirected to /dashboard
Demo data is automatically loaded
```

---

## 🎯 What You'll See on Dashboard Load

### Header
- Greeting: "Bienvenue, John" (demo user)
- Menu button (mobile only)

### Sidebar (or Mobile Menu)
Four navigation sections:
1. 👤 Mon Profil
2. 📦 Mes Commandes
3. ❤️ Favoris
4. ⭐ Retour d'expérience

### Main Content
Default section: **My Profile**

---

## 🧭 Navigation Guide

### 1️⃣ Profile Section (Default)
**Click**: "Mon Profil" in sidebar

**Features**:
- View your information (John Doe)
- Click "Modifier" to edit
- Edit form appears
- Save changes with "Enregistrer"
- View account info (creation date, last update)

**Fields Available**:
- First Name
- Last Name
- Email
- Phone
- Address
- City
- Postal Code
- Country

### 2️⃣ Orders Section
**Click**: "Mes Commandes" in sidebar

**Features**:
- See 3 demo orders
- Order cards show:
  - Order number (#0001, #0002, #0003)
  - Order date
  - Status (color-coded badge)
  - Item count
  - Total amount

**Order Details**:
- Click "Voir les détails" to see full order
- Shows delivery tracking timeline
- Lists all items with images
- Shows shipping address
- Displays price breakdown

**Print Invoice**:
- In order list: Click "Facture" button
- In order detail: Click "🖨️ Facture" button
- Professional invoice template opens
- Click "🖨️ Imprimer la facture"
- Use browser print dialog (Ctrl+P or Cmd+P)

**Order Statuses** (Color-coded):
- 🟠 Order Placed (Orange)
- 🔵 Processing (Blue)
- 🟣 Shipped (Purple)
- 🔴 Out for Delivery (Red)
- 🟢 Delivered (Green)

### 3️⃣ Favorites Section
**Click**: "Favoris" in sidebar

**Features**:
- See 2 demo favorite products
- Each card shows:
  - Product image
  - Product name
  - Description
  - Category badge
  - Price
  - Date added

**Actions**:
- Click "Ajouter au panier" to add to cart
- Click "✕" button to remove from favorites
- Products added to cart are shown in cart panel

### 4️⃣ Feedback Section
**Click**: "Retour d'expérience" in sidebar

**Features**:
- See feedback you've left (1 demo review)
- Review shows:
  - Order number
  - Rating (5 stars ⭐)
  - Rating description ("Très satisfait")
  - Your notes/comments
  - Date submitted

**Leave New Feedback**:
- Click "✍️ Partager votre avis" or "+ Ajouter un avis"
- Select a delivered order from dropdown
- Choose 1-5 stars (visual feedback)
- Add optional notes
- Click "Envoyer l'avis"
- Review appears in list below

**Delete Feedback**:
- Hover over review
- Click "🗑️" button
- Review is removed

---

## 📱 Mobile Testing

### Header
- Shows title and logo
- Menu icon (☰) on left

### Mobile Menu
- Click menu icon to open sidebar
- Click section to navigate
- Menu closes automatically
- Logo and title stay visible

### Responsive Layouts
- Cards stack vertically
- Touch-friendly buttons
- Readable text at all sizes
- Images scale properly

---

## 📄 Invoice Testing

### To Print/View Invoice:

1. Go to "Mes Commandes" section
2. Pick an order
3. Click "Facture" button on order card
   OR
   Click "Voir les détails" → Click "🖨️ Facture"

4. Invoice template appears with:
   - Beaute & Elegance company header
   - Invoice number (FAC-2024-0001, etc.)
   - Billing address (your address)
   - Shipping address
   - Item table with quantities/prices
   - Subtotal, shipping fee, total
   - Payment method
   - Thank you message

5. Click "🖨️ Imprimer la facture"
6. Browser print dialog opens
7. Print to PDF or physical printer
8. Professional document ready!

---

## 🎨 Testing Design

### Colors Used
- **Pink**: #f1dada (buttons, accents)
- **Light Background**: #f0d9d9 (sections)
- **Brown Accent**: #b37777 (highlights)
- **White/Off-white**: #fff, #fafafa (backgrounds)

### Typography
- **Headers**: Abril Fatface
- **Section Titles**: Andada Pro
- **Body Text**: Open Sans

### Visual Effects
- Hover states on buttons
- Card shadows and transitions
- Status badge colors
- Timeline animations

---

## 🔄 Data Persistence

### LocalStorage Keys
```
user        → Current user profile
orders      → Order history
favorites   → Favorite products
feedback    → Service feedback
```

### Clear Data (Optional)
- Open DevTools (F12)
- Go to Application/Storage
- Click LocalStorage
- Click "http://localhost:5173"
- Delete each item or click "Clear All"
- Refresh page to login again

---

## 📊 Demo Data Details

### Demo User Profile
```
Name: John Doe
Email: (whatever you enter at login)
Phone: +213 XXX XXX XXX
Address: 123 Rue de la Beauté
City: Alger
Postal Code: 16000
Country: Algérie
```

### Demo Orders
**Order #0001** (Delivered)
- Date: 30 days ago
- Status: ✅ Delivered 20 days ago
- Items: Nouba rouge (qty 1), Viola noir (qty 2)
- Total: 3,400 DZD
- Feedback: 5-star review ⭐⭐⭐⭐⭐

**Order #0002** (In Transit)
- Date: 7 days ago
- Status: 🚚 Out for Delivery
- Items: Polycos masque (qty 1)
- Total: 583 DZD
- Estimated: Tomorrow

**Order #0003** (Shipped)
- Date: 3 days ago
- Status: 📤 Shipped
- Items: Dermactive, Nevia stick (qty 1 each)
- Total: 1,617 DZD
- Estimated: 4 days

### Demo Favorites
1. **Bourjois** - Fond de teint 123 - 1,050 DZD
2. **Viola** - Serum cheveux - 500 DZD

### Demo Feedback
- Order: #0001
- Rating: 5 stars
- Message: "Excellent service! La livraison était rapide et le produit était bien emballé."

---

## 🧪 Testing Checklist

✅ **Authentication**
- [ ] Login with email/password
- [ ] Redirected to dashboard
- [ ] Demo data loaded
- [ ] Can access all sections
- [ ] Logout works (Déconnexion button)

✅ **Profile Section**
- [ ] View profile information
- [ ] Click "Modifier" to edit
- [ ] Form appears with fields
- [ ] Update values
- [ ] Save changes
- [ ] Changes persist
- [ ] Cancel editing works

✅ **Orders Section**
- [ ] See 3 orders in list
- [ ] Order cards show correct info
- [ ] Status badges are colored
- [ ] Click "Voir les détails"
- [ ] Detail view shows items
- [ ] Delivery tracking shows timeline
- [ ] Shipping address displays
- [ ] Price breakdown is correct

✅ **Invoice**
- [ ] Click facture button
- [ ] Invoice template loads
- [ ] All information correct
- [ ] Print button works
- [ ] Print dialog appears

✅ **Favorites Section**
- [ ] See 2 favorite products
- [ ] Product cards display correctly
- [ ] Images load
- [ ] Prices show
- [ ] Add to cart button works
- [ ] Remove button (✕) works

✅ **Feedback Section**
- [ ] See 1 existing review
- [ ] Review shows rating and notes
- [ ] Can delete review
- [ ] Click "Ajouter un avis"
- [ ] Form appears
- [ ] Can select order
- [ ] Can rate (1-5 stars)
- [ ] Can add notes
- [ ] Submit creates new review

✅ **Responsive Design**
- [ ] Desktop: Sidebar visible
- [ ] Tablet: Sidebar collapses
- [ ] Mobile: Menu button works
- [ ] Touch interactions work
- [ ] Text is readable
- [ ] Cards are properly sized

---

## 💡 Tips

1. **Test on Multiple Devices**
   - Desktop: Full layout
   - Tablet: Landscape/Portrait
   - Mobile: Various sizes

2. **Browser DevTools**
   - Use Device Emulation
   - Test responsive mode
   - Check Console for errors

3. **Keyboard Navigation**
   - Tab through form fields
   - Enter to submit
   - Escape to close menus

4. **Browser Testing**
   - Chrome/Edge (best)
   - Firefox
   - Safari
   - Mobile browsers

5. **Performance**
   - Transitions are smooth
   - Pages load instantly
   - No lag on interaction
   - LocalStorage is fast

---

## ❓ FAQ

**Q: Can I change the user data?**
A: Yes! Click "Modifier" in Profile section and update any field.

**Q: How do I add more orders?**
A: You'd need to modify `demo-data.ts` or implement a backend API.

**Q: Can I add to favorites from products page?**
A: The heart icon on product cards adds to favorites (in main app).

**Q: How do I reset everything?**
A: Clear browser LocalStorage and refresh the page.

**Q: Is this a real e-commerce system?**
A: No, it's a demo. Data is not saved after browser close (unless localStorage is cleared).

**Q: Can I print the invoice?**
A: Yes! Click the print button in the invoice view. Use browser print (Ctrl+P/Cmd+P).

---

## 🎓 Learning Resources

### Files to Study
- `src/routes/dashboard/+page.svelte` - Main dashboard logic
- `src/lib/components/Dashboard/*` - Individual components
- `src/lib/stores/*.ts` - State management
- `src/lib/types.ts` - Type definitions

### Key Concepts
- Svelte reactive components
- Store subscriptions ($)
- TypeScript interfaces
- CSS Grid/Flexbox layouts
- LocalStorage API
- Mobile responsive design

---

## 🆘 Troubleshooting

**Issue**: Not redirected to dashboard after login
- **Fix**: Check console for errors, ensure localStorage is enabled

**Issue**: Demo data not showing
- **Fix**: Refresh page, check browser console, clear cache

**Issue**: Mobile menu doesn't work
- **Fix**: Check viewport, use device emulation in DevTools

**Issue**: Form changes don't save
- **Fix**: Click "Enregistrer" button, check console for errors

**Issue**: Can't print invoice
- **Fix**: Use Ctrl+P (or Cmd+P on Mac), ensure popup is not blocked

---

## 🎉 You're Ready to Test!

1. Go to login page
2. Enter any email/password
3. Explore all features
4. Test on mobile
5. Print an invoice
6. Leave feedback
7. Enjoy! ✨

For detailed documentation, see **DASHBOARD_GUIDE.md**

Happy testing! 🚀
