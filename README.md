# Bunai From Hills - React + Vite

A beautiful, responsive website for handcrafted crochet items from Himachal Pradesh, built with React, Vite, and Tailwind CSS.

## Features

- ⚛️ React 18 with Vite for fast development
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design for all devices
- 🎯 FontAwesome icons
- 🔌 Backend-ready API integration
- ✨ Smooth animations and transitions
- 🎭 Component-based architecture

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional, for backend integration):
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Gallery.jsx
│   │   ├── Collection.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── styles/              # CSS files
│   │   ├── index.css        # Tailwind imports
│   │   └── components.css   # Component styles
│   ├── utils/               # Utility functions
│   │   └── api.js           # API integration
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json
```

## Backend Integration

The project is set up to easily integrate with a backend API. The API utilities are located in `src/utils/api.js`.

### API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/gallery` - Fetch gallery items
- `GET /api/products` - Fetch products
- `POST /api/orders` - Submit orders

### Environment Variables

Create a `.env` file with:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Customization

### Colors

The color scheme can be customized in `tailwind.config.js`:
- Primary: `#75785b`
- Secondary: `#e8bd7d`
- Background: `#e6ddc5`

### Fonts

Fonts are configured in `tailwind.config.js`:
- Serif: Cormorant Garamond
- Sans: Montserrat

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- FontAwesome
- React Router (for future routing needs)

## License

© 2024 Bunai From Hills

# Bunai-from-hills
