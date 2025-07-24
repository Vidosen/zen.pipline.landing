# ZEN.PIPELINE Landing Page

## Overview
This landing page serves as a placeholder for our main application while we develop the full-featured platform. It's designed to capture leads (email and phone) and redirect interested users to our Telegram bot for updates and information.

## Project Structure
```
landing/
├── docs/                    # Documentation files
├── public/                  # Static assets
└── src/                     # React source code
    ├── assets/              # Images, fonts, and other static files
    ├── components/          # Reusable React components
    ├── hooks/               # Custom React hooks
    ├── styles/              # CSS and style-related files
    └── utils/               # Utility functions
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the landing directory
3. Install dependencies:
```bash
npm install
# or
yarn install
```

### Development
Start the development server:
```bash
npm start
# or
yarn start
```

### Build for Production
Create an optimized production build:
```bash
npm run build
# or
yarn build
```

## Deployment
The landing page is deployed on a Yandex VM with a static IP. See the [Infrastructure Plan](./docs/INFRASTRUCTURE.md) for more details. 