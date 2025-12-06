# UBRA - Filipino Artisan E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)

UBRA is a comprehensive e-commerce platform dedicated to empowering Filipino artisans by connecting them directly with customers worldwide. The platform combines marketplace functionality with cultural preservation, community support, and innovative features like auctions and social feeds.

## Key Features

### Marketplace
- Browse and purchase handmade products directly from Filipino artisans
- Advanced filtering by category, price range, and ratings
- Real-time product availability and inventory management
- Integrated shopping cart with checkout flow
- Wishlist and favorites system

### Social Feed
- Connect with artisans through posts, stories, and updates
- Like, comment, and share artisan content
- Discover new products and behind-the-scenes craft stories
- Community engagement and interaction

### Artisan Museum
- Explore the cultural heritage and stories behind each craft
- Virtual tours of artisan workshops and studios
- 3D product viewers for detailed examination
- Featured exhibits showcasing traditional techniques
- Educational content about Filipino craftsmanship

### Auction System
- Bid on exclusive and limited-edition artisan pieces
- Live auction tracking with real-time countdowns
- Featured masterpiece auctions
- Auction history and recently sold items
- Transparent bidding process

### Community Donation Fund
- Transparent fund allocation with real-time tracking
- Support artisan communities with every purchase
- Donation breakdown by category (Training, Artisan Aid, Disaster Response)
- Visual analytics and impact statistics
- Monthly public reports on fund distribution

### User Accounts & Profiles
- Separate buyer and artisan accounts
- Comprehensive dashboards for order tracking
- Artisan shop management with analytics
- Profile customization and settings
- Order history and wishlist management

## Tech Stack

### **Frontend Framework**
- **Next.js 16.0** - React framework with App Router
- **React 19.2** - UI library with modern hooks
- **TypeScript 5.x** - Type-safe development

### **Styling & UI**
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives (Dialog, Avatar, Popover, Toast, etc.)
- **Lucide React** - Beautiful icon library
- **tw-animate-css** - Animation utilities
- **tailwindcss-animate** - Additional animation support

### **Data Visualization**
- **Recharts 2.15** - Composable charting library for donation analytics

### **Form Management**
- **React Hook Form 7.60** - Performant form validation
- **Zod 3.25** - Schema validation
- **@hookform/resolvers** - Integration layer

### **UI Components & Utilities**
- **class-variance-authority** - Component variant styling
- **clsx** - Conditional classNames utility
- **tailwind-merge** - Merge Tailwind classes intelligently
- **date-fns 4.1** - Date manipulation
- **embla-carousel-react** - Touch-friendly carousel
- **next-themes** - Dark mode support
- **cmdk** - Command menu component
- **sonner** - Toast notifications
- **vaul** - Drawer component
- **input-otp** - OTP input fields
- **react-day-picker** - Date picker
- **react-resizable-panels** - Resizable layout panels

### **Analytics & Monitoring**
- **@vercel/analytics** - Web analytics

### **Development Tools**
- **ESLint** - Code linting with Next.js config
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kenth-dev/UBRA.git
cd UBRA
```

2. **Navigate to the app directory**
```bash
cd my-app
```

3. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
my-app/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Landing page
│   ├── globals.css          # Global styles and Tailwind
│   ├── artisan/[id]/        # Individual artisan profiles
│   ├── auction/             # Auction listings and features
│   ├── cart/                # Shopping cart
│   ├── donation/            # Community fund transparency
│   ├── feed/                # Social feed
│   ├── favorites/           # User wishlist
│   ├── museum/              # Artisan museum & cultural gallery
│   ├── product/[id]/        # Product detail pages
│   ├── profile/             # User accounts & dashboards
│   └── shop/                # Marketplace
├── components/              # Reusable React components
│   ├── ui/                  # UI primitives (Button, Card, Toast, etc.)
│   ├── navigation.tsx       # Main navigation bar
│   ├── auction-*.tsx        # Auction-specific components
│   ├── museum/              # Museum & virtual tour components
│   └── *.tsx                # Feature components
├── lib/                     # Utilities and helpers
│   ├── context.tsx          # Global app state (cart, auth, favorites)
│   ├── utils.ts             # Utility functions
│   ├── donations.ts         # Donation data
│   └── businessModel.ts     # Business logic & commission rates
├── public/                  # Static assets
│   ├── data/                # JSON data files
│   │   ├── artisans.json    # Artisan profiles
│   │   ├── products.json    # Product catalog
│   │   └── posts.json       # Social feed posts
│   ├── images/              # Image assets
│   └── *.png                # Logos and icons
├── components.json          # Shadcn/ui configuration
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.mjs       # PostCSS configuration
└── package.json             # Dependencies and scripts
```

## Business Model

### Marketplace
- **Platform Commission**: 10% per sale
- **Community Donation**: 5% of each sale goes to the community fund

### Auction
- **Artisan**: 70% of final bid
- **Community Donation**: 15% of final bid
- **Platform**: 15% of final bid

### Revenue Streams
- Marketplace commissions
- Auction fees
- Featured artisan placements (advertising)

## Design System

### Color Palette
- **Primary Beige**: `#c8a97e`
- **Secondary Brown**: `#dcccae`
- **Accent Cream**: `#eaddc8`
- **Background**: `#fffdf9` (off-white)
- **Text**: `#2b2b2b` (charcoal)
- **Dark Brown**: `#5c3a21`
- **Medium Brown**: `#8b6f47`

### Typography
- **Sans**: Poppins (primary font)
- **Serif**: Lora (for headings)

### Components
All UI components follow accessibility best practices using Radix UI primitives and are fully responsive across mobile, tablet, and desktop viewports.

## Key Pages

1. **Home** (`/`) - Landing page with feature highlights
2. **Shop** (`/shop`) - Product marketplace with filters
3. **Feed** (`/feed`) - Social content from artisans
4. **Museum** (`/museum`) - Cultural heritage and virtual tours
5. **Auction** (`/auction`) - Live and upcoming auctions
6. **Donation** (`/donation`) - Transparent community fund tracking
7. **Profile** (`/profile`) - User dashboards (buyer/artisan)
8. **Product** (`/product/[id]`) - Detailed product pages
9. **Artisan** (`/artisan/[id]`) - Artisan profile pages
10. **Cart** (`/cart`) - Shopping cart and checkout

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set the root directory to `my-app`
4. Deploy

For other platforms, run `npm run build` and deploy the `.next` directory.

## License

This project is private and proprietary.

## Team

**Owner**: kenth-dev

## Acknowledgments

- Filipino artisans who inspire this platform
- The Next.js and React communities
- Radix UI for accessible components
- Vercel for hosting and analytics

## Contact

For questions or support, please reach out through the repository issues.

---

**Built to empower Filipino artisans and preserve cultural heritage.**
