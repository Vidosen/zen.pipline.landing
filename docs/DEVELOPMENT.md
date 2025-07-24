# Landing Page Development Guide

## Development Environment Setup

### Prerequisites
- Node.js v18+ 
- npm or yarn
- Git

### Initial Setup

1. Clone the repository
   ```bash
   git clone https://your-repo-url.git
   cd zen.pipline.backend/landing
   ```

2. Install dependencies
   ```bash
   npm install
   # or 
   yarn install
   ```

3. Start development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
landing/
├── docs/                    # Documentation files
│   ├── GOALS.md             # Project goals and plans
│   ├── INFRASTRUCTURE.md    # Infrastructure setup
│   └── DEVELOPMENT.md       # Development guide (this file)
├── public/                  # Static assets
│   ├── index.html           # HTML template
│   ├── manifest.json        # Web app manifest
│   └── favicon.ico          # Site favicon
└── src/                     # React source code
    ├── assets/              # Images, fonts, and other static files
    ├── components/          # Reusable React components
    │   └── App.js           # Main App component
    ├── hooks/               # Custom React hooks
    ├── styles/              # CSS and style-related files
    │   ├── index.css        # Global styles
    │   └── App.css          # App component styles
    ├── utils/               # Utility functions
    │   └── reportWebVitals.js # Performance reporting
    └── index.js             # Application entry point
```

## Development Workflow

### Adding New Components

1. Create a new component file in `src/components/`
2. Import and use it in the appropriate parent component

Example component:

```jsx
import React from 'react';

function ContactForm() {
  return (
    <form className="contact-form">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="your@email.com" 
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="phone">Phone Number:</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone" 
          placeholder="+7 (XXX) XXX-XX-XX" 
        />
      </div>
      
      <button type="submit" className="submit-button">
        Join Waitlist
      </button>
    </form>
  );
}

export default ContactForm;
```

### Adding Styles

1. Create component-specific styles in `src/styles/`
2. Import them in your component files

### Form Handling 

When implementing the contact form:

1. Create a form component in `src/components/ContactForm.js`
2. Add form validation
3. Handle form submission (to be implemented later with backend API)
4. Store submitted information (will be configured when backend is available)

### Telegram Bot Integration

To implement the Telegram bot redirect:

1. Get the Telegram bot link from the bot owner
2. Update the button in `App.js` to link to the Telegram bot:

```jsx
<a 
  href="https://t.me/your_bot_link" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="telegram-button"
>
  Join Telegram Channel
</a>
```

## Build Process

### Development Build
```bash
npm start
# or
yarn start
```

### Production Build
```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` folder.

### Deployment

For testing, you can serve the production build locally:

```bash
npx serve -s build
```

For actual deployment, follow the instructions in [INFRASTRUCTURE.md](./INFRASTRUCTURE.md).

## Testing

Run the test suite with:

```bash
npm test
# or
yarn test
```

## Next Steps for Development

1. **Implement Contact Form Component**:
   - Create form fields for email and phone
   - Add validation
   - Add submission handling

2. **Add Mobile Layouts**: 
   - Ensure all components are responsive
   - Test on various device sizes

3. **Telegram Integration**:
   - Set up the Telegram bot link
   - Track click-through conversions

4. **Analytics Setup**:
   - Add Google Analytics or similar
   - Set up event tracking for form submissions and Telegram clicks

5. **SEO Optimization**:
   - Update meta tags
   - Add structured data
   - Optimize content for target keywords 