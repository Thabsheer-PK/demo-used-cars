# YEM KEY USED CARS — Kerala Showroom Demo Website

A modern, premium, fully responsive **Used Car Dealership Website** built for a fictional Kerala showroom named **YEM KEY USED CARS** located in Kochi, Kerala.

> **Sample Demo Notice:** Vehicle listings and showroom address are for demonstration purposes only.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Modern automotive luxury aesthetic)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State & Storage:** React Context API + Browser `localStorage` for offline CRUD persistence

---

## ✨ Features & Pages

### 1. Homepage (`/`)
- **Hero Section:** "Find Your Perfect Used Car" with quick search (Brand, Body Style, Price Range, Fuel Type)
- **Trust Metrics:** 150+ Inspection Points, 100% Verified Kerala (KL) Registered Cars, 7-Day Exchange Promise, 48-Hour Loan Approval
- **Body Style Categories:** Interactive cards for **Hatchback**, **Sedan**, and **SUV**
- **Featured Cars Grid:** Cards showcasing photos, model year, kilometres, fuel, transmission, and price in Indian Lakhs
- **WhatsApp Callout Banner:** Instant video walkthrough requests via WhatsApp (`+91 94008 11787`)
- **Showroom Showcase & Contact Preview:** Edappally, Kochi showroom details

### 2. All Cars Inventory (`/cars`)
- **Real-time Search:** Search by car name, model, or brand
- **Multi-Filter System:** Filter by Body Type, Brand, Price Range (Under 5L, 5-10L, 10-20L, Above 20L), Fuel Type, and Transmission
- **Sorting:** Sort by Featured, Price (Low to High, High to Low), Year (Newest), and Kilometres (Lowest)
- **Empty State:** Friendly empty state with 1-click filter reset

### 3. Car Details Page (`/cars/[id]`)
- **Interactive Photo Gallery:** Multi-angle photo preview with clickable thumbnails
- **Comprehensive Specifications:** Kerala RTO location, KL registration number, ownership history, insurance validity, ARAI certified mileage, engine capacity
- **Equipments & Features Checklist:** Highlighting sunroof, safety airbags, infotainment, etc.
- **Interactive EMI Loan Calculator:** Sliders for down payment percentage, tenure (1-7 years), and interest rate
- **Book a Test Drive Modal:** Slot booking with direct WhatsApp summary forward
- **WhatsApp Enquiry Button:** Opens WhatsApp with a prefilled message containing the car name, price, and registration number (`919400811787`)

### 4. Admin Dashboard Demo (`/admin`)
- **Demo Login:** Simple authentication using:
  - **Username:** `admin`
  - **Password:** `admin123`
  - Includes a convenient 1-click auto-fill button
- **CRUD Operations:** Add new vehicle listings, edit pricing, specs, images, or delete listings
- **Availability Toggle:** 1-click toggle between `Available`, `Reserved`, and `Sold`
- **LocalStorage Sync:** Changes persist in browser storage and instantly update public pages
- **Reset Defaults Button:** Restores original sample inventory at any time
- **KPI Metrics:** Total inventory count, active listings, sold count, and total showroom valuation

### 5. Contact & Showroom Details (`/contact`)
- **Showroom Address:** NH-66 Bypass Road, Near Lulu Mall, Edappally, Kochi, Kerala - 682024
- **Working Hours:** Mon - Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 6:00 PM
- **Direct Phone:** `+91 94008 11787`
- **WhatsApp Desk:** `+91 94008 11787`
- **Kerala FAQs:** Answers on Kerala MVD RC ownership transfers, flood damage inspection, and financing

---

## 🛠️ Local Development Instructions

### Prerequisites
- Node.js 18.18+ or 20+ installed
- npm or yarn or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Production Build
```bash
npm run start
```

---

## ☁️ Deployment to Vercel

This repository is ready for deployment on [Vercel](https://vercel.com/):

1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: YEM KEY Used Cars Showroom"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Next.js will be automatically detected.
4. Click **Deploy**. Vercel will run `npm run build` and deploy your site to a live URL with global CDN and automatic SSL.

---

## 📋 Credits & Disclaimers

- **Disclaimer:** *Sample Demo — Vehicle listings and showroom address are for demonstration only.*
- **Credit:** *Demo Website by Dev Canvas Business Solutions*
