import React from 'react';
import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ZEN.PIPELINE</h1>
        <p>Cloud-native macOS build infrastructure for iOS/macOS development teams</p>
      </header>
      <main>
        <section className="hero-section">
          <div className="container">
            <h2>Eliminate the need for your own Mac hardware</h2>
            <p>Our platform provides elastic macOS build infrastructure for iOS/macOS development teams, reducing time-to-market and operating costs.</p>
            
            {/* Placeholder for the lead capture form */}
            <div className="form-container">
              <h3>Join our waitlist</h3>
              <p>Be the first to know when we launch</p>
              {/* Form component will be added here */}
              <p className="coming-soon">Form coming soon</p>
            </div>
            
            <div className="telegram-cta">
              <h3>Stay Updated</h3>
              <p>Follow our Telegram channel for the latest news and updates</p>
              <button className="telegram-button">Join Telegram Channel</button>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ZEN.PIPELINE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 