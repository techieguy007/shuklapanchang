import React, { useState, useEffect } from 'react'
import { generateMonthPanchang, SOURCE_NOTE_EN, SOURCE_NOTE_HI } from './utils/panchang'

function App() {
  const [month, setMonth] = useState(0) // January
  const [year, setYear] = useState(2026)
  const [lang, setLang] = useState('hi') // 'hi' or 'en'

  // panchangData will be computed for the selected month
  const [panchangData, setPanchangData] = useState({})

  // Get days in month
  const daysInMonth = (m, y) => new Date(y, m + 1, 0).getDate()

  // Get first day of month (0 = Sunday)
  const firstDay = new Date(year, month, 1).getDay()

  // Create calendar array
  const days = []
  const totalDays = daysInMonth(month, year)

  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= totalDays; i++) days.push(i)

  const dayNamesEN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const dayNamesHI = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि']
  const monthNamesEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const monthNamesHI = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']

  const t = {
    en: {
      previous: '← Previous',
      next: 'Next →',
      today: 'Today',
      hinduPanchang: "Hindu Panchang Calendar",
      todaysPanchang: "Today's Panchang",
      auspiciousTimings: 'Auspicious Timings (Muhurat)',
      tithi: 'Tithi:',
      yoga: 'Yoga:',
      karana: 'Karana:',
      sunrise: 'Sunrise:',
      sunset: 'Sunset:'
    },
    hi: {
      previous: '← पिछला',
      next: 'अगला →',
      today: 'आज',
      hinduPanchang: 'हिंदू पंचांग',
      todaysPanchang: 'आज का पंचांग',
      auspiciousTimings: 'शुभ मुहूर्त',
      tithi: 'तिथि:',
      yoga: 'योग:',
      karana: 'करण:',
      sunrise: 'सूर्योदय:',
      sunset: 'सूर्यास्त:'
    }
  }

  // Handle month navigation
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else setMonth(month - 1)
  }

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else setMonth(month + 1)
  }

  const handleToday = () => {
    const today = new Date()
    setMonth(today.getMonth())
    setYear(today.getFullYear())
  }

  // Get today's panchang
  const today = new Date()
  const todayDate = today.getDate()
  const todayPanchang = (panchangData[todayDate] && panchangData[todayDate][lang]) || { tithi: 'N/A', yoga: 'N/A', karana: 'N/A', sunrise: 'N/A', sunset: 'N/A', muhurat: 'N/A' }

  const dayNames = lang === 'hi' ? dayNamesHI : dayNamesEN
  const monthNames = lang === 'hi' ? monthNamesHI : monthNamesEN

  // compute panchang for selected month using Varanasi by default
  useEffect(() => {
    const computed = generateMonthPanchang(year, month)
    const mapped = {}
    for (const [day, data] of Object.entries(computed)) {
      const d = parseInt(day, 10)
      mapped[d] = {
        en: {
          tithi: data.tithiEn || 'N/A',
          yoga: data.yogaEn || 'N/A',
          karana: data.karanaEn || 'N/A',
          sunrise: data.sunrise || 'N/A',
          sunset: data.sunset || 'N/A',
          muhurat: data.muhurat || ''
        },
        hi: {
          tithi: data.tithiHi || 'N/A',
          yoga: data.yogaHi || 'N/A',
          karana: data.karanaHi || 'N/A',
          sunrise: data.sunrise || 'N/A',
          sunset: data.sunset || 'N/A',
          muhurat: data.muhurat || ''
        }
      }
    }
    setPanchangData(mapped)
  }, [month, year])

  return (
    <div className="app">
      <header className="header">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h1>अंबरीष शुक्ल</h1>
            <h2>{monthNames[month]} {year}</h2>
            <p>{t[lang].hinduPanchang}</p>
            <p style={{fontSize:12,opacity:0.9}}>{lang==='hi' ? 'गणना स्थान: वाराणसी (25.3176 N, 82.9739 E)' : 'Calculations use Varanasi (25.3176 N, 82.9739 E)'}</p>
          </div>
          <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
            <button className="btn" onClick={() => setLang('hi')} style={{background: lang==='hi'? 'var(--gold)':'white'}}>हिन्दी</button>
            <button className="btn" onClick={() => setLang('en')} style={{background: lang==='en'? 'var(--gold)':'white'}}>English</button>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Month Navigation */}
        <div className="nav-controls">
          <button onClick={handlePrevMonth} className="btn btn-nav">{t[lang].previous}</button>
          <button onClick={handleToday} className="btn btn-today">{t[lang].today}</button>
          <button onClick={handleNextMonth} className="btn btn-nav">{t[lang].next}</button>
        </div>

        <div className="calendar-container">
          {/* Day names header */}
          <div className="day-names">
            {dayNames.map((day, idx) => (
              <div key={idx} className="day-name">{day}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="calendar-grid">
            {days.map((day, idx) => {
              const cellPanchang = day && panchangData[day] ? panchangData[day][lang] : null
              return (
                <div key={idx} className={`calendar-cell ${day ? 'active' : 'empty'}`}>
                  {day && (
                    <div className="day-content">
                      <div className="day-number">{day}</div>
                      <div className="panchang-info">
                        <small>{cellPanchang ? cellPanchang.tithi : (lang === 'hi' ? 'सूचना नहीं' : '—')}</small>
                        <small>{cellPanchang ? cellPanchang.yoga : ''}</small>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Today's Panchang Section */}
        <section className="panchang-section">
          <h3>{t[lang].todaysPanchang} ({monthNames[today.getMonth()]} {today.getDate()}, {today.getFullYear()})</h3>
          <div className="card panchang-card">
            <div className="panchang-grid">
              <div className="panchang-item">
                <label>{t[lang].tithi}</label>
                <span>{todayPanchang.tithi}</span>
              </div>
              <div className="panchang-item">
                <label>{t[lang].yoga}</label>
                <span>{todayPanchang.yoga}</span>
              </div>
              <div className="panchang-item">
                <label>{t[lang].karana}</label>
                <span>{todayPanchang.karana}</span>
              </div>
              <div className="panchang-item">
                <label>{t[lang].sunrise}</label>
                <span>{todayPanchang.sunrise}</span>
              </div>
              <div className="panchang-item">
                <label>{t[lang].sunset}</label>
                <span>{todayPanchang.sunset}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Auspicious Timings Section */}
        <section className="muhurat-section">
          <h3>{t[lang].auspiciousTimings}</h3>
          <div className="card muhurat-card">
            <p>{(panchangData[todayDate] && panchangData[todayDate][lang].muhurat) || 'N/A'}</p>
            <div className="muhurat-details">
              <div className="muhurat-item">
                <strong>{lang==='hi'?'ब्रह्म मुहूर्त':'Brahma Muhurat'}:</strong> {lang==='hi'?'ध्यान, अध्ययन तथा आध्यात्मिक कार्यों के लिए सर्वाधिक शुभ समय।':'Time of Brahma - considered most auspicious for meditation, study, and spiritual activities.'}
              </div>
              <div className="muhurat-item">
                <strong>{lang==='hi'?'अभिजित मुहूर्त':'Abhijit Muhurat'}:</strong> {lang==='hi'?'12:00 PM से 12:48 PM - महत्वपूर्ण कार्यों के प्रारंभ के लिए शुभ।':'12:00 PM to 12:48 PM - auspicious for starting important ventures.'}
              </div>
              <div className="muhurat-item">
                <strong>{lang==='hi'?'गोधुली मुहूर्त':'Godhuli Muhurat'}:</strong> {lang==='hi'?'सूर्यास्त के ठीक पहले - आराधना और अनुष्ठान के लिए शुभ।':'Just before sunset - auspicious for worship and ritual activities.'}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">© {year} Panchang | अंबरीष शुक्ल</footer>
    </div>
  )
}

export default App
