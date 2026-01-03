import React from 'react'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Panchang</h1>
        <p>Daily Hindu calendar and auspicious timings</p>
      </header>

      <main className="main">
        <section className="hero">
          <h2>Today&apos;s Panchang</h2>
          <div className="card">
            <ul>
              <li><strong>Tithi:</strong> Shukla Paksha Pratipada</li>
              <li><strong>Karana:</strong> Bava</li>
              <li><strong>Yoga:</strong> Siddha</li>
              <li><strong>Sunrise:</strong> 06:30</li>
              <li><strong>Sunset:</strong> 17:45</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} Panchang</footer>
    </div>
  )
}

export default App
